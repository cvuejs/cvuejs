import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import { CheckboxEvents, CheckboxProps, CheckboxSlots } from './checkbox.attrs'

export const CheckboxBindsOmitKeys: (keyof CheckboxAdapter)[] = [
  'modelValue',
  'text'
]
export interface CheckboxAdapter
  extends Partial<
    CheckboxProps &
      CheckboxEvents &
      ElFormCtrlCommonAdapter<CheckboxAdapter, CheckboxOutput, CheckboxSlots>
  > {
  text?: string
}

export interface CheckboxOutput {}

export const CHECKBOX_DEFAULT: CheckboxAdapter = {
  modelValue: undefined
}
