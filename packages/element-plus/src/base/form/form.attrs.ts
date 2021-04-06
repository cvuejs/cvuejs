import { ComponentSize } from '../../utils/dtos'

export interface FormProps {
  labelPosition: 'left' | 'right' | 'top'
  labelWidth: string
  labelSuffix: string
  inline: boolean
  size: ComponentSize
  disabled: boolean
  hideRequiredAsterisk: boolean
}

export interface FormEvents {}

export type FormSlots = 'default'
