import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { PickerCommonProps } from '../time-picker/commonProps'
import { DatePickerAdapter, DatePickerOutput } from './date-picker.adapter'

export type DatePickerType =
  | 'year'
  | 'month'
  | 'date'
  | 'week'
  | 'datetime'
  | 'datetimerange'
  | 'daterange'

export interface DatePickerProps extends PickerCommonProps {
  type: DatePickerType
}

export interface DatePickerEvents {
  onBlur(
    e: FocusEvent,
    componentData: ComponentCallbackInjectParam<
      DatePickerAdapter,
      DatePickerOutput
    >
  ): unknown
  onFocus(
    e: FocusEvent,
    componentData: ComponentCallbackInjectParam<
      DatePickerAdapter,
      DatePickerOutput
    >
  ): unknown
  onChange(
    value: any,
    componentData: ComponentCallbackInjectParam<
      DatePickerAdapter,
      DatePickerOutput
    >
  ): unknown
}

export type DatePickerSlots = 'range-separator'
