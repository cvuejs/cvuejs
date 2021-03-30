import { ElCommonAdapter } from '../../utils/dtos'
import { ButtonEvents, ButtonProps, ButtonSlots } from './button.attrs'

export const ButtonOmitBindsKeys: (keyof ButtonAdapter)[] = ['text', 'visable']
export interface ButtonAdapter
  extends Partial<
    ButtonProps &
      ButtonEvents &
      ElCommonAdapter<ButtonAdapter, ButtonOutput, ButtonSlots>
  > {
  /** 按钮文字 */
  text?: string

  /** 是否展示 */
  visable?: boolean
}

export interface ButtonOutput {
  loading(boo?: boolean): void
}

export const BUTTON_DEFAULT: ButtonAdapter = {
  visable: true
}
