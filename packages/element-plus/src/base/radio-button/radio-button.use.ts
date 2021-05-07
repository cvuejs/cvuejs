import { RadioButtonAdapter } from './radio-button.adapter'
import { computed, ComputedRef } from 'vue'

interface UseRadioButtonOpt {
  attrs: ComputedRef<RadioButtonAdapter>
}

export const useRadioButton = ({}: UseRadioButtonOpt) => {
  const output = computed(() => ({}))
  return { output }
}
