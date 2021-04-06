import { FormAdapter } from './form.adapter'
import { computed, ComputedRef, provide } from 'vue'

interface UseFormOpt {
  attrs: ComputedRef<FormAdapter>
}

export const useForm = ({ attrs }: UseFormOpt) => {
  provide('formAttrs', attrs)

  const output = computed(() => ({}))
  return { output }
}
