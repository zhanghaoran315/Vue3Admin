import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcons(app: App) {
  for (const [name, cpn] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, cpn)
  }
}

export default registerIcons
