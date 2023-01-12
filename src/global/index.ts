import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// import 'element-plus/es/components/message/style/css'
// import 'element-plus/es/components/loading/style/css'

function registerIcons(app: App<Element>) {
  for (const [name, cpn] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, cpn)
  }
}

export default registerIcons

export * from './constants'
