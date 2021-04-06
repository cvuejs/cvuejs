import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import {
  CheckboxButtonAdapter,
  CheckboxButtonOutput
} from './checkbox-button.adapter'

export interface CheckboxButtonProps {
  modelValue: string | number | boolean
  label: string | number | boolean
  indeterminate: boolean
  disabled: boolean
  checked: boolean
  name: string
  trueLabel: string | number
  falseLabel: string | number
}

export interface CheckboxButtonEvents {
  onChange(
    value: string | number | boolean,
    componentData: ComponentCallbackInjectParam<
      CheckboxButtonAdapter,
      CheckboxButtonOutput
    >
  ): unknown
}

export type CheckboxButtonSlots = ''
