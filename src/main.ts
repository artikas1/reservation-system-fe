import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerPlugins } from '@/plugins'

import '@vuepic/vue-datepicker/dist/main.css'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

registerPlugins(app)
app.use(router)

app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
})

app.mount('#app')
