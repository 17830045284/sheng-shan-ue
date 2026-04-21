import TU from '../threeUtils'

export default function onLoad(container) {
  container.loadingBar.style.visibility = "hidden"
  window.container = container
  TU.init(container, Bol3D)
}
