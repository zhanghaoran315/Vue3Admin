import HrRequest from './request/index'

import { BASE_URL, TIME_OUT } from '@/config/index'

export default new HrRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('实例的请求拦截器-请求成功')
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('实例的请求拦截器-请求失败')
      return error
    },
    responseInterceptor: (response) => {
      console.log('实例的响应拦截器-响应成功')
      return response
    },
    responseInterceptorCatch: (error) => {
      console.log('实例的响应拦截器-响应失败')
      return error
    }
  }
})
