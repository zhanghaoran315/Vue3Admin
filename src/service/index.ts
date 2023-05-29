import HrRequest from './request/index'

import config from '@/global/config'
import { localCache } from '@/utils'
import { LOGIN_TOKEN } from '@/global'

export default new HrRequest({
  baseURL: config.BASE_URL,
  timeout: config.TIME_OUT,
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
