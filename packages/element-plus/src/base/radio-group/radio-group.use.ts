import { RadioGroupAdapter } from './radio-group.adapter'
import { computed, ComputedRef, SetupContext } from 'vue'
import { useModelValue } from '../../utils/hooks/useModelValue'

interface UseRadioGroupOpt {
  props: Record<string, any>
  attrs: ComputedRef<RadioGroupAdapter>
  ctx: SetupContext<any>
}

export const useRadioGroup = ({ props, attrs, ctx }: UseRadioGroupOpt) => {
  useModelValue({ props, attrs, ctx })

  const output = computed(() => ({}))
  return { output }
}
