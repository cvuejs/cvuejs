import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { ComponentSize } from '../../utils/dtos'
import { CheckboxAdapter, CheckboxOutput } from './checkbox.adapter'

export interface CheckboxProps {
  modelValue: boolean | number | string
  label: boolean | number | string
  indeterminate: boolean
  disabled: boolean
  checked: boolean
  name: string
  trueLabel: string | number
  falseLabel: string | number
  id: string
  controls: string
  border: boolean
  size: ComponentSize
}

export interface CheckboxEvents {
  onChange(
    value: boolean | number | string,
    componentData: ComponentCallbackInjectParam<CheckboxAdapter, CheckboxOutput>
  ): unknown
}

export type CheckboxSlots = ''
