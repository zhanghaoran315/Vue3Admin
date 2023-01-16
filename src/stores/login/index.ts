import { defineStore } from 'pinia'
import { localCache, mapMenusToRoutes, mapMenusToPermissions } from '@/utils'
import router from '@/router'
import type { IAccount } from '@/types'

import { accountLogin, getUserInfoById, getUserMenusByRoleId } from '@/service'
import { LOGIN_TOKEN } from '@/global'

interface ILoginState {
  token: string
  userName: string
  userInfo: any
  userMenus: any[]
  permissions: string[]
}

export const useLoginStore = defineStore('login', {
  state(): ILoginState {
    return {
      token: '',
      userName: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  actions: {
    async accountLoginAction(account: IAccount) {
      // 1.获取 id 和 token
      const loginResult = await accountLogin(account)
      const { id, name: userName, token } = loginResult.data
      this.userName = userName
      this.token = token
      localCache.setItem(LOGIN_TOKEN, token)
      localCache.setItem('userName', userName)

      // 2.获取 userInfo
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      localCache.setItem('userInfo', userInfo)
      const roleId = userInfo.role.id

      // 3.获取 userMenus
      const userMenusResult = await getUserMenusByRoleId(roleId)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      localCache.setItem('userMenus', userMenus)

      // 4.获取按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 5.动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 6.跳转到首页
      router.push('/main')
    },
    initialStore() {
      const token = localCache.getItem(LOGIN_TOKEN)
      const userName = localCache.getItem('userName')
      const userInfo = localCache.getItem('userInfo')
      const userMenus = localCache.getItem('userMenus')

      if (token && userName && userInfo && userMenus) {
        this.$patch({
          token,
          userName,
          userInfo,
          userMenus
        })

        // 1.获取按钮权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
