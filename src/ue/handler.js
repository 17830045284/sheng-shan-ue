import { useStore } from '../stores'
import router from '../router'
import { sendToUE } from './index'
import { CACHE } from '@/ktJS/CACHE'

function handlRouteChange(mode) {
  const routePath = '/' + mode
  store.currentRouteName = mode
  store.currentRoute = routePath
  router.push(routePath)
}

function handleFloorChange(store, data) {
  store.currentFloor = data.floor
  store.isShowPlaceButton = true
  store.isInner = true
  store.curPlaceList = store.placeKindObj[data.mode]
}

function handlRoamProcess(store, data) {
  store.curRoamProcess = data.ueName
}

// 新增：处理来自 Pixel Streaming 的特殊消息
function handlePixelStreamingMessage(data) {
  console.log('Pixel Streaming 消息:', data)
  // 根据业务需求处理
}

export function handleUeEvents(type, data) {
  const store = useStore()
  console.log("UE传消息啦", type, data);
  
  switch (type) {
    case 'stopInspection':
      store.isInspection = true
      break
    case 'isKanban':
      store.isKanban = data?.selected
      break
    case 'ue_nav-click':
      handlRouteChange(data.mode)
      break
    case 'roam_process':
      handlRoamProcess(store, data)
      break
    case 'space-click':
      store.isPause = !store.isPause
      const ueOptionData = {
        mode: store.currentRouteName,
        name: 'roam',
        isPause: store.isPause,
      }
      sendToUE("place-click", ueOptionData)
      break
    case 'pixelstreaming-message':
      handlePixelStreamingMessage(data)
      break
    default:
      // 其他未处理的消息
      console.log('未处理的 UE 消息类型:', type, data)
  }
}