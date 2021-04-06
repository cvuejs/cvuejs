import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import {
  TimePickerEvents,
  TimePickerProps,
  TimePickerSlots
} from './time-picker.attrs'

export const TimePickerBindsOmitKeys: (keyof TimePickerAdapter)[] = [
  'modelValue'
]
export interface TimePickerAdapter
  extends Partial<
    TimePickerProps &
      TimePickerEvents &
      ElFormCtrlCommonAdapter<
        TimePickerAdapter,
        TimePickerOutput,
        TimePickerSlots
      >
  > {}

export interface TimePickerOutput {
  focus(): unknown
}

export const TIME_PICKER_DEFAULT: TimePickerAdapter = {}
