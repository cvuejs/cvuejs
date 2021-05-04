import http, { AxiosResponse, CancelToken } from 'axios'
import { CANCEL_FLAG, HTTP_DEFAULT_CONFIG } from './http.constant'
import { HttpSendOption, HttpReturnType } from './http.dto'
import { MockService } from './mock/mock.service'
import {
  getCancelToken,
  transformParamsAndHeaders,
  urlVariableReplace
} from './utils'
import _ from 'lodash'

class HttpService {
  // 用于关闭（abort）axios的接口
  cancelToken?: { cancelToken: CancelToken }

  option: HttpSendOption = {}

  /**
   * 需要获取cancel的方法时预先调用
   */
  preSend(option: HttpSendOption) {
    const { cancel, cancelToken } = getCancelToken()
    this.cancelToken = cancelToken
    this.option = option

    const httpSend = this.send.bind(this)
    const httpSendWidthParams = this.sendWidthParams.bind(this)
    let cancelReturn = null
    if (option.params && option.params[CANCEL_FLAG]) {
      cancelReturn = {
        e: false,
        extra: { httpSend: httpSendWidthParams, cancel }
      }
      Reflect.deleteProperty(option.params, CANCEL_FLAG)
    }
    return {
      cancelReturn,
      httpSend
    }
  }

  async sendWidthParams(params: Record<string, any>) {
    this.option.params = params
    return await this.send(this.option)
  }

  /**
   * 发送请求
   */
  async send<T = any>(option: HttpSendOption = {}): Promise<HttpReturnType<T>> {
    let config = _.cloneDeep(
      _.defaultsDeep(option, this.option, HTTP_DEFAULT_CONFIG)
    ) as HttpSendOption

    /**
     * onBeforeSend、urlVariableReplace可能会改变params，为防止用户传入对象被改变，这里深拷贝一下
     */
    if (config.params) config.params = _.cloneDeep(config.params)

    /**
     * 执行onBeforeSend函数钩子
     */
    if (config.onBeforeSend) {
      config = await config.onBeforeSend(config)
    }

    /**
     * mock数据
     */
    if (config.mock && config.mock.enable) {
      const { isMatch, res } = await MockService.mock(config)
      if (config.mock.force || isMatch) {
        return res
      }
    }

    urlVariableReplace(config)
    /**
     * 开始发送
     */
    try {
      const res = await this.sendByHttpMethod(config)
      return config.onResponse
        ? await config.onResponse(res, config)
        : {
            e: false,
            response: res,
            httpStatus: 200
          }
    } catch (e) {
      process.env.NODE_ENV === 'development' && console.error(e)

      // 如果请求被cancel，不做任何处理
      if (!e.__CANCEL__ && config.onError && e.response) {
        await config.onError(e.response.data, config, e.response.status)
      }

      // 可能不是http错误请求，也有可能是代码，配置导致的错误
      return {
        e: true,
        error: e,
        httpStatus: e.response && e.response.status,
        response: e.response
      }
    }
  }

  private async sendByHttpMethod({
    prefixUrl = '',
    url,
    method = 'GET',
    params = {},
    paramsSerializer,
    bodyType,
    headers = {},
    requestConfig = {}
  }: HttpSendOption) {
    let res: AxiosResponse<Record<string, any>>
    let transformedData: Record<string, any>
    switch (method) {
      case 'GET':
        res = await http.get(prefixUrl + url, {
          ...this.cancelToken,
          params,
          paramsSerializer,
          headers,
          ...requestConfig
        })
        break
      case 'POST':
        transformedData = transformParamsAndHeaders(bodyType!, params, headers)
        res = await http.post(prefixUrl + url, transformedData.params, {
          ...this.cancelToken,
          headers: transformedData.headers,
          ...requestConfig
        })
        break
      case 'PUT':
        transformedData = transformParamsAndHeaders(bodyType!, params, headers)
        res = await http.put(prefixUrl + url, transformedData.params, {
          ...this.cancelToken,
          headers: transformedData.headers,
          ...requestConfig
        })
        break
      case 'PATCH':
        transformedData = transformParamsAndHeaders(bodyType!, params, headers)
        res = await http.patch(prefixUrl + url, transformedData.params, {
          ...this.cancelToken,
          headers: transformedData.headers,
          ...requestConfig
        })
        break
      case 'DELETE':
        res = await http.delete(prefixUrl + url, {
          ...this.cancelToken,
          paramsSerializer,
          params,
          headers,
          ...requestConfig
        })
        break
      case 'HEAD':
        res = await http.head(prefixUrl + url, {
          ...this.cancelToken,
          paramsSerializer,
          params,
          headers,
          ...requestConfig
        })
        break
      case 'OPTIONS':
        res = await http.options(prefixUrl + url, {
          ...this.cancelToken,
          paramsSerializer,
          params,
          headers,
          ...requestConfig
        })
        break
    }
    return res
  }
}

const HttpSend = <T>(
  HttpOption: HttpSendOption
): HttpReturnType | Promise<HttpReturnType> => {
  const { httpSend, cancelReturn } = new HttpService().preSend(HttpOption)
  return cancelReturn || httpSend(HttpOption)
}

const HttpConfig = (UserConfig: HttpSendOption) => {
  _.assign(UserConfig.mock, HTTP_DEFAULT_CONFIG.mock)
  _.assign(HTTP_DEFAULT_CONFIG, UserConfig)
}

export { HttpSend, HttpConfig }
