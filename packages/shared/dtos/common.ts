export interface CommonAdapter {
  /** 组件名称，用于区分相同组件 */
  n: string
  // styles?: string[] // 为当前组件赋予不同的状态样式
  slots: Record<string, string | undefined> // 组件的slots集合
  /** UI库组件的events */
  // on?: Record<string, Function | undefined>
  /** 用户自定义的字段存放的对象 */
  extra: Record<string | symbol, any>
}
