import { HttpReturnType } from './../../../../http/src/http.dto'
import { FormAdapter, FormOutput } from './form.adapter'
import {
  computed,
  ComputedRef,
  getCurrentInstance,
  inject,
  provide,
  reactive,
  watch,
  watchEffect
} from 'vue'
import { ValidateResult } from '../../utils/dtos'
import { useAsyncData } from '../../utils/hooks/useAsyncData'
import {
  ASYNC_DATA_API_INVALID,
  FORM_VALIDATE_FAIL_ERROR
} from '../../utils/constants/errors'

interface UseFormOpt {
  attrs: ComputedRef<FormAdapter>
}

export interface FormState {
  originalModels: Record<string, any>
  prevModels: Record<string, any>
  loading: boolean
}

export const useForm = ({ attrs }: UseFormOpt) => {
  const instance = getCurrentInstance()!
  provide('formAttrs', attrs)
  const formsInit = inject('formsInit', () => {})
  const state = reactive<FormState>({
    loading: false,
    prevModels: {},
    originalModels: _.cloneDeep(attrs.value.models || {})
  })

  const submitAsync = useAsyncData(attrs.value.submit)
  const modelsAsync = useAsyncData(attrs.value.asyncModels)
  const output = computed<FormOutput>(() => ({
    reset,
    setModels,
    resetValidate,
    validate,
    submit,
    initModelsAsync
  }))

  watch(
    () => modelsAsync.data.value,
    (v) => {
      if (attrs.value.asyncModels) {
        if (v) _.assign(attrs.value.models, v)
        state.loading = !!attrs.value.asyncModels.loading
      }
    }
  )

  watch(
    attrs.value.models!,
    (v) => {
      _.isFunction(attrs.value.onModelsChange) &&
        attrs.value.onModelsChange(v, state.prevModels, {
          attrs: attrs.value,
          output: output.value,
          instance
        })
      state.prevModels = _.cloneDeep(v)
    },
    { immediate: true, deep: true }
  )
  _.isFunction(formsInit) && formsInit({ attrs, output })
  return { output, state }

  async function submit(
    cb: (res: HttpReturnType) => unknown
  ): Promise<HttpReturnType> {
    const { valid } = await validate()
    if (!valid) {
      const res = { e: true, error: new Error(FORM_VALIDATE_FAIL_ERROR) }
      cb(res)
      return res
    }
    if (attrs.value.submit && _.isFunction(attrs.value.submit.api)) {
      submitAsync.setParams(attrs.value.models || {})
      const res = await submitAsync.sendAlways()
      cb(res)
      return res
    } else {
      const res = { e: true, error: new Error(ASYNC_DATA_API_INVALID) }
      cb(res)
      return res
    }
  }

  async function initModelsAsync(
    cb: (res: HttpReturnType) => unknown
  ): Promise<HttpReturnType> {
    if (attrs.value.asyncModels && _.isFunction(attrs.value.asyncModels.api)) {
      const res = await modelsAsync.sendAlways()
      cb(res)
      return res
    } else {
      const res = { e: true, error: new Error(ASYNC_DATA_API_INVALID) }
      cb(res)
      return res
    }
  }

  function setModels(
    models:
      | Record<string, any>
      | ((oldModels?: Record<string, any>) => Record<string, any>)
  ) {
    if (_.isFunction(models)) {
      attrs.value.models = reactive(models(attrs.value.models))
    } else {
      attrs.value.models = models
    }
  }

  function reset() {
    _.assign(attrs.value.models, state.originalModels)
    Object.keys(
      _.omit(attrs.value.models, Object.keys(state.originalModels))
    ).forEach(
      (key) =>
        attrs.value.models && Reflect.deleteProperty(attrs.value.models, key)
    )
    resetValidate()
  }

  function resetValidate() {
    const validationRef = instance.refs.validationForm as any
    validationRef.resetForm()
  }

  async function validate(cb?: (validateResult: ValidateResult) => unknown) {
    const validationRef = instance.refs.validationForm as any
    const validateResult = await validationRef.validate()
    _.isFunction(attrs.value.onValidate) &&
      attrs.value.onValidate(validateResult)
    _.isFunction(cb) && cb(validateResult)
    return validateResult
  }
}
