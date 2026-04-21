import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import 'animate.css'
import './tailwind.css'
import KTUI from './components/kt-ui'

const app = createApp(App)
const pinia = createPinia()

app.use(KTUI).use(router).use(pinia).mount('#app')
