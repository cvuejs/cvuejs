import { ElCommonAdapter } from '../../utils/dtos'
import {
  DatePickerEvents,
  DatePickerProps,
  DatePickerSlots
} from './date-picker.attrs'

export const DatePickerBindsOmitKeys: (keyof DatePickerAdapter)[] = [
  'modelValue'
]
export interface DatePickerAdapter
  extends Partial<
    DatePickerProps &
      DatePickerEvents &
      ElCommonAdapter<DatePickerAdapter, DatePickerOutput, DatePickerSlots>
  > {}

export interface DatePickerOutput {
  focus(): unknown
}

export const DATE_PICKER_DEFAULT: DatePickerAdapter = {}
