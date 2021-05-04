import { ButtonGroupAdapter } from './../button-group/button-group.adapter'
import { ElCommonAdapter } from '../../utils/dtos'
import { DialogEvents, DialogProps, DialogSlots } from './dialog.attrs'
import { ButtonAdapter } from '../button/button.adapter'

export const DialogBindsOmitKeys: (keyof DialogAdapter)[] = [
  'footerButtonGroup',
  'minWidth',
  'modelValue'
]
export interface DialogButtonAdapter extends ButtonAdapter {
  tag?: 'close' | string
}
export interface DialogButtonGroupAdapter extends ButtonGroupAdapter {
  buttons?: DialogButtonAdapter[]
}
export interface DialogAdapter
  extends Partial<
    DialogProps &
      DialogEvents &
      ElCommonAdapter<DialogAdapter, DialogOutput, DialogSlots>
  > {
  minWidth?: string

  /** 底部按钮组 */
  footerButtonGroup?: DialogButtonGroupAdapter
}

export interface DialogOutput {
  open(preload?: any): void
  close(preload?: any): void
}

export const DIALOG_DEFAULT: DialogAdapter = {
  modelValue: false,
  footerButtonGroup: {
    align: 'right'
  }
}
