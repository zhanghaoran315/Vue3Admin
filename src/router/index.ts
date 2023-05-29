import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { LOGIN_TOKEN } from '@/global'
import { localCache, initMenu } from '@/utils'

// 个人中心
import Profile from './main/profile/profile'
// 故事详情
import storyDetail from './main/story/list/detail'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/layout/main.vue'),
    children: [Profile, storyDetail]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/screenfull',
    component: () => import('@/views/screen-full/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/not-found/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path.startsWith('/main')) {
    const token = localCache.getItem(LOGIN_TOKEN)
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    return initMenu.url
  }
})

export default router
