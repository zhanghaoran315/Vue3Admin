import { useLoginStore } from './login/index'
import { createPinia } from 'pinia'
import type { App } from 'vue'

const pinia = createPinia()

function registerStore(app: App) {
  // 1.注册 pinia
  app.use(pinia)

  // 2.初始化 Store
  const loginStore = useLoginStore()
  loginStore.initialStore()
}

export default registerStore

export * from './login'
export * from './main/system'
