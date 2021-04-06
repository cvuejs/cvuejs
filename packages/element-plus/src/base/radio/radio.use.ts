import { RadioAdapter } from './radio.adapter'
import { computed, ComputedRef, SetupContext } from 'vue'
import { useModelValue } from '../../utils/hooks/useModelValue'

interface UseRadioOpt {
  props: Record<string, any>
  attrs: ComputedRef<RadioAdapter>
  ctx: SetupContext<any>
}

export const useRadio = ({ props, attrs, ctx }: UseRadioOpt) => {
  useModelValue({ props, attrs, ctx })

  const output = computed(() => ({}))
  return { output }
}
