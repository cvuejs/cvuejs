import { OptionGroupAdapter } from './../option-group/option-group.adapter'
import { OptionAdapter } from './../option/option.adapter'
import { AsyncDataAdapter } from './../../utils/hooks/useAsyncData'
import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import { SelectEvents, SelectProps, SelectSlots } from './select.attrs'

export type SelectType = 'option' | 'optionGroup'
export type SelectAsyneDataApiHook = 'visibleTrue' | 'modelValueFirstChange'
export interface SelectAsyncDataAdapter<T> extends AsyncDataAdapter<T> {
  apiHook?: SelectAsyneDataApiHook | SelectAsyneDataApiHook[]
}
export const SelectBindsOmitKeys: (keyof SelectAdapter)[] = [
  'options',
  'optionGroups',
  'asyncOptions',
  'type',
  'modelValue'
]
export interface SelectAdapter
  extends Partial<
    SelectProps &
      SelectEvents &
      ElFormCtrlCommonAdapter<SelectAdapter, SelectOutput, SelectSlots>
  > {
  options?: OptionAdapter[]
  optionGroups?: OptionGroupAdapter[]

  asyncOptions?: SelectAsyncDataAdapter<(OptionAdapter | OptionGroupAdapter)[]>

  type?: SelectType
}

export interface SelectOutput {
  focus(): unknown
  blur(): unknown
}

export const SELECT_DEFAULT: SelectAdapter = {
  modelValue: '',
  type: 'option',
  asyncOptions: {
    apiHook: ['modelValueFirstChange', 'visibleTrue']
  }
}
