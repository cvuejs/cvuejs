import { ElCommonAdapter } from '../../utils/dtos'
import { RadioButtonEvents, RadioButtonProps, RadioButtonSlots } from './radio-button.attrs'

export const RadioButtonBindsOmitKeys: (keyof RadioButtonAdapter)[] = []
export interface RadioButtonAdapter
  extends Partial<
    RadioButtonProps &
      RadioButtonEvents &
      ElCommonAdapter<RadioButtonAdapter, RadioButtonOutput, RadioButtonSlots>
  > {}

export interface RadioButtonOutput {
}

export const RADIO_BUTTON_DEFAULT: RadioButtonAdapter = {
}