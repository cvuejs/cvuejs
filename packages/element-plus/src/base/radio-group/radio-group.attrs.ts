import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { ComponentSize } from '../../utils/dtos'
import { RadioGroupAdapter, RadioGroupOutput } from './radio-group.adapter'

export interface RadioGroupProps {
  modelValue: string | number | boolean
  size: ComponentSize
  fill: string
  textColor: string
  disabled: boolean
}

export interface RadioGroupEvents {
  onChange(
    value: string | number | boolean,
    componentData: ComponentCallbackInjectParam<
      RadioGroupAdapter,
      RadioGroupOutput
    >
  ): unknown
}

export type RadioGroupSlots = 'default'
