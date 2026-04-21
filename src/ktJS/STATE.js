import { API } from './API.js'
import { CACHE } from './CACHE.js'

const PUBLIC_PATH = './assets/3d'
const initialState = {
  position: { x:234.3, y:1.7, z:-43.92 },
  target: { x:229.32, y:0.08, z:-46.18 }
}

export const STATE = {
  initialState,
  PUBLIC_PATH,
}
