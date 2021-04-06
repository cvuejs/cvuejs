import { OptionGroupAdapter } from './option-group.adapter'
import { computed, ComputedRef } from 'vue'

interface UseOptionGroupOpt {
  attrs: ComputedRef<OptionGroupAdapter>
}

export const useOptionGroup = ({ attrs }: UseOptionGroupOpt) => {

  const output = computed(() => ({}))
  return { output }
}
