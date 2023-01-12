import hrRequest from '..'
import type { IAccount } from '@/types'

enum LoginAPI {
  Login = '/login',
  getUserInfo = '/users/',
  getUserMenus = '/role/'
}

/**
 * 登录
 * 1.获取 id 和 token
 * 2.获取 userInfo，拿到角色id
 * 3.获取用户菜单
 */
export function accountLogin(account: IAccount) {
  return hrRequest.post({
    url: LoginAPI.Login,
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hrRequest.get({
    url: LoginAPI.getUserInfo + id,
    showLoading: false
  })
}

export function getUserMenusByRoleId(id: number) {
  return hrRequest.get({
    url: LoginAPI.getUserMenus + id + '/menu',
    showLoading: false
  })
}
