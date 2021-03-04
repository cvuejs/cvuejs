import { PropType } from 'vue'
import { ComponentSize } from '../../utils/dtos'
import { isValidComponentSize } from '../../utils/validators'

type IButtonType = PropType<
  'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'
>
type IButtonNativeType = PropType<'button' | 'submit' | 'reset'>

export interface ButtonProps {
  type: IButtonType
  size: PropType<ComponentSize>
  icon: string
  nativeType: IButtonNativeType
  loading: boolean
  disabled: boolean
  plain: boolean
  autofocus: boolean
  round: boolean
  circle: boolean
}

export const originalProps = {
  type: {
    type: String as IButtonType,
    default: 'default',
    validator: (val: string) => {
      return [
        'default',
        'primary',
        'success',
        'warning',
        'info',
        'danger',
        'text'
      ].includes(val)
    }
  },
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize
  },
  icon: {
    type: String,
    default: ''
  },
  nativeType: {
    type: String as IButtonNativeType,
    default: 'button',
    validator: (val: string) => {
      return ['button', 'submit', 'reset'].includes(val)
    }
  },
  loading: Boolean,
  disabled: Boolean,
  plain: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean
}
