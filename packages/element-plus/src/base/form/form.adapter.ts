import { ElCommonAdapter } from '../../utils/dtos'
import { FormItemAdapter, FormItemAlign } from '../form-item/form-item.adapter'
import { FormEvents, FormProps, FormSlots } from './form.attrs'

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
}

export interface FormOutput {}

export const FORM_DEFAULT: FormAdapter = {
  models: {}
}
