import { OptionAdapter } from './option.adapter'
import { computed, ComputedRef } from 'vue'

interface UseOptionOpt {
  attrs: ComputedRef<OptionAdapter>
}

export const useOption = ({}: UseOptionOpt) => {
  const output = computed(() => ({}))
  return { output }
}
