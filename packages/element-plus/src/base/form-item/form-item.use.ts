import { FormAdapter } from './../form/form.adapter'
import { FormItemAdapter, FormItemAlign, FormItemSlotConfig } from './form-item.adapter'
import { computed, ComputedRef, inject, reactive } from 'vue'

interface UseFormItemOpt {
  attrs: ComputedRef<FormItemAdapter>
}

export interface FormItemState {
  align: ComputedRef<FormItemAlign | undefined>
  isRequired: ComputedRef<boolean>
  slotConfig: ComputedRef<FormItemSlotConfig>
}

export const useFormItem = ({ attrs }: UseFormItemOpt) => {
  const formAttrs = inject<FormAdapter>('formAttrs', {})

  const state = reactive<FormItemState>({
    align: computed(() => attrs.value.align || formAttrs.itemAlign),
    isRequired: computed(() => {
      const rules = attrs.value.rules
      return (
        rules &&
        (_.isString(rules) ? rules.includes('required') : rules.required)
      )
    }),
    slotConfig: computed(() => {
      const slot = attrs.value.slot || {}
      return {
        name: slot.name,
        scope: slot.scope
      }
    })
  })

  const output = computed(() => ({}))
  return { output, formAttrs, state }
}
