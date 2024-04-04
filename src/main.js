import './assets/main.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'
import { VueQueryPlugin } from 'vue-query'

const app = createApp(App)
app.use(ToastPlugin)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
