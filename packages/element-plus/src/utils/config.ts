import { UploadAdapter } from './../base/upload/upload.adapter';
import { CeAdapter } from './../combine/ce/ce.adapter'
import { TimePickerAdapter } from './../base/time-picker/time-picker.adapter'
import { CheckboxAdapter } from './../base/checkbox/checkbox.adapter'
import { OptionAdapter } from './../base/option/option.adapter'
import { OptionGroupAdapter } from './../base/option-group/option-group.adapter'
import { DatePickerAdapter } from './../base/date-picker/date-picker.adapter'
import { SelectAdapter } from './../base/select/select.adapter'
import { InputAdapter } from './../base/input/input.adapter'
import { FormItemAdapter } from './../base/form-item/form-item.adapter'
import { FormAdapter } from './../base/form/form.adapter'
import { TableAdapter } from './../base/table/table.adapter'
import { PaginationAdapter } from './../base/pagination/pagination.adapter'
import { COMPONENT_TYPE } from './constants/component'
import { ButtonAdapter } from '../base/button/button.adapter'
import _ from 'lodash'
import { DialogAdapter } from '../base/dialog/dialog.adapter'
import { ButtonGroupAdapter } from '../base/button-group/button-group.adapter'
import { TableColumnAdapter } from '../base/table-column/table-column.adapter'
import { AsyncDataAdapter } from './hooks/useAsyncData'
import { CtAdapter } from '../combine/ct/ct.adapter'
import { CheckboxButtonAdapter } from '../base/checkbox-button/checkbox-button.adapter'
import { CheckboxGroupAdapter } from '../base/checkbox-group/checkbox-group.adapter'
import { RadioButtonAdapter } from '../base/radio-button/radio-button.adapter'
import { RadioGroupAdapter } from '../base/radio-group/radio-group.adapter'
import { RadioAdapter } from '../base/radio/radio.adapter'
import { FormGroupAdapter } from '../base/form-group/form-group.adapter'
import { CsAdapter } from '../combine/cs/cs.adapter'

export interface CvueOptions {
  /** base */
  [COMPONENT_TYPE.asyncData]?: AsyncDataAdapter
  [COMPONENT_TYPE.button]?: ButtonAdapter
  [COMPONENT_TYPE.dialog]?: DialogAdapter
  [COMPONENT_TYPE.buttonGroup]?: ButtonGroupAdapter
  [COMPONENT_TYPE.pagination]?: PaginationAdapter
  [COMPONENT_TYPE.table]?: TableAdapter
  [COMPONENT_TYPE.tableColumn]?: TableColumnAdapter
  /** form */
  [COMPONENT_TYPE.form]?: FormAdapter
  [COMPONENT_TYPE.formItem]?: FormItemAdapter
  [COMPONENT_TYPE.formGroup]?: FormGroupAdapter
  [COMPONENT_TYPE.input]?: InputAdapter
  [COMPONENT_TYPE.select]?: SelectAdapter
  [COMPONENT_TYPE.option]?: OptionAdapter
  [COMPONENT_TYPE.optionGroup]?: OptionGroupAdapter
  [COMPONENT_TYPE.datePicker]?: DatePickerAdapter
  [COMPONENT_TYPE.timePicker]?: TimePickerAdapter
  [COMPONENT_TYPE.checkbox]?: CheckboxAdapter
  [COMPONENT_TYPE.checkboxGroup]?: CheckboxGroupAdapter
  [COMPONENT_TYPE.checkboxButton]?: CheckboxButtonAdapter
  [COMPONENT_TYPE.radio]?: RadioAdapter
  [COMPONENT_TYPE.radioGroup]?: RadioGroupAdapter
  [COMPONENT_TYPE.radioButton]?: RadioButtonAdapter
  [COMPONENT_TYPE.upload]?: UploadAdapter
  /** combine */
  [COMPONENT_TYPE.ct]?: Partial<CtAdapter>
  [COMPONENT_TYPE.ce]?: Partial<CeAdapter>
  [COMPONENT_TYPE.cs]?: Partial<CsAdapter>
}

const $CVUE = {} as CvueOptions

const setConfig = (option: CvueOptions) => {
  _.assign($CVUE, option)
}

const setComponentConfig = <T extends keyof CvueOptions>(
  key: T,
  option: CvueOptions[T]
): void => {
  $CVUE[key] = option
}

const getConfig = <T extends keyof CvueOptions>(key: T): CvueOptions[T] => {
  return $CVUE[key]
}

export { getConfig, setConfig, setComponentConfig }
