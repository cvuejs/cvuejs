import { defaultsDeep } from 'lodash';
import http, { AxiosResponse, CancelToken } from 'axios'
import { HTTP_DEFAULT_CONFIG } from './http.constant'
import { HttpSendOption, HttpReturnType } from './http.dto'
import { MockService } from './mock/mock.service'
import {
  getCancelToken,
  transformParamsAndHeaders,
  urlVariableReplace
} from './utils'

class HttpService {
  // 用于关闭（abort）axios的接口
  cancelToken?: { cancelToken: CancelToken }

  /**
   * 需要获取cancel的方法时预先调用
   */
  async preSend() {
    const { cancel, cancelToken } = getCancelToken()
    this.cancelToken = cancelToken

    return {
      cancel,
      HttpSend: this.send
    }
  }

  /**
   * 发送请求
   */
  async send<T = any>(option: HttpSendOption): Promise<HttpReturnType<T>> {
    let config = _.cloneDeep(_.defaultsDeep(option, HTTP_DEFAULT_CONFIG))

    /**
     * 执行beforeHttpSend函数钩子
     */
    if (config.beforeHttpSend) {
      config = await config.beforeHttpSend(config)
    }

    /**
     * mock数据
     */
    if (config.mock && config.mock.enable) {
      return await MockService.mock(config)
    }

    /**
     * urlVariableReplace可能会改变params，为防止用户传入对象被改变，这里深拷贝一下
     */
    if (config.params) config.params = _.cloneDeep(config.params)
    urlVariableReplace(config)

    /**
     * 开始发送
     */
    try {
      const res = await this.sendByHttpMethod(config)
      return config.responseHandle
        ? await config.responseHandle(res, config)
        : {
            e: false,
            response: res,
            httpStatus: 200
          }
    } catch (e) {
      process.env.NODE_ENV === 'development' && console.error(e)

      // 如果请求被cancel，不做任何处理
      if (!e.__CANCEL__ && config.errorHandle && e.response) {
        await config.errorHandle(e.response.data, config, e.response.status)
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
    headers = {}
  }: HttpSendOption) {
    let res: AxiosResponse<Record<string, any>>
    let transformedData: Record<string, any>
    switch (method) {
      case 'GET':
        res = await http.get(prefixUrl + url, {
          ...this.cancelToken,
          params,
          paramsSerializer,
          headers
        })
        break
      case 'POST':
        transformedData = transformParamsAndHeaders(bodyType!, params, headers)
        res = await http.post(prefixUrl + url, transformedData.params, {
          ...this.cancelToken,
          headers: transformedData.headers
        })
        break
      case 'PUT':
        transformedData = transformParamsAndHeaders(bodyType!, params, headers)
        res = await http.put(prefixUrl + url, transformedData.params, {
          ...this.cancelToken,
          headers: transformedData.headers
        })
        break
      case 'PATCH':
        transformedData = transformParamsAndHeaders(bodyType!, params, headers)
        res = await http.patch(prefixUrl + url, transformedData.params, {
          ...this.cancelToken,
          headers: transformedData.headers
        })
        break
      case 'DELETE':
        res = await http.delete(prefixUrl + url, {
          ...this.cancelToken,
          paramsSerializer,
          params,
          headers
        })
        break
      case 'HEAD':
        res = await http.head(prefixUrl + url, {
          ...this.cancelToken,
          paramsSerializer,
          params,
          headers
        })
        break
      case 'OPTIONS':
        res = await http.options(prefixUrl + url, {
          ...this.cancelToken,
          paramsSerializer,
          params,
          headers
        })
        break
    }
    return res
  }

  /**
   * 将返回的数据替换为mockData，并延迟delay毫秒
   */
  private mock(option: HttpSendOption): Promise<HttpReturnType> {
    const { mockData, delay = 0 } = option
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve({
          e: false,
          data: mockData,
          httpStatus: 200,
          response: mockData
        })
      }, delay)
    })
  }
}

const HttpSend = <T>(HttpOption: HttpSendOption) => {
  return new HttpService().send<T>(HttpOption)
}
const HttpPreSend = () => {
  return new HttpService().preSend()
}
const HttpConfig = (UserConfig: HttpSendOption) => {
  _.assign(UserConfig.mock, HTTP_DEFAULT_CONFIG.mock)
  _.assign(HTTP_DEFAULT_CONFIG, UserConfig)
}

export { HttpSend, HttpPreSend, HttpConfig }
