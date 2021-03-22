import { PropType } from 'vue'
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
  onClick(): void
}

export const originalProps = {
  type: {
    type: String as PropType<IButtonType>
  },
  size: {
    type: String as PropType<ComponentSize>
  },
  icon: {
    type: String
  },
  nativeType: {
    type: String as PropType<IButtonNativeType>
  },
  loading: Boolean,
  disabled: Boolean,
  plain: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean
}
