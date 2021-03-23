import { COMPONENT_TYPE } from '../constants/component'
import { computed } from 'vue'
import _ from 'lodash'
import { getConfig } from '../config'

export const useAttrs = (
  props: Readonly<Record<string, any>>,
  defaultOption: Record<string, any>,
  type: COMPONENT_TYPE
) => {
  const attrs = computed(() => {
    return _(props.c)
      .defaultsDeepSafe(getConfig(type) || {})
      .defaultsDeepSafe(defaultOption)
      .value()
  })
  console.log(attrs.value)
  return {
    attrs
  }
}
