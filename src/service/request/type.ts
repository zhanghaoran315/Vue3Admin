import type { AxiosRequestConfig } from 'axios'

interface HrInterceptor<T = any> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface HrRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: HrInterceptor<T>
  showLoading?: boolean
}

export type { HrInterceptor, HrRequestConfig }
