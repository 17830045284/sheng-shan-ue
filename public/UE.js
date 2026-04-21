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
  (window.ue4 = ue.interface.broadcast)
window.ue.interface = ue.interface

/**
 * ue 调 web 方法
 * roter 是 ue 调的方法名称
 * */
// window.ue.interface.router = (path) => {
//   router.push(`/${path}`);
// };

/**
 * web 传数据给 ue 方法
 * postData 是 ue 程序内的方法名称，
 */
// const data = {
//   name: '测试',
//   value: 100
// }
// ue4("postData", data);
