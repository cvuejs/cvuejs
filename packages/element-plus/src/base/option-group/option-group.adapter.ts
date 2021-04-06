import { OptionAdapter } from './../option/option.adapter'
import { ElCommonAdapter } from '../../utils/dtos'
import {
  OptionGroupEvents,
  OptionGroupProps,
  OptionGroupSlots
} from './option-group.attrs'

export const OptionGroupBindsOmitKeys: (keyof OptionGroupAdapter)[] = [
  'options'
]
export interface OptionGroupAdapter
  extends Partial<
    OptionGroupProps &
      OptionGroupEvents &
      ElCommonAdapter<OptionGroupAdapter, OptionGroupOutput, OptionGroupSlots>
  > {
  options?: OptionAdapter[]
}

export interface OptionGroupOutput {}

export const OPTION_GROUP_DEFAULT: OptionGroupAdapter = {}
