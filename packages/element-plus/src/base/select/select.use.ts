import { SelectAdapter } from './select.adapter'
import {
  computed,
  ComputedRef,
  getCurrentInstance,
  SetupContext,
  watch,
  watchEffect
} from 'vue'
import { useAsyncData } from '../../utils/hooks/useAsyncData'
import { useModelValue } from '../../utils/hooks/useModelValue'
import { COMPONENT_NAME } from '../../utils/constants/component'
import { OptionGroupAdapter } from '../option-group/option-group.adapter'

interface UseSelectOpt {
  props: Record<string, any>
  attrs: ComputedRef<SelectAdapter>
  state: SelectState
  ctx: SetupContext<any>
}

export interface SelectState {
  loading: boolean
}

export const useSelect = ({ props, attrs, state, ctx }: UseSelectOpt) => {
  const instance = getCurrentInstance()
  const { data, send } = useAsyncData(attrs.value.asyncOptions)

  watchEffect(
    () => {
      if (attrs.value.asyncOptions) {
      if (data.value) {
        switch (attrs.value.type) {
          case 'option':
            attrs.value.options = data.value
            break
          case 'optionGroup':
            attrs.value.optionGroups = data.value as OptionGroupAdapter[]
            break
          default:
            attrs.value.options = data.value
        }
      }
      attrs.value.loading = !!attrs.value.asyncOptions.loading
      }
    }
  )

  if (attrs.value.asyncOptions) {
    const { onVisibleChange, onModelChange } = attrs.value
    const apiHook = attrs.value.asyncOptions!.apiHook
    attrs.value.onVisibleChange = (visible, data) => {
      onVisibleChange && onVisibleChange(visible, data)
      if (
        visible &&
        (apiHook === 'visibleTrue' ||
          (_.isObject(apiHook) && apiHook.includes('visibleTrue')))
      ) {
        send()
      }
    }
    attrs.value.onModelChange = (v, oldv, data) => {
      onModelChange && onModelChange(v, oldv, data)
      if (
        v &&
        !oldv &&
        (apiHook === 'modelValueFirstChange' ||
          (_.isObject(apiHook) && apiHook.includes('modelValueFirstChange')))
      ) {
        send()
      }
    }
  }
  
  /** 需要放在改写onModelChange之后 */
  useModelValue({ props, attrs, ctx })

  function focus() {
    const select = instance!.refs[COMPONENT_NAME.select] as any
    select && select.focus()
  }
  function blur() {
    const select = instance!.refs[COMPONENT_NAME.select] as any
    select && select.blur()
  }

  const output = computed(() => ({
    focus,
    blur
  }))
  return { output }
}
