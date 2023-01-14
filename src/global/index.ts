import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { formatUTCString } from '@/utils'

// 注册 icon
function registerIcons(app: App<Element>) {
  for (const [name, cpn] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, cpn)
  }
}

// 注册全局属性
function registerProperties(app: App<Element>) {
  app.config.globalProperties.$format = {
    formatTime(value: string) {
      return formatUTCString(value)
    }
  }
}

// 出口
function register(app: App<Element>) {
  registerIcons(app)
  registerProperties(app)
}

export default register

export * from './constants'
