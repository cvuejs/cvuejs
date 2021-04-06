import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { ComponentSize } from '../../utils/dtos'
import {
  CheckboxGroupAdapter,
  CheckboxGroupOutput
} from './checkbox-group.adapter'

export interface CheckboxGroupProps {
  modelValue: object | boolean | any[]
  disabled: boolean
  min: number
  max: number
  size: ComponentSize
  fill: string
  textColor: string
}

export interface CheckboxGroupEvents {
  onChange(
    value: object | boolean | any[],
    componentData: ComponentCallbackInjectParam<
      CheckboxGroupAdapter,
      CheckboxGroupOutput
    >
  ): unknown
}

export type CheckboxGroupSlots = 'default'
