import { STATE } from '../STATE'
import {onLoad, onProgress} from "@/ktJS/module/index.js";
const Template = {
  publicPath: STATE.PUBLIC_PATH,
  viewState: 'orbit',
  cameras: {
    orbitCamera: {
      position: [
        STATE.initialState.position.x,
        STATE.initialState.position.y,
        STATE.initialState.position.z
      ],
      near: 1,
      far: 10000000,
      fov: 60
    }
  },
  controls: {
    orbitControls: {
      autoRotate: false,
      autoRotateSpeed: 1,
      target: [
        STATE.initialState.target.x,
        STATE.initialState.target.y,
        STATE.initialState.target.z
      ],
      // minDistance: 16,
      // maxDistance: 2500,
      maxPolarAngle: Math.PI * 0.49,
      minPolarAngle: Math.PI * 0.05,
      enableDamping: false,
      dampingFactor: 0.05,
    }
  },
  lights: {
    directionLights: [{
      color: 0xffdcb2,
      intensity: 1.2,
      position: [26, 40, 20],
      mapSize: [4096, 4096],
      near: -632,
      far: 500,
      bias: -0.0007,
      // distance: 900,
      top: 945,
      right: 1130,
      bottom: -902,
      left: -1222,
      target: [0, 0, 0],
      castShadow: true,
    }],
    ambientLight: {
      color: '#ffffff',
      intensity: 0.2
    }
  },
  background: {
    type: 'panorama',
    value: ['/editor/2.jpg'],
    options: {
      scale: 1,
      rotation: [0, 0, 0],
      fog: false, // 天空盒受雾影响 默认值为false
      panoramaEncoding: 3001,
    }
  },
  modelUrls: [
    '/editor/1-v1.glb',
  ],
  hdrUrls: ['/hdr/blue_photo_studio_1k.hdr'],
  enableShadow: true,
  antiShake: false,
  // fog: {
  //   color: '#2c4027',
  //   intensity: 0.00022
  // },
  toneMapping: {
    toneMappingExposure: 1,
    toneMappingType: "ACESFilmicToneMapping"
    // LinearToneMapping = 1;
    // ReinhardToneMapping = 2;
    // CineonToneMapping = 3;
    // ACESFilmicToneMapping = 4;
  },
  bloomEnabled: false,
  // bloom: { //泛光参数配置
  //   // bloomStrength: 0, // 强度
  //   // threshold: 0, // 阈值
  //   // bloomRadius: 0, // 半径
  //   bloomStrength: .7, threshold: 0, bloomRadius: .1
  // },
  outlineEnabled: true,
  outline: {
    enabled: true,
    edgeStrength: 3.6,
    edgeGlow: 0.46,
    edgeThickness: 2.4,
    pulsePeriod: 2,
    visibleEdgeColor: "#007BFF",
    hiddenEdgeColor: "#190a05"
  },
  dofEnabled: false,//景深
  // dof: {
  //     focusDistance: 10,
  //     fStop: 2.8,
  //     aperture: 35,
  //     maxBlur: 4,
  //     enabled: true
  // },
  msaa: {
    supersampling: true
  },
  gammaEnabled: true,
  bounds: {
    radius: 1000,
    center: [120, 0, -50]
  },
  stats: false,
  loadingBar: {
    show: true,
    type: 10
  },
  onProgress,
  onLoad,
}

export default Template
