import { FormAdapter } from './../form/form.adapter'
import { FormItemAdapter } from './form-item.adapter'
import { computed, ComputedRef, inject } from 'vue'

interface UseFormItemOpt {
  attrs: ComputedRef<FormItemAdapter>
}

export interface FormItemState {
  fieldName: string
}

export const useFormItem = ({ attrs }: UseFormItemOpt) => {
  const formAttrs = inject<FormAdapter>('formAttrs', {})

  const align = computed(() => attrs.value.align || formAttrs.itemAlign)

  const output = computed(() => ({}))
  return { output, formAttrs, align }
}
