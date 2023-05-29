import axios from 'axios'
import type { AxiosInstance } from 'axios'

import type { HrInterceptor, HrRequestConfig } from './type'
import { ElLoading, ElMessage } from 'element-plus'

import router from '@/router'

const DEFAULT_SHOWLOADING = false

/**
 * 拦截器的处理
 * 1.全局的拦截器
 * 2.实例的拦截器
 * 3.单个请求的拦截器
 *
 * showLoading的处理
 * 1.全局控制
 * 2.实例控制
 * 3.单个请求控制
 */

class HrRequest {
  instance: AxiosInstance
  interceptors?: HrInterceptor
  showLoading: boolean
  loadingInstance: any

  constructor(config: HrRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_SHOWLOADING

    // 全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局的拦截器-请求成功')
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.3)'
          })
        }
        return config
      },
      (error) => {
        // console.log('全局的拦截器-请求失败')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        // console.log('全局的拦截器-响应成功')
        this.loadingInstance?.close()
        const { data } = response
        if (data.code === 401) {
          ElMessage.error(data.message)
          return router.push('/login')
        }
        return data
      },
      (error) => {
        console.log('全局的拦截器-响应失败', error)
        this.loadingInstance?.close()
        return error
      }
    )

    // 实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  request<T = any>(config: HrRequestConfig<T>): Promise<T> {
    // 单个请求的请求拦截器-请求成功
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }
    return this.instance
      .request<any, T>(config)
      .then((res) => {
        // 单个请求的响应拦截器-响应成功
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        return res
      })
      .catch((err) => {
        return Promise.reject(err)
      })
      .finally(() => {
        // 将showLoading设置为true,这样不会影响下一个请求
        this.showLoading = DEFAULT_SHOWLOADING
      })
  }

  get<T = any>(config: HrRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: HrRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  patch<T = any>(config: HrRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }

  delete<T = any>(config: HrRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default HrRequest
