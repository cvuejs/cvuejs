import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import { RadioButtonAdapter } from '../radio-button/radio-button.adapter'
import { RadioAdapter } from '../radio/radio.adapter'
import {
  RadioGroupEvents,
  RadioGroupProps,
  RadioGroupSlots
} from './radio-group.attrs'

export type RadioGroupType = 'radio' | 'radioButton'
export const RadioGroupBindsOmitKeys: (keyof RadioGroupAdapter)[] = [
  'modelValue',
  'type',
  'radios',
  'radioButtons'
]
export interface RadioGroupAdapter
  extends Partial<
    RadioGroupProps &
      RadioGroupEvents &
      ElFormCtrlCommonAdapter<
        RadioGroupAdapter,
        RadioGroupOutput,
        RadioGroupSlots
      >
  > {
  type?: RadioGroupType

  radios?: RadioAdapter[]
  radioButtons?: RadioButtonAdapter[]
}

export interface RadioGroupOutput {}

export const RADIO_GROUP_DEFAULT: RadioGroupAdapter = {
  type: 'radio'
}
