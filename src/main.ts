import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/stores'
import 'normalize.css'
import '@/assets/css/index.less'

import { Boot } from '@wangeditor/editor'
import attachmentModule from '@wangeditor/plugin-upload-attachment'

// 注册。要在创建编辑器之前注册，且只能注册一次，不可重复注册。
Boot.registerModule(attachmentModule)

import icon from '@/global/index'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(icon)
app.mount('#app')
