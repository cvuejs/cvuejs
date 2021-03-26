import { ProviderService } from './../service/provider.service'
import { COMPONENT_METHODS, COMPONENT_DATAS } from './../constants/component'

export const useCommonFactory = () => {
  /**
   * 触发组件提供的方法,来改变组件状态
   * @param method 触发组件方法的名称
   * @param name 组件的名称，默认’‘
   * @param data 传递给方法的数据
   */
  function emit(method: COMPONENT_METHODS, name?: string, data?: Record<string, any>): void
  function emit(method: COMPONENT_METHODS, data?: Record<string, any>): void
  function emit(method: COMPONENT_METHODS, name: any = '', data?: any) {
    if (!_.isString(name) && _.isUndefined(data)) {
      data = name
      name = ''
    }
    ProviderService.emit(method, data, name)
  }

  /**
   * 接收组件提供的数据
   * @param dataName 接受组件数据的名称
   * @param componentName 组件的名称，默认''
   * @param isGetAllMatchData 是否返回全部匹配的数据，false时只返回匹配的第一条，默认false
   */
  function reveice(
    dataName: COMPONENT_DATAS,
    componentName = '',
    isGetAllMatchData = false
  ) {
    return ProviderService.reveice(dataName, componentName, isGetAllMatchData)
  }

  return {
    emit,
    reveice
  }
}
