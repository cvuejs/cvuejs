import { FormOutput } from './../form/form.adapter'
import { FormAdapter } from '@cvue/element-plus/src/base/form/form.adapter'
import { FormGroupAdapter, FormGroupOutput } from './form-group.adapter'
import {
  computed,
  ComputedRef,
  getCurrentInstance,
  provide,
  reactive
} from 'vue'

interface UseFormGroupOpt {
  attrs: ComputedRef<FormGroupAdapter>
}
interface FormGroupState {
  forms: { attrs: FormAdapter; output: FormOutput }[]
}

export const useFormGroup = ({ attrs }: UseFormGroupOpt) => {
  const instance = getCurrentInstance()!
  const state = reactive<FormGroupState>({
    forms: []
  })
  provide('formsInit', formsInit)

  const output = computed<FormGroupOutput>(() => ({
    reset,
    resetValidate,
    validate
  }))
  return { output }

  function formsInit(form: { attrs: FormAdapter; output: FormOutput }) {
    if (form) state.forms.push(form)
  }
  function reset() {
    state.forms.forEach((form) => form.output.reset())
  }
  function resetValidate() {
    state.forms.forEach((form) => form.output.resetValidate())
  }
  async function validate(
    cb?: (validateResult: {
      valid: boolean
      errors: Record<string, string>
    }) => unknown
  ) {
    const validateResults = await Promise.all(
      state.forms.map(async (form) => await form.output.validate())
    )
    const validateResult = {
      errors: validateResults.reduce(
        (errors, result) => _.assign(errors, result.errors),
        {}
      ),
      valid: validateResults.every((i) => i.valid)
    }
    _.isFunction(attrs.value.onValidate) &&
      attrs.value.onValidate(validateResult)
    _.isFunction(cb) && cb(validateResult)
    return validateResult
  }
}
