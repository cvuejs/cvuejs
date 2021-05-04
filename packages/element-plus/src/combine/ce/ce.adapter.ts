import { ButtonGroupAdapter } from './../../base/button-group/button-group.adapter'
import { FormAdapter, FormOutput } from './../../base/form/form.adapter'
import { DialogAdapter, DialogOutput } from './../../base/dialog/dialog.adapter'
import { ElCommonAdapter } from '../../utils/dtos'
import { CeEvents, CeProps, CeSlots } from './ce.attrs'
import { ButtonAdapter } from '../../base/button/button.adapter'

export const CeBindsOmitKeys: (keyof CeAdapter)[] = []
export type CeFooterButtonType = 'close' | 'submit'
export interface CeFooterButton extends ButtonAdapter {
  tag?: CeFooterButtonType
}
export interface CeFooterButtonGroup extends ButtonGroupAdapter {
  buttons?: CeFooterButton[]
}
export interface CeDialogAdapter extends DialogAdapter {
  footerButtonGroup?: CeFooterButtonGroup
}
export interface CeAdapter
  extends Partial<
    CeProps & CeEvents & ElCommonAdapter<CeAdapter, CeOutput, CeSlots>
  > {
  dialog?: CeDialogAdapter
  form?: FormAdapter
}

export interface CeOutput extends Required<DialogOutput & FormOutput> {}

export const CE_DEFAULT: CeAdapter = {
  form: {},
  dialog: {}
}
