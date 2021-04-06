import { CheckboxGroupAdapter } from './checkbox-group.adapter'
import { computed, ComputedRef, SetupContext } from 'vue'
import { useModelValue } from '../../utils/hooks/useModelValue'

interface UseCheckboxGroupOpt {
  props: Record<string, any>
  attrs: ComputedRef<CheckboxGroupAdapter>
  ctx: SetupContext<any>
}

export const useCheckboxGroup = ({ props, attrs, ctx }: UseCheckboxGroupOpt) => {
  useModelValue({ props, attrs, ctx })

  const output = computed(() => ({}))
  return { output }
}
