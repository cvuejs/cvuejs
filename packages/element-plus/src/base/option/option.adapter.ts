import { ElCommonAdapter } from '../../utils/dtos'
import { OptionEvents, OptionProps, OptionSlots } from './option.attrs'

export const OptionBindsOmitKeys: (keyof OptionAdapter)[] = []
export interface OptionAdapter
  extends Partial<
    OptionProps &
      OptionEvents &
      ElCommonAdapter<OptionAdapter, OptionOutput, OptionSlots>
  > {}

export interface OptionOutput {
}

export const OPTION_DEFAULT: OptionAdapter = {
}