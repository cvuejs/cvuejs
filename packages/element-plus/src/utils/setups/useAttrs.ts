import { InstallOptions } from './../config/index'
import { computed, getCurrentInstance } from 'vue'
import _ from 'lodash'
import { getConfig } from '../config'

export const useAttrs = (
  props: Readonly<Record<string, any>>,
  defaultOption: Record<string, any>
) => {
  const $$props = _(props)
    .omitBy(_.isUndefined)
    .omit('c', 'n')
    .value()
  const name = getCurrentInstance()?.proxy?.$options
    .name as keyof InstallOptions
  console.log(name)
  console.log(getConfig('button'))
  const attrs = computed(() => {
    return _(props.c)
      .defaultsDeepSafe(getConfig('button') || {})
      .defaultsDeepSafe(defaultOption)
      .assign($$props)
      .value()
  })
  console.log($$props)
  console.log(attrs.value.type)
  console.log(attrs.value.circle)
  return {
    attrs
  }
}
