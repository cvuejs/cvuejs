import { COMPONENT_TYPE } from '../constants/component'
import { computed, ComputedRef, getCurrentInstance } from 'vue'
import _ from 'lodash'
import { getConfig } from '../config'

interface ComputeAttrsOpt {
  props: Readonly<Record<string, any>>
  defaultOption: Record<string, any>
  type: COMPONENT_TYPE
  output: ComputedRef<Record<string, any>>
}

export const useComputeAttrs = <T>({
  props,
  defaultOption,
  type,
  output
}: ComputeAttrsOpt) => {
  const instance = getCurrentInstance()

  const $$listener = _(instance!.attrs)
    .omit('class', 'style', 'id')
    .pickBy((v, key) => key.startsWith('on') && typeof v === 'function')
    .value()

  const $$props = computed(() => {
    return _(props)
      .omitBy(_.isUndefined)
      .omit('c')
      .value()
  })

  const attrs = computed<T>(() => {
    /**
     * TODO $listener与props.c中的回调重复时合并而非覆盖
     */
    return _(props.c)
      .defaultsDeepSafe(getConfig(type) || {})
      .defaultsDeepSafe(defaultOption)
      .assign($$props)
      .assign($$listener) // 写在html中的回调会覆盖props.c中的回调
      .tap((c) => {
        /** 改写回调函数，将实例和attrs注入最后一个参数 */
        const data = {
          attrs,
          instance,
          output: output.value
        }
        _.forOwn(c, (v, k) => {
          if (k.startsWith('on') && typeof v === 'function') {
            const fn = c[k]
            c[k] = (...args: any[]) => fn(...args, data)
          }
        })
      })
      .value()
  })
  return {
    attrs
  }
}
