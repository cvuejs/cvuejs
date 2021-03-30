import { ButtonAdapter, ButtonOutput } from './button.adapter'
import { ComponentSize } from '../../utils/dtos'
import { PropType } from 'vue'
import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'

type IButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'
  | 'default'

type IButtonNativeType = 'button' | 'submit' | 'reset'

export const BUTTON_PROPS = {
  type: String as PropType<IButtonType>,
  size: String as PropType<ComponentSize>,
  icon: String,
  nativeType: String as PropType<IButtonNativeType>,
  loading: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: undefined },
  plain: { type: Boolean, default: undefined },
  autofocus: { type: Boolean, default: undefined },
  round: { type: Boolean, default: undefined },
  circle: { type: Boolean, default: undefined }
}

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
  onClick(
    e: MouseEvent,
    componentData: ComponentCallbackInjectParam<ButtonAdapter, ButtonOutput>
  ): unknown
}

export type ButtonSlots = 'default'
