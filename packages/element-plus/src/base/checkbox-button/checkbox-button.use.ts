import { CheckboxButtonAdapter } from './checkbox-button.adapter'
import { computed, ComputedRef, SetupContext } from 'vue'
import { useModelValue } from '../../utils/hooks/useModelValue'

interface UseCheckboxButtonOpt {
  props: Record<string, any>
  attrs: ComputedRef<CheckboxButtonAdapter>
  ctx: SetupContext<any>
}

export const useCheckboxButton = ({ props, attrs, ctx }: UseCheckboxButtonOpt) => {
  useModelValue({ props, attrs, ctx })

  const output = computed(() => ({}))
  return { output }
}
