import { ElCommonAdapter, ValidateResult } from '../../utils/dtos'
import {
  FormGroupEvents,
  FormGroupProps,
  FormGroupSlots
} from './form-group.attrs'

export const FormGroupBindsOmitKeys: (keyof FormGroupAdapter)[] = [
  'onValidate'
]
export interface FormGroupAdapter
  extends Partial<
    FormGroupProps &
      FormGroupEvents &
      ElCommonAdapter<FormGroupAdapter, FormGroupOutput, FormGroupSlots>
  > {
  onValidate?(validateResult: ValidateResult): unknown
}

export interface FormGroupOutput {
  validate(
    cb?: (validateResult: ValidateResult) => unknown
  ): Promise<ValidateResult>
  reset(): unknown
  resetValidate(): unknown
}

export const FORM_GROUP_DEFAULT: FormGroupAdapter = {}
