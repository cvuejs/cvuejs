import { ComponentSize } from '../../utils/dtos'

export interface FormItemProps {
  label: string
  labelWidth: string
  size: ComponentSize
}

export interface FormItemEvents {}

export type FormItemSlots = 'default' | 'label'
