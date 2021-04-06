import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import { InputEvents, InputProps, InputSlots } from './input.attrs'

export const InputBindsOmitKeys: (keyof InputAdapter)[] = ['modelValue']
export interface InputAdapter
  extends Partial<
    InputProps &
      InputEvents &
      ElFormCtrlCommonAdapter<InputAdapter, InputOutput, InputSlots>
  > {}

export interface InputOutput {
  focus(): unknown
  blur(): unknown
  select(): unknown
}

export const INPUT_DEFAULT: InputAdapter = {
  modelValue: undefined
}
