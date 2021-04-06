import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import { RadioEvents, RadioProps, RadioSlots } from './radio.attrs'

export const RadioBindsOmitKeys: (keyof RadioAdapter)[] = ['modelValue', 'text']
export interface RadioAdapter
  extends Partial<
    RadioProps &
      RadioEvents &
      ElFormCtrlCommonAdapter<RadioAdapter, RadioOutput, RadioSlots>
  > {
  text?: string
}

export interface RadioOutput {}

export const RADIO_DEFAULT: RadioAdapter = {}
