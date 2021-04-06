import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { ComponentSize } from '../../utils/dtos'
import { RadioAdapter, RadioOutput } from './radio.adapter'

export type RadioModelValue = string | number | boolean
export interface RadioProps {
  modelValue: RadioModelValue
  label: string | number | boolean
  disabled: boolean
  name: string
  border: boolean
  size: ComponentSize
}

export interface RadioEvents {
  onChange(
    value: RadioModelValue,
    componentData: ComponentCallbackInjectParam<RadioAdapter, RadioOutput>
  ): unknown
}

export type RadioSlots = ''
