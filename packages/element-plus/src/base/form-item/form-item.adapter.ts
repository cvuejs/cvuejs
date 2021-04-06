import { CheckboxGroupAdapter } from './../checkbox-group/checkbox-group.adapter'
import { CheckboxAdapter } from './../checkbox/checkbox.adapter'
import { TimePickerAdapter } from './../time-picker/time-picker.adapter'
import { DatePickerAdapter } from './../date-picker/date-picker.adapter'
import { ElCommonAdapter } from '../../utils/dtos'
import { InputAdapter } from '../input/input.adapter'
import { SelectAdapter } from '../select/select.adapter'
import { FormItemEvents, FormItemProps, FormItemSlots } from './form-item.attrs'
import { RadioGroupAdapter } from '../radio-group/radio-group.adapter'
import { RadioAdapter } from '../radio/radio.adapter'

export type FormItemType =
  | 'empty'
  | 'input'
  | 'select'
  | 'date-picker'
  | 'time-picker'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio'
  | 'radio-group'
export const FormItemBindsOmitKeys: (keyof FormItemAdapter)[] = [
  'visible',
  'width',
  'type',
  'prop',
  'rules',
  'formControlClassName',

  'inputConfig',
  'selectConfig',
  'datePickerConfig',
  'timePickerConfig',
  'checkboxConfig',
  'checkboxGroupConfig',
  'radioConfig',
  'radioGroupConfig'
]
export type FormItemAlign = 'left' | 'mid' | 'right'
export interface FormItemAdapter
  extends Partial<
    FormItemProps &
      FormItemEvents &
      ElCommonAdapter<FormItemAdapter, FormItemOutput, FormItemSlots>
  > {
  /** 是否渲染 */
  visible?: boolean

  align?: FormItemAlign

  /** form-item的宽度 */
  width?: string

  rules?: string

  /** formItem的类型 */
  type?: FormItemType

  /** 表单控件对应的models中的key的名称 */
  prop?: string

  formControlClassName?: string

  inputConfig?: InputAdapter
  selectConfig?: SelectAdapter
  datePickerConfig?: DatePickerAdapter
  timePickerConfig?: TimePickerAdapter
  checkboxConfig?: CheckboxAdapter
  checkboxGroupConfig?: CheckboxGroupAdapter
  radioConfig?: RadioAdapter
  radioGroupConfig?: RadioGroupAdapter
}

export interface FormItemOutput {}

export const FORM_ITEM_DEFAULT: FormItemAdapter = {
  type: 'input'
}
