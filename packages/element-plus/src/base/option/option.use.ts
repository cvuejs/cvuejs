import { OptionAdapter } from './option.adapter'
import { computed, ComputedRef } from 'vue'

interface UseOptionOpt {
  attrs: ComputedRef<OptionAdapter>
}

export const useOption = ({ attrs }: UseOptionOpt) => {

  const output = computed(() => ({}))
  return { output }
}
