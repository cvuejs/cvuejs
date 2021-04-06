import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { ComponentSize } from '../../utils/dtos'
import { InputAdapter, InputOutput } from './input.adapter'

export interface InputProps {
  modelValue: string | number
  type: string
  size: ComponentSize
  resize: 'none' | 'both' | 'horizontal' | 'vertical'
  autosize: boolean | { minRows?: number; maxRows?: number }
  autocomplete: 'on' | 'off'
  placeholder: string
  form: string
  disabled: boolean
  readonly: boolean
  clearable: boolean
  showPassword: boolean
  showWordLimit: boolean
  suffixIcon: string
  prefixIcon: string
  label: string
  tabindex: string
  minlength: number,
  maxlength: number
}

export interface InputEvents {
  onBlur(
    e: FocusEvent,
    componentData: ComponentCallbackInjectParam<InputAdapter, InputOutput>
  ): unknown
  onFocus(
    e: FocusEvent,
    componentData: ComponentCallbackInjectParam<InputAdapter, InputOutput>
  ): unknown
  onChange(
    value: string | number,
    componentData: ComponentCallbackInjectParam<InputAdapter, InputOutput>
  ): unknown
  onInput(
    value: string | number,
    componentData: ComponentCallbackInjectParam<InputAdapter, InputOutput>
  ): unknown
  onClear(
    componentData: ComponentCallbackInjectParam<InputAdapter, InputOutput>
  ): unknown
}

export type InputSlots = 'prepend' | 'append' | 'prefix' | 'suffix'
