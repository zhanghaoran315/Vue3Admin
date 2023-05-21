import HrRequest from './request/index'

import { BASE_URL, TIME_OUT } from '@/config/index'
import { localCache } from '@/utils'
import { LOGIN_TOKEN } from '@/global'

export default new HrRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: false,
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('实例的请求拦截器', config)
      const token = localCache.getItem(LOGIN_TOKEN)
      if (config.headers && token) {
        ;(config.headers as any).Authorization = 'Bearer ' + token
      }

      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    responseInterceptor: (response) => {
      return response
    },
    responseInterceptorCatch: (error) => {
      return error
    }
  }
})

export * from './login'
export * from './main/system'
