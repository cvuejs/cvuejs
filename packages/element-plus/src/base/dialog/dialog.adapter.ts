import { ButtonGroupAdapter } from './../button-group/button-group.adapter'
import { ElCommonAdapter } from '../../utils/dtos'
import { DialogEvents, DialogProps, DialogSlots } from './dialog.attrs'

export const DialogBindsOmitKeys: (keyof DialogAdapter)[] = [
  'footerButtonGroup',
  'modelValue'
]
export interface DialogAdapter
  extends Partial<
    DialogProps &
      DialogEvents &
      ElCommonAdapter<DialogAdapter, DialogOutput, DialogSlots>
  > {
  /** 底部按钮组 */
  footerButtonGroup?: ButtonGroupAdapter
}

export interface DialogOutput {
  open(): void
  close(): void
}

export const DIALOG_DEFAULT: DialogAdapter = {
  modelValue: false
}
