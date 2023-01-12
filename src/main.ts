import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/stores'
import 'normalize.css'
import '@/assets/css/index.less'

import icon from '@/global/index'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(icon)
app.mount('#app')
