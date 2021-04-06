import { DatePickerAdapter } from './date-picker.adapter'
import { computed, ComputedRef, getCurrentInstance, SetupContext } from 'vue'
import { useModelValue } from '../../utils/hooks/useModelValue'
import { COMPONENT_NAME } from '../../utils/constants/component'

interface UseDatePickerOpt {
  props: Record<string, any>
  attrs: ComputedRef<DatePickerAdapter>
  ctx: SetupContext<any>
}

export const useDatePicker = ({ props, attrs, ctx }: UseDatePickerOpt) => {
  const instance = getCurrentInstance()
  useModelValue({ props, attrs, ctx })

  function focus() {
    const datePicker = instance!.refs[COMPONENT_NAME.datePicker] as any
    datePicker && datePicker.focus()
  }

  const output = computed(() => ({ focus }))
  return { output }
}
