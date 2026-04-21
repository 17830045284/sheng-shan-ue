'object' != typeof ue || 'object' != typeof ue.interface
  ? ('object' != typeof ue && (ue = {}),
    (ue.interface = {}),
    (ue.interface.broadcast = function (e, t) {
      if ('string' == typeof e) {
        var o = [e, '']
        void 0 !== t && (o[1] = t)
        var n = encodeURIComponent(JSON.stringify(o))
        'object' == typeof history && 'function' == typeof history.pushState
          ? (history.pushState({}, '', '#' + n),
            history.pushState({}, '', '#' + encodeURIComponent('[]')))
          : ((document.location.hash = n),
            (document.location.hash = encodeURIComponent('[]')))
      }
    }))
  : (function (e) {
      ;(ue.interface = {}),
        (ue.interface.broadcast = function (t, o) {
          'string' == typeof t &&
            (void 0 !== o
              ? e.broadcast(t, JSON.stringify(o))
              : e.broadcast(t, ''))
        })
    })(ue.interface),
  (ue5 = ue.interface.broadcast)

ue.interface.emitUE = function (params) {
  if (!_bus) return
  console.log('emitUE', params)

  if (typeof params === 'string') params = JSON.parse(params)
  const { type, data } = params
  // 页面跳转 // {type:'redirect_webpage',data:{url:'/path/to/page'}}
  // 关闭legend // {type: 'legend_change', data: {text:'全域视角', is_select:0}}
  _bus.emit(type, data)
}

window.sendToUE = (data) => ue5('toUE', data)

// 发送数据到UE的方法 // 该方法会自动添加 mode / page
// window.sendToUE5 = (data) => {
//   const METAValue = META.value
//   const params = {
//     ...data,
//     page: METAValue.current_path,
//     mode: METAValue.mode,
//     cabin: METAValue.cabin,
//     partition: METAValue.partition,
//   };
//   console.log("sendToUE", params);
//   sendToUE(params);
// };
