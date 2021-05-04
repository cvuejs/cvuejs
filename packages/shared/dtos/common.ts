import { ComponentInternalInstance } from 'vue'

export interface CommonStates<T> {
  state: string
  states: { name: string, c: T }[]
}

export interface CommonAdapter<T, S extends string> {
  /** 组件名称，用于区分相同组件 */
  n?: string

  /** 组件的slot别名，用于精准的slot注入 */
  slotAlias?: Partial<Record<S, string>>

  states?: CommonStates<T>

  /** 自定义的字段存放的对象 */
  extra?: Record<string | symbol, any>

  /** 用于区分组件是否是内部组件 */
  __INNER__?: boolean
}

export interface ComponentCallbackInjectParam<
  T = Record<string, any>,
  M = Record<string, any>
> {
  attrs: T
  output: M
  instance: ComponentInternalInstance
  preload?: any
}
