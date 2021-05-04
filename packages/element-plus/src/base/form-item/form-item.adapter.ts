import { UploadAdapter } from './../upload/upload.adapter'
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
  | 'upload'
  | 'div'
  | 'slot'
export const FormItemBindsOmitKeys: (keyof FormItemAdapter)[] = [
  'visible',
  'width',
  'type',
  'prop',
  'rules',
  'tip',
  'className',
  'formControlClassName',

  'input',
  'select',
  'datePicker',
  'timePicker',
  'checkbox',
  'checkboxGroup',
  'radio',
  'radioGroup',
  'upload',
  'slot'
]
export interface FormItemSlotConfig {
  name?: string
  scope?: Record<string, any>
}
export type FormItemAlign = 'left' | 'center' | 'right'
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

  rules?: string | Record<string, any>

  /** formItem的类型 */
  type?: FormItemType

  /** 表单控件对应的models中的key的名称 */
  prop?: string

  tip?: string

  validateFieldName?: string

  className?: string

  formControlClassName?: string

  input?: InputAdapter
  select?: SelectAdapter
  datePicker?: DatePickerAdapter
  timePicker?: TimePickerAdapter
  checkbox?: CheckboxAdapter
  checkboxGroup?: CheckboxGroupAdapter
  radio?: RadioAdapter
  radioGroup?: RadioGroupAdapter
  upload?: UploadAdapter
  slot?: FormItemSlotConfig
}

export interface FormItemOutput {}

export const FORM_ITEM_DEFAULT: FormItemAdapter = {
  type: 'input',
  slot: {
    name: 'formItemSlot'
  }
}
