import { computed, ComputedRef, getCurrentInstance } from 'vue'
import _ from 'lodash'

interface OutputOpt<T> {
  attrs: ComputedRef<Record<string, any>>
  output: T
}

export const useOutput = <T>({ attrs, output }: OutputOpt<T>) => {
  const instance = getCurrentInstance()

  /** 改写回调函数，将实例和attrs注入最后一个参数 */
  const data = {
    attrs,
    output,
    instance
  }
  _.forOwn(attrs.value, (v, k) => {
    if (k.startsWith('on') && typeof v === 'function') {
      const fn = attrs.value[k]
      attrs.value[k] = (...args: any[]) => fn(...args, data)
    }
  })

  return {
    output: computed(() => output)
  }
}
