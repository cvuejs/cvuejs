import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import { CheckboxButtonEvents, CheckboxButtonProps, CheckboxButtonSlots } from './checkbox-button.attrs'

export const CheckboxButtonBindsOmitKeys: (keyof CheckboxButtonAdapter)[] = [
  'modelValue'
]
export interface CheckboxButtonAdapter
  extends Partial<
    CheckboxButtonProps &
      CheckboxButtonEvents &
      ElFormCtrlCommonAdapter<CheckboxButtonAdapter, CheckboxButtonOutput, CheckboxButtonSlots>
  > {}

export interface CheckboxButtonOutput {
}

export const CHECKBOX_BUTTON_DEFAULT: CheckboxButtonAdapter = {
}