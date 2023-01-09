import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/stores'
import 'normalize.css'
import '@/assets/css/index.less'

import icon from '@/global/index'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(icon)
app.mount('#app')

import hrRequest from '@/service'

hrRequest
  .get({
    url: 'http://123.207.32.32:8000/home/multidata'
  })
  .then((res) => {
    console.log('res: ', res)
  })
