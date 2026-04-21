import { useStore } from '../stores'
import router from '../router'
import { sendToUE } from './index'

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

export function handleUeEvents(type, data) {
  const store = useStore()
  // console.log("UE传消息啦", type, data);
  switch (type) {
    case 'stopInspection': // 切换楼层(进入内部)
      store.isInspection = true
      // handleFloorChange(store, data);
      break
    // case "isKanban":
    //   store.isKanban = data.selected;
    //   break;
    // case "ue_nav-click": // 切换导航栏
    //   handlRouteChange(data.mode);
    //   break;
    // case "roam_process": // 漫游进程
    //   handlRoamProcess(store, data);
    //   break;
    // case "space-click": // 按下空格键，漫游暂停
    //   store.isPause = !store.isPause;
    //   const ueOptionData = {
    //     mode: store.currentRouteName,
    //     name: 'roam',
    //     isPause: store.isPause,
    //   };
    //   sendToUE("place-click", ueOptionData);
    //   break;
  }
}
