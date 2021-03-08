import { AxiosResponse } from 'axios'

export type HTTP_METHODS =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
export type HTTP_BODY_TYPES = 'RAW_JSON' | 'FORM_DATA' | 'X_WWW_FORM_URLENCODED'

export interface HttpReturnType<T = any> {
  e: boolean
  error?: Error
  // 请求成功后直接可用的数据
  data?: T
  response?: any
  httpStatus?: number
}

export interface HttpMockType {
  /** 是否开启Mock */
  enable?: boolean
  /** 请求延迟，单位：毫秒，默认：`300` */
  delay?: number
  log?: boolean
  force?: boolean
  copy?: boolean
  data?: Record<string, any>
}

export interface HttpSendOption {
  prefixUrl?: string // 经过代理的接口前缀地址
  url?: string
  params?: { [key: string]: any }
  paramsSerializer?(params: { [key: string]: any }): string
  headers?: { [key: string]: any }
  method?: HTTP_METHODS
  bodyType?: HTTP_BODY_TYPES

  mockData?: any
  delay?: number

  responseHandle?(
    res: AxiosResponse<Record<string, any>>,
    option: HttpSendOption
  ): HttpReturnType | Promise<HttpReturnType>
  errorHandle?: (
    res: Record<string, any>,
    option: HttpSendOption,
    httpStatus: number
  ) => void | Promise<void>
  beforeHttpSend?(
    options: HttpSendOption
  ): HttpSendOption | Promise<HttpSendOption>

  /** MOCK相关 */
  mock?: HttpMockType

  /** 用户自定义设置 */
  extra?: Record<string, any>
}
