import { AsyncDataAdapter } from './../../utils/hooks/useAsyncData'
import { ElCommonAdapter, ValidateResult } from '../../utils/dtos'
import { FormItemAdapter, FormItemAlign } from '../form-item/form-item.adapter'
import { FormEvents, FormProps, FormSlots } from './form.attrs'
import { HttpReturnType } from '@cvue/http/src/http.dto'
import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'

export const FormBindsOmitKeys: (keyof FormAdapter)[] = [
  'itemWidth',
  'itemAlign',
  'formItems',
  'models',
  'max'
]
export interface FormAdapter
  extends Partial<
    FormProps & FormEvents & ElCommonAdapter<FormAdapter, FormOutput, FormSlots>
  > {
  itemWidth?: string
  itemAlign?: FormItemAlign
  formItems?: FormItemAdapter[]
  models?: Record<string, any>

  /** 最多显示多少个formItem */
  max?: number

  onValidate?(validateResult: ValidateResult): unknown

  submit?: AsyncDataAdapter

  asyncModels?: AsyncDataAdapter<Record<string, any>>

  onModelsChange?(
    models: Record<string, any>,
    prevModels: Record<string, any>,
    componentData: ComponentCallbackInjectParam<FormAdapter, FormOutput>
  ): unknown
}

export interface FormOutput {
  validate(
    cb?: (validateResult: ValidateResult) => unknown
  ): Promise<ValidateResult>
  reset(): unknown
  resetValidate(): unknown
  setModels(
    models:
      | Record<string, any>
      | ((models?: Record<string, any>) => Record<string, any>)
  ): unknown
  submit(cb?: (httpReturn: HttpReturnType) => unknown): Promise<HttpReturnType>
  initModelsAsync(
    cb?: (httpReturn: HttpReturnType) => unknown
  ): Promise<HttpReturnType>
}

export const FORM_DEFAULT: FormAdapter = {
  models: {},
  submit: {
    immediate: false,
    mode: 'always'
  }
}
