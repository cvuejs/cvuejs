import { ComponentSize } from '../../utils/dtos'

type IButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'
  | 'default'

type IButtonNativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type: IButtonType
  size: ComponentSize
  icon: string
  nativeType: IButtonNativeType
  loading: boolean
  disabled: boolean
  plain: boolean
  autofocus: boolean
  round: boolean
  circle: boolean
}

export interface ButtonEvents {
  onClick(e: MouseEvent): void
}
