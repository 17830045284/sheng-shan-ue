// window.DEVELOPMENT_URL = 'http://121.37.183.225:7063/lltech/'
window.DEVELOPMENT_URL = '/api'
window.PRODUCTION_URL = 'https://www.baidu.com'

// 可配置的文件
window.kt_config = {
  usePixelStream: false, // 是否使用 UE 像素流
  usePixelStreamMultiplayer: false, //采用多对多像素流 or 一对一像素流
  manager_url: '',
  exeIndex: 0,
  ws_url: '', // ws 返回一个像素流地址，一定要有末尾的 /，用于后端匹配像素流ip 也就是 stream_port，UE像素流多对多地址
  stream_port: '', // 多对多流媒体端口 用于后端匹配像素流ip
  stream_ip: '', // UE像素流一对一地址
}

// window.kt_config = {
//   usePixelStream: true,
//   usePixelStreamMultiplayer: true, // 改为 true
//   manager_url: 'http://你的管理服务IP:端口', // 如 'http://10.1.10.21:89'
//   exeIndex: 0,
//   ws_url: 'ws://你的管理服务IP:端口/ws/', // 注意末尾斜杠
//   stream_port: '', // 多对多时由管理服务分配
//   stream_ip: '', // 多对多时不需要
// }

// window.kt_config = {
//   usePixelStream: true,
//   usePixelStreamMultiplayer: false, // 改为 false
//   manager_url: '',
//   exeIndex: 0,
//   ws_url: '',
//   stream_port: '',
//   stream_ip: 'http://你的UE像素流服务器地址:端口/', // 如 'http://117.173.207.8:8222/'
// }