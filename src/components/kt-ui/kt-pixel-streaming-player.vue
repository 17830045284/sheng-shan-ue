<script setup lang="ts">
import { CACHE } from '@/ktJS/CACHE'
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2'
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.2'
import { onMounted, onUnmounted, ref } from 'vue'

// 自动重连过程中的状态标记
type ReconnectStatus = 'offline' | 'recovering' | 'restarting'

// 前端缓存的“会话租约”信息，用于刷新后复用
type Lease = {
  managerBase: string
  sessionId: string
  streamerPort: string
  exeIndex: string
}

// 管理服务返回的会话数据结构
type ManagerSession = {
  ipAddress: string
  sessionId?: string
  streamerPort?: string
  webSocketUrl?: string
}

// 自动恢复后的结果（复用旧会话 or 新启会话）
type RecoveredResult = {
  mode: 'resume' | 'restart'
  lease: ManagerSession
}

// 自动重连控制器对外暴露的方法
type ReconnectController = {
  start: (nextLease?: Lease) => void
  stop: (options?: { preserveGeneration?: boolean }) => void
  isRunning: () => boolean
}

// 控制容器淡入效果
const loading = ref<boolean>(true)
// Pixel Streaming UI 组件挂载节点
const pixelStreamingContainerRef = ref<HTMLDivElement | null>(null)

// 全局缓存，便于其他模块向 UE 发消息
CACHE.pixelStream = {
  stream: null,
  application: null,
}

// 刷新时持久化会话的 key
const leaseKey = 'pixel_streaming_active_lease'
// 管理 WebSocket 心跳间隔
const heartbeatMs = 3000
// 自动恢复轮询间隔
const reconnectPollMs = 5000

// 组件内所有运行态数据集中在这里，避免分散变量难追踪
const state = {
  ws: null as WebSocket | null,
  heartbeatTimer: null as ReturnType<typeof setInterval> | null,
  expectedClose: false,
  hasStatusSnapshot: false,
  lastRestartAt: '',
  isServerReloading: false,
  managerBase: '',
  sessionId: '',
  streamerPort: '',
  webSocketUrl: '',
  activeStreamUrl: '',
  reconnectController: null as ReconnectController | null,
  reconnectLease: null as Lease | null,
  reconnecting: false,
  reconnectStoppedByUser: false,
}

// 默认管理服务地址：同域名 + 18900 端口
function defaultManagerBase() {
  const protocol = location.protocol === 'https:' ? 'https:' : 'http:'
  const host = location.hostname || '127.0.0.1'
  return `${protocol}//${host}:18900`
}

// 标准化管理服务 base（只保留协议+主机+端口）
function normalizeBase(value: string) {
  const raw = (value || '').trim()
  const parsed = new URL(/^https?:\/\//i.test(raw) ? raw : `http://${raw || defaultManagerBase()}`, location.href)
  parsed.pathname = ''
  parsed.search = ''
  parsed.hash = ''
  return parsed.toString().replace(/\/$/, '')
}

// 标准化普通 URL（补全协议）
function normalizeUrl(value: string) {
  const raw = (value || '').trim()
  if (!raw) return ''
  return new URL(/^https?:\/\//i.test(raw) ? raw : `http://${raw}`, location.href).toString()
}

// 将像素流地址统一为 player.html，并补齐常用播放参数
function buildPlayerUrl(value: string) {
  const parsed = new URL(normalizeUrl(value))
  if (parsed.pathname === '/' || parsed.pathname === '') {
    parsed.pathname = '/player.html'
  }
  const flags: Record<string, string> = {
    AutoConnect: 'true',
    AutoPlayVideo: 'true',
    StartVideoMuted: 'true',
    HoveringMouse: 'true',
    MatchViewportRes: 'true',
  }
  Object.entries(flags).forEach(([key, val]) => {
    if (!parsed.searchParams.has(key)) {
      parsed.searchParams.set(key, val)
    }
  })
  return parsed.toString()
}

// 从 URL 推断端口（用于拼管理 WS 地址）
function inferPort(value: string) {
  try {
    return new URL(value).port || ''
  } catch {
    return ''
  }
}

// 按测试用例约定拼出管理 WebSocket 地址
function buildManagerWsUrl(base: string, key: string) {
  const parsed = new URL(base)
  return `${parsed.protocol === 'https:' ? 'wss:' : 'ws:'}//${parsed.host}/ws/${encodeURIComponent(key)}`
}

// 管理服务地址读取优先级：manager_url > ws_url 推导 > 默认值
function managerBaseFromConfig() {
  const config = window.kt_config || {}
  if (config.manager_url) {
    return normalizeBase(String(config.manager_url))
  }

  const rawWsUrl = String(config.ws_url || '').trim()
  if (!rawWsUrl) {
    return normalizeBase(defaultManagerBase())
  }

  try {
    const parsed = new URL(rawWsUrl, location.href)
    const protocol = parsed.protocol === 'wss:' ? 'https:' : 'http:'
    return `${protocol}//${parsed.host}`
  } catch {
    return normalizeBase(defaultManagerBase())
  }
}

// exeIndex 兼容两种字段写法：exe_index / exeIndex
function currentExeIndex() {
  const config = window.kt_config || {}
  const raw = config.exe_index ?? config.exeIndex ?? 0
  const next = Number.parseInt(String(raw), 10)
  return Number.isNaN(next) ? 0 : next
}

// 清除管理 WS 心跳定时器
function clearManagerHeartbeat() {
  if (state.heartbeatTimer) {
    clearInterval(state.heartbeatTimer)
    state.heartbeatTimer = null
  }
}

// 保存当前可复用会话（刷新后优先尝试复用，避免重复拉起实例）
function saveLease() {
  if (!state.managerBase || !state.activeStreamUrl || (!state.sessionId && !state.streamerPort)) {
    sessionStorage.removeItem(leaseKey)
    return
  }

  const payload = {
    managerBase: state.managerBase,
    sessionId: state.sessionId,
    streamerPort: state.streamerPort,
    webSocketUrl: state.webSocketUrl,
    activeStreamUrl: state.activeStreamUrl,
    exeIndex: String(currentExeIndex()),
  }
  sessionStorage.setItem(leaseKey, JSON.stringify(payload))
}

// 读取并校验缓存会话（管理服务地址不一致则丢弃）
function loadLease(expectedManagerBase: string) {
  try {
    const raw = sessionStorage.getItem(leaseKey)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (!parsed.activeStreamUrl || !parsed.managerBase) return null
    if (expectedManagerBase && parsed.managerBase !== expectedManagerBase) return null
    return parsed
  } catch {
    return null
  }
}

// 清空缓存会话
function clearLease() {
  sessionStorage.removeItem(leaseKey)
}

// 销毁旧的 pixel streaming 实例，避免重复挂载和资源泄漏
function destroyPixelStreaming() {
  const application = CACHE.pixelStream.application
  const stream = CACHE.pixelStream.stream

  try {
    stream?.disconnect?.()
  } catch {}

  if (application?.rootElement?.parentNode) {
    application.rootElement.parentNode.removeChild(application.rootElement)
  }

  CACHE.pixelStream.stream = null
  CACHE.pixelStream.application = null
}

// 初始化像素流播放器（可选强制重建）
async function initPixelStreaming(ssUrl: string, forceReload = false) {
  const container = pixelStreamingContainerRef.value
  if (!container) {
    throw new Error('像素流容器未挂载。')
  }

  // 已是同地址且实例存在时，不重复初始化
  if (!forceReload && state.activeStreamUrl === ssUrl && CACHE.pixelStream.stream) {
    return
  }

  loading.value = true
  destroyPixelStreaming()

  // 隐藏默认 UI 控件，仅保留画面
  const pixelStreamingStyles = new PixelStreamingApplicationStyle({
    customStyles: {
      '#uiFeatures, .left-controls': {
        display: 'none',
      },
    },
  })
  pixelStreamingStyles.applyStyleSheet()

  // 播放器配置：核心是 ss + 自动连接/自动播放
  const config = new Config({
    useUrlParams: true,
    initialSettings: {
      ss: ssUrl,
      AutoConnect: true,
      AutoPlayVideo: true,
      StartVideoMuted: true,
      MinQP: 30,
      XRControllerInput: false,
      GamepadInput: false,
      TouchInput: false,
      HoveringMouse: true,
      SuppressBrowserKeys: false,
      MatchViewportRes: true,
      AutoAcceptWebRTCOffer: true,
      PreferSFU: false,
    },
  })

  const stream = new PixelStreaming(config)

  // 双保险：收到 SDP 后主动接受 WebRTC offer
  // ========== 添加自定义消息处理器 ==========
  // 注册 TextboxEntry 消息处理器，消除警告
  // 注意：PixelStreaming 库使用 addResponseEventListener 来注册消息处理器
  stream.addEventListener('webRtcSdpReady', () => {
    if (stream._webRtcController) {
      stream._webRtcController.acceptWebRTCOffer()
    }
  })
  // 由我们自己接管重连逻辑，关闭 SDK 默认重连策略
  stream._webRtcController.shouldReconnect = false

  // 若后端没给到 DefaultStreamer，主动断开，触发后续恢复流程
  const preOnStreamerList = stream.webSocketController.onStreamerList
  stream.webSocketController.onStreamerList = function (...args: unknown[]) {
    preOnStreamerList.call(this, ...args)
    const payload = args[0] as { ids?: string[] } | undefined
    if (payload && Array.isArray(payload.ids) && !payload.ids.includes('DefaultStreamer')) {
      setTimeout(() => {
        stream.disconnect()
      }, 1000)
    }
  }

  // UI 应用容器
  const application = new Application({
    stream,
    onColorModeChanged: (isLightMode: boolean) => pixelStreamingStyles.setColorMode(isLightMode),
  })

  // 视频真正开始播放后再标记 ready
  const onPlayStream = application.onPlayStream.bind(application)
  application.onPlayStream = function (...args: unknown[]) {
    onPlayStream(...args)
    loading.value = false
    window.__UE_PIXEL_READY__ = true
    window.dispatchEvent(new Event('ue-pixel-ready'))
  }

  // 挂载到页面并写入全局缓存
  container.appendChild(application.rootElement)
  CACHE.pixelStream.stream = stream
  CACHE.pixelStream.application = application

  // UE/信令断开时尝试重连（服务重启期间由外层控制跳过）
  stream._eventEmitter.addEventListener('webRtcDisconnected', () => {
    if (state.isServerReloading) return
    stream.reconnect()
  })

  // UE -> Web 消息桥：保持原有项目协议
  stream.addResponseEventListener('handle_responses', (data: unknown) => {
    window.ue?.interface?.UEemit?.(data)
  })
}

// 管理服务上报 UE 已重启时，重建播放器实例
async function restartPixelStreamingIfNeeded() {
  if (!state.activeStreamUrl) return
  try {
    state.isServerReloading = true
    await initPixelStreaming(state.activeStreamUrl, true)
  } finally {
    state.isServerReloading = false
  }
}

// 关闭管理 WebSocket（可选是否清空管理态字段）
function closeManagerSocket(resetManaged = true) {
  clearManagerHeartbeat()
  if (state.ws) {
    state.expectedClose = true
    try {
      if (state.ws.readyState === WebSocket.OPEN || state.ws.readyState === WebSocket.CONNECTING) {
        state.ws.close(1000, 'closing')
      }
    } catch {}
    state.ws = null
  }
  if (resetManaged) {
    state.webSocketUrl = ''
  }
}

// 管理 WS 状态消息处理：同步会话信息，并检测 UE 重启时间戳变化
function onManagerSocketMessage(event: MessageEvent) {
  try {
    const payload = JSON.parse(event.data)
    if (payload?.type !== 'status' || !payload.data) return

    const hadStatusSnapshot = state.hasStatusSnapshot
    const previousRestartAt = state.lastRestartAt
    const nextRestartAt = typeof payload.data.lastRestartAt === 'string' ? payload.data.lastRestartAt : ''
    state.hasStatusSnapshot = true
    state.sessionId = payload.data.sessionId || state.sessionId
    state.streamerPort = payload.data.streamerPort || state.streamerPort
    state.webSocketUrl = payload.data.webSocketUrl || state.webSocketUrl
    state.lastRestartAt = nextRestartAt
    saveLease()

    if (hadStatusSnapshot && nextRestartAt && previousRestartAt !== nextRestartAt) {
      void restartPixelStreamingIfNeeded()
    }
  } catch (error) {
    console.warn('管理服务状态消息解析失败:', error)
  }
}

// 建立管理 WS，并启动心跳 + 状态拉取
function openManagerSocket(url: string) {
  closeManagerSocket(false)
  state.expectedClose = false
  state.hasStatusSnapshot = false
  state.lastRestartAt = ''
  state.webSocketUrl = url

  return new Promise<void>((resolve, reject) => {
    let settled = false
    const ws = new WebSocket(url)
    state.ws = ws

    ws.addEventListener('open', () => {
      if (settled) return
      settled = true
      state.heartbeatTimer = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send('heartbeat')
          ws.send(JSON.stringify({ type: 'status' }))
        }
      }, heartbeatMs)
      ws.send(JSON.stringify({ type: 'status' }))
      saveLease()
      resolve()
    })

    ws.addEventListener('message', onManagerSocketMessage)
    ws.addEventListener('error', () => {
      if (!settled) {
        settled = true
        state.ws = null
        reject(new Error('无法连接管理 WebSocket，请确认管理服务和会话已启动。'))
      }
    })

    ws.addEventListener('close', () => {
      const expected = state.expectedClose
      state.expectedClose = false
      clearManagerHeartbeat()
      state.ws = null
      if (!settled) {
        settled = true
        reject(new Error('管理 WebSocket 已关闭，会话可能不可用。'))
        return
      }
      // 非预期断开进入自动恢复流程
      if (expected) return
      beginReconnectLoop()
    })
  })
}

// 通用 HTTP JSON 请求封装
async function fetchJson(url: string, options: RequestInit = {}) {
  const response = await fetch(url, options)
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(body?.message || `请求失败 (${response.status})`)
  }
  return body
}

// 检查管理服务健康
async function checkManagerHealth(managerBase: string) {
  try {
    const body = await fetchJson(`${managerBase}/health`)
    return { ok: body?.code === 200 || body?.status === 'ok' || body?.data?.status === 'ok' }
  } catch {
    return { ok: false }
  }
}

// 根据租约在管理服务中查找现存会话
async function findSessionLease(managerBase: string, lease: Lease) {
  const body = await fetchJson(`${managerBase}/api/sessions`)
  const sessions = Array.isArray(body?.data) ? body.data : []
  return (
    sessions.find(
      (item: { sessionId?: string; streamerPort?: string | number }) =>
        (lease.sessionId && item.sessionId === lease.sessionId) ||
        (lease.streamerPort && String(item.streamerPort) === String(lease.streamerPort)),
    ) || null
  )
}

// 请求管理服务创建新会话
async function requestNewLease(managerBase: string, exeIndex: string) {
  const url = new URL(`${managerBase}/api/stream/address`)
  url.searchParams.set('exeIndex', String(exeIndex))
  const body = await fetchJson(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ exeIndex: Number.parseInt(exeIndex, 10) || 0 }),
  })
  if (body?.code !== 200 || !body.data) {
    throw new Error(body?.message || '启动像素流失败')
  }
  return body.data as ManagerSession
}

// 轻量自动重连控制器（按测试用例同等语义实现）
function createAutoReconnectController(deps: {
  intervalMs: number
  checkManagerHealth: (lease: Lease) => Promise<{ ok: boolean }>
  findSession: (lease: Lease) => Promise<ManagerSession | null>
  startSession: (lease: Lease) => Promise<ManagerSession | null>
  onStatus?: (kind: ReconnectStatus, error?: unknown) => void
  onRecovered?: (result: RecoveredResult) => void
}): ReconnectController {
  let timerId: ReturnType<typeof setTimeout> | null = null
  let running = false
  let inFlight = false
  let lease: Lease | null = null
  let generation = 0

  // 回传当前恢复状态，供上层日志/提示使用
  const emitStatus = (kind: ReconnectStatus, error?: unknown) => {
    deps.onStatus?.(kind, error)
  }

  // 停止轮询；默认推进 generation，避免旧异步结果污染
  const stop = (options?: { preserveGeneration?: boolean }) => {
    running = false
    inFlight = false
    if (!options || options.preserveGeneration !== true) {
      generation += 1
    }
    if (timerId !== null) {
      clearTimeout(timerId)
      timerId = null
    }
  }

  // 判断异步结果是否已过期（防并发串线）
  const isStale = (runGeneration: number, activeLease: Lease | null) => {
    return !running || runGeneration !== generation || activeLease !== lease
  }

  // 安排下一次恢复检查
  const schedule = () => {
    if (!running || timerId !== null) return
    timerId = setTimeout(() => {
      timerId = null
      void tick().catch((error) => {
        emitStatus('offline', error)
        schedule()
      })
    }, deps.intervalMs)
  }

  // 一次恢复尝试：健康检查 -> 查旧会话 -> 必要时新建
  const tick = async () => {
    if (!running || !lease || inFlight) return null
    inFlight = true
    const runGeneration = generation
    const activeLease = lease
    try {
      const health = await deps.checkManagerHealth(activeLease)
      if (isStale(runGeneration, activeLease)) return null
      if (!health?.ok) {
        emitStatus('offline')
        schedule()
        return null
      }

      emitStatus('recovering')
      const existing = await deps.findSession(activeLease)
      if (isStale(runGeneration, activeLease)) return null
      if (existing) {
        stop({ preserveGeneration: true })
        const resumed: RecoveredResult = { mode: 'resume', lease: existing }
        deps.onRecovered?.(resumed)
        return resumed
      }

      emitStatus('restarting')
      const restarted = await deps.startSession(activeLease)
      if (isStale(runGeneration, activeLease)) return null
      if (restarted) {
        stop({ preserveGeneration: true })
        const restartedResult: RecoveredResult = { mode: 'restart', lease: restarted }
        deps.onRecovered?.(restartedResult)
        return restartedResult
      }

      schedule()
      return null
    } finally {
      inFlight = false
    }
  }

  // 启动轮询
  const start = (nextLease?: Lease) => {
    lease = nextLease || lease
    if (!lease) return
    generation += 1
    running = true
    emitStatus('offline')
    schedule()
  }

  return {
    start,
    stop,
    tick,
    isRunning: () => running,
  }
}

// 从当前 state 生成可用于恢复的租约
function currentReconnectLease(): Lease | null {
  if (!state.managerBase || (!state.sessionId && !state.streamerPort)) {
    return null
  }
  return {
    managerBase: state.managerBase,
    sessionId: state.sessionId,
    streamerPort: state.streamerPort,
    exeIndex: String(currentExeIndex()),
  }
}

// 建立“像素流 + 管理 WS”完整链路
async function connectManagedSession(
  data: ManagerSession & { managerBase: string; exeIndex?: string },
  requireSocket = true,
  forceStreamReload = false,
) {
  const managerBase = normalizeBase(data.managerBase)
  const streamUrl = normalizeUrl(data.ipAddress)
  const streamerPort = data.streamerPort ? String(data.streamerPort) : inferPort(streamUrl)
  const wsUrl = data.webSocketUrl || (streamerPort ? buildManagerWsUrl(managerBase, streamerPort) : '')

  state.managerBase = managerBase
  state.sessionId = data.sessionId || ''
  state.streamerPort = streamerPort
  state.webSocketUrl = wsUrl
  state.activeStreamUrl = streamUrl
  state.reconnectStoppedByUser = false

  // 先确保画面可播放，再建立管理保活
  await initPixelStreaming(streamUrl, forceStreamReload)

  if (wsUrl) {
    try {
      await openManagerSocket(wsUrl)
      saveLease()
    } catch (error) {
      clearLease()
      if (requireSocket) throw error
      console.warn('仅建立像素流连接，未建立管理保活:', error)
    }
  } else if (requireSocket) {
    throw new Error('缺少管理 WebSocket 地址，无法建立保活连接。')
  }
}

// 自动恢复成功后，重建完整链路并刷新租约
async function recoverManagedSession(result: RecoveredResult) {
  const lease = result?.lease
  const managerBase = state.reconnectLease?.managerBase || state.managerBase
  if (!lease || !lease.ipAddress || !managerBase) {
    throw new Error('缺少自动恢复所需的会话信息。')
  }

  try {
    await connectManagedSession(
      {
        managerBase,
        ipAddress: lease.ipAddress,
        sessionId: lease.sessionId || '',
        streamerPort: lease.streamerPort ? String(lease.streamerPort) : '',
        webSocketUrl: lease.webSocketUrl || '',
        exeIndex: state.reconnectLease?.exeIndex || String(currentExeIndex()),
      },
      true,
      true,
    )
    state.reconnecting = false
    state.reconnectLease = currentReconnectLease()
  } catch (error) {
    state.reconnecting = true
    state.reconnectLease = {
      managerBase,
      sessionId: lease.sessionId || state.sessionId || '',
      streamerPort: lease.streamerPort ? String(lease.streamerPort) : state.streamerPort || '',
      exeIndex: String(currentExeIndex()),
    }
    console.warn('自动恢复失败，5 秒后继续重试:', error)
    ensureReconnectController().start(state.reconnectLease)
  }
}

// 懒初始化重连控制器
function ensureReconnectController() {
  if (state.reconnectController) return state.reconnectController
  state.reconnectController = createAutoReconnectController({
    intervalMs: reconnectPollMs,
    checkManagerHealth: async (lease) => checkManagerHealth(lease.managerBase),
    findSession: async (lease) => findSessionLease(lease.managerBase, lease),
    startSession: async (lease) => requestNewLease(lease.managerBase, lease.exeIndex),
    onStatus: (kind) => {
      state.reconnecting = true
      if (kind === 'offline') console.warn('管理服务离线，等待自动重连...')
      if (kind === 'recovering') console.log('管理服务恢复，尝试复用旧会话...')
      if (kind === 'restarting') console.log('旧会话不可用，准备自动创建新会话...')
    },
    onRecovered: (result) => {
      void recoverManagedSession(result)
    },
  })
  return state.reconnectController
}

// 管理 WS 非预期断开后的入口
function beginReconnectLoop() {
  if (state.reconnectStoppedByUser) return
  const lease = currentReconnectLease() || state.reconnectLease
  if (!lease) {
    console.warn('管理 WebSocket 已断开，缺少恢复上下文，请手动重连。')
    return
  }
  state.reconnectLease = lease
  ensureReconnectController().start(lease)
}

// 停止自动恢复
function stopReconnectLoop() {
  state.reconnecting = false
  state.reconnectLease = null
  state.reconnectController?.stop()
}

// 从管理服务新建会话并连接
async function startFromManager() {
  const managerBase = managerBaseFromConfig()
  const exeIndex = String(currentExeIndex())
  state.reconnectStoppedByUser = false
  stopReconnectLoop()
  clearLease()

  const session = await requestNewLease(managerBase, exeIndex)
  await connectManagedSession(
    {
      managerBase,
      ipAddress: session.ipAddress,
      sessionId: session.sessionId || '',
      streamerPort: session.streamerPort ? String(session.streamerPort) : '',
      webSocketUrl: session.webSocketUrl || '',
      exeIndex,
    },
    true,
    true,
  )
}

// 启动策略：优先复用缓存会话，失败再新建
async function bootManagedConnection() {
  const managerBase = managerBaseFromConfig()
  const cached = loadLease(managerBase)
  if (cached) {
    try {
      await connectManagedSession(
        {
          managerBase: cached.managerBase || managerBase,
          ipAddress: cached.activeStreamUrl,
          sessionId: cached.sessionId || '',
          streamerPort: cached.streamerPort || '',
          webSocketUrl: cached.webSocketUrl || '',
          exeIndex: String(cached.exeIndex ?? currentExeIndex()),
        },
        true,
        true,
      )
      return
    } catch (error) {
      clearLease()
      console.warn('复用旧会话失败，改为新建会话:', error)
    }
  }

  await startFromManager()
}

// 页面隐藏时：保留租约并关闭连接，便于刷新后复用
function onPageHide() {
  saveLease()
  stopReconnectLoop()
  closeManagerSocket(true)
}

// 组件挂载：按配置选择多对多（管理服务）或一对一直连
onMounted(async () => {
  try {
    if (window.kt_config.usePixelStreamMultiplayer) {
      await bootManagedConnection()
    } else {
      const directUrl = normalizeUrl(window.kt_config.stream_ip)
      state.activeStreamUrl = directUrl
      await initPixelStreaming(directUrl, true)
    }
  } catch (error) {
    loading.value = false
    console.error('像素流初始化失败:', error)
  }
  window.addEventListener('pagehide', onPageHide)
})

// 组件卸载：彻底清理监听、心跳、socket、播放器
onUnmounted(() => {
  window.removeEventListener('pagehide', onPageHide)
  state.reconnectStoppedByUser = true
  stopReconnectLoop()
  closeManagerSocket(true)
  destroyPixelStreaming()
})
</script>

<template>
  <div
    ref="pixelStreamingContainerRef"
    class="pixel-streaming-container"
    :class="{
      loaded: !loading,
    }"
  />
</template>

<style scoped>
.pixel-streaming-container {
  height: 100%;
  width: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.5s ease-in-out;
  min-height: 100px; /** 最小高度 放置不可见 */
}
.pixel-streaming-container.loaded {
  opacity: 1;
}
</style>
