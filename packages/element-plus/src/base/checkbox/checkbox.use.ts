import { CheckboxAdapter } from './checkbox.adapter'
import { computed, ComputedRef, SetupContext } from 'vue'
import { useModelValue } from '../../utils/hooks/useModelValue'

interface UseCheckboxOpt {
  props: Record<string, any>
  attrs: ComputedRef<CheckboxAdapter>
  ctx: SetupContext<any>
}

export const useCheckbox = ({ props, attrs, ctx }: UseCheckboxOpt) => {
  useModelValue({ props, attrs, ctx })

  const output = computed(() => ({}))
  return { output }
}
