import { CheckboxAdapter } from './../checkbox/checkbox.adapter'
import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import {
  CheckboxGroupEvents,
  CheckboxGroupProps,
  CheckboxGroupSlots
} from './checkbox-group.attrs'
import { CheckboxButtonAdapter } from '../checkbox-button/checkbox-button.adapter'

export type CheckboxGroupType = 'checkbox' | 'checkboxButton'
export const CheckboxGroupBindsOmitKeys: (keyof CheckboxGroupAdapter)[] = [
  'modelValue',
  'type',
  'checkboxs',
  'checkboxButtons'
]
export interface CheckboxGroupAdapter
  extends Partial<
    CheckboxGroupProps &
      CheckboxGroupEvents &
      ElFormCtrlCommonAdapter<
        CheckboxGroupAdapter,
        CheckboxGroupOutput,
        CheckboxGroupSlots
      >
  > {
  type?: CheckboxGroupType

  checkboxs?: CheckboxAdapter[]
  checkboxButtons?: CheckboxButtonAdapter[]
}

export interface CheckboxGroupOutput {}

export const CHECKBOX_GROUP_DEFAULT: CheckboxGroupAdapter = {
  type: 'checkbox'
}
