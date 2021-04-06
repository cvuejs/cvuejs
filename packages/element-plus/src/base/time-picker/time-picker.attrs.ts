import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { PickerCommonProps } from './commonProps'
import { TimePickerAdapter, TimePickerOutput } from './time-picker.adapter'

export interface TimePickerProps extends PickerCommonProps {
  isRange: boolean
}

export interface TimePickerEvents {
  onBlur(
    e: FocusEvent,
    componentData: ComponentCallbackInjectParam<
      TimePickerAdapter,
      TimePickerOutput
    >
  ): unknown
  onFocus(
    e: FocusEvent,
    componentData: ComponentCallbackInjectParam<
      TimePickerAdapter,
      TimePickerOutput
    >
  ): unknown
  onChange(
    value: any,
    componentData: ComponentCallbackInjectParam<
      TimePickerAdapter,
      TimePickerOutput
    >
  ): unknown
}

export type TimePickerSlots = ''
