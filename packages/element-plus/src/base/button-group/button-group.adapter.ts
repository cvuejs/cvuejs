import { ElCommonAdapter } from '../../utils/dtos'
import { ButtonAdapter } from '../button/button.adapter'
import {
  ButtonGroupEvents,
  ButtonGroupProps,
  ButtonGroupSlots
} from './button-group.attrs'

export const ButtonGroupBindsOmitKeys: (keyof ButtonGroupAdapter)[] = [
  'buttons',
  'isGroup'
]
export interface ButtonGroupAdapter
  extends Partial<
    ButtonGroupProps &
      ButtonGroupEvents &
      ElCommonAdapter<ButtonGroupAdapter, ButtonGroupOutput, ButtonGroupSlots>
  > {
  /** 按钮组 */
  buttons?: ButtonAdapter[]

  /** 按钮间是否有间隙，值true时无间隙 */
  isGroup?: boolean
}

export interface ButtonGroupOutput {}

export const BUTTON_GROUP_DEFAULT: ButtonGroupAdapter = {
  isGroup: false
}
