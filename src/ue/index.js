import ue, { ue5 } from './linkUE'
import { handleUeEvents } from './handler'
import mitt from 'mitt'
import { onBeforeUnmount } from 'vue'
import { CACHE } from '@/ktJS/CACHE'
// import eventBus from "@/eventBus";

const emitter = mitt()

// 向UE发送消息
/**
 *
 * @param {*} type we-event-name  事件名称
 * @param {*} data {text:1}  事件数据
 */
export const sendToUE = (type, data = {}) => {
  const params = {
    type,
    data,
  }
  console.log('WebToUE --web发送到UE数据-->', params)
  ue5('WebToUE', params)
  CACHE.pixelStream?.stream?.emitUIInteraction(params)
  if (window.loadMethod) {
  }
}
// 提供给UE调用的接口
/**
 *
 * @param {*} _params {type: string, data: object}
 */
ue.interface.UEemit = function (_params) {
  // console.log('UEemit --UE发送到web数据-->', _params)
  let params = _params
  if (typeof _params === 'string') params = JSON.parse(_params)
  const { type, data } = params
  handleUeEvents(type, data)
  emitter.emit(type, data)
}

// 监听UE消息
/**
 *
 * @param {*} events {'ue-event-name':(data)=>{}}  事件监听函数
 */
export const watchUEEvents = (events) => {
  for (const event in events) {
    console.log(event, 'event')
    emitter.on(event, events[event])
  }
  onBeforeUnmount(() => {
    for (const event in events) {
      emitter.off(event, events[event])
    }
    // eventBus.off('sendToUe');
  })
}

// 例子
// watchUEEvents({
//   "stopInspection": (data) => {
//     showBtn.value = false;
//     store.isInspection = true
//   },
// });
