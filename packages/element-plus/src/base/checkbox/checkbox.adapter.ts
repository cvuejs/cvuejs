import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import { CheckboxEvents, CheckboxProps, CheckboxSlots } from './checkbox.attrs'

export const CheckboxBindsOmitKeys: (keyof CheckboxAdapter)[] = [
  'modelValue'
]
export interface CheckboxAdapter
  extends Partial<
    CheckboxProps &
      CheckboxEvents &
      ElFormCtrlCommonAdapter<CheckboxAdapter, CheckboxOutput, CheckboxSlots>
  > {}

export interface CheckboxOutput {
}

export const CHECKBOX_DEFAULT: CheckboxAdapter = {
}