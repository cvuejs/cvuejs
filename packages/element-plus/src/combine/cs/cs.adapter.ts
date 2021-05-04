import { ButtonGroupAdapter } from './../../base/button-group/button-group.adapter'
import { FormOutput } from './../../base/form/form.adapter'
import { FormAdapter } from '@cvue/element-plus/src/base/form/form.adapter'
import { ElCommonAdapter } from '../../utils/dtos'
import { CsEvents, CsProps, CsSlots } from './cs.attrs'
import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'

export const CsBindsOmitKeys: (keyof CsAdapter)[] = []
export interface CsAdapter
  extends Partial<
    CsProps & CsEvents & ElCommonAdapter<CsAdapter, CsOutput, CsSlots>
  > {
  form?: FormAdapter

  buttonGroup?: ButtonGroupAdapter
  onSearch?(
    params: Record<string, any>,
    componentData: ComponentCallbackInjectParam<CsAdapter, CsOutput>
  ): unknown
}

export interface CsOutput extends FormOutput {}

export const CS_DEFAULT: CsAdapter = {
  form: {}
}
