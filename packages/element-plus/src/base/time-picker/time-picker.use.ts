import { COMPONENT_NAME } from './../../utils/constants/component';
import { TimePickerAdapter } from './time-picker.adapter'
import { computed, ComputedRef, getCurrentInstance, SetupContext } from 'vue'
import { useModelValue } from '../../utils/hooks/useModelValue'

interface UseTimePickerOpt {
  props: Record<string, any>
  attrs: ComputedRef<TimePickerAdapter>
  ctx: SetupContext<any>
}

export const useTimePicker = ({ props, attrs, ctx }: UseTimePickerOpt) => {
  const instance = getCurrentInstance()

  useModelValue({ props, attrs, ctx })

  function focus () {
    const timePicker = instance!.refs[COMPONENT_NAME.timePicker] as any
    timePicker && timePicker.focus()
  }

  const output = computed(() => ({
    focus
  }))
  return { output }
}
