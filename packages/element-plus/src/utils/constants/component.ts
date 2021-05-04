import { HttpReturnType } from '@cvue/http/src/http.dto'
import { ValidateResult } from '../dtos'

export enum COMPONENT_TYPE {
  asyncData = 'asyncData',
  button = 'button',
  dialog = 'dialog',
  buttonGroup = 'buttonGroup',
  pagination = 'pagination',
  table = 'table',
  tableColumn = 'tableColumn',

  form = 'form',
  formItem = 'formItem',
  formGroup = 'formGroup',
  input = 'input',
  select = 'select',
  option = 'option',
  optionGroup = 'optionGroup',
  datePicker = 'datePicker',
  timePicker = 'timePicker',
  checkbox = 'checkbox',
  checkboxGroup = 'checkboxGroup',
  checkboxButton = 'checkboxButton',
  radio = 'radio',
  radioGroup = 'radioGroup',
  radioButton = 'radioButton',
  upload = 'upload',

  ct = 'ct',
  ce = 'ce',
  cs = 'cs'
}

export const COMPONENT_NAME: Record<COMPONENT_TYPE, string> = {
  asyncData: 'AsyncData',
  button: 'CButton',
  dialog: 'CDialog',
  buttonGroup: 'CButtonGroup',
  pagination: 'CPagination',
  table: 'CTable',
  tableColumn: 'CTableColumn',

  form: 'CForm',
  formItem: 'CFormItem',
  formGroup: 'CFormGroup',
  input: 'CInput',
  select: 'CSelect',
  option: 'COption',
  optionGroup: 'COptionGroup',
  datePicker: 'CDatePicker',
  timePicker: 'CTimePicker',
  checkbox: 'CCheckbox',
  checkboxGroup: 'CCheckboxGroup',
  checkboxButton: 'CCheckboxButton',
  radio: 'CRadio',
  radioGroup: 'CRadioGroup',
  radioButton: 'CRadioButton',
  upload: 'CUpload',

  ct: 'CT',
  ce: 'CE',
  cs: 'CS'
}

export type COMPONENT_METHODS =
  | 'button-loading'
  | 'table-update'
  | 'table-setData'
  | 'table-setParams'
  | 'pagination-setPageNo'
  | 'pagination-setPageSize'
  /** Form */
  | 'form-validate'
  | 'form-reset'
  | 'form-submit'
  | 'form-setModels'
  | 'form-initModelsAsync'
  | 'form-resetValidate'
  | 'formGroup-validate'
  | 'formGroup-reset'
  | 'formGroup-resetValidate'
  // | 'timePicker-focus'
  | 'input-blur'
  | 'input-focus'
  | 'input-select'
  | 'select-blur'
  | 'select-focus'
  | 'datePicker-focus'
  | 'upload-clearFiles'
  | 'upload-abort'
  | 'upload-submit'
  /** Search */
  // | 'search-search'
  // | 'search-reset'
  /** Tabs */
  // | 'tabs-setTab'
  /** Dialog */
  | 'dialog-open'
  | 'dialog-close'
  /** FormDialog */
  // | 'formDialog-open'
  // | 'formDialog-close'
  // | 'formDialog-reset'
  // | 'formDialog-validate'
  /** AddEditDialog */
  // | 'addEditDialog-open'
  // | 'addEditDialog-close'
  // | 'addEditDialog-reset'
  // | 'addEditDialog-validate'
  /** Tree */
  // | 'tree-getData'
  // | 'tree-getCheckedKeys'
  /** MD */
  // | 'md-open'
  // | 'md-close'
  // | 'md-submit'
  // | 'md-reset'
  // | 'md-validate'
  /** AsyncData */
  | 'asyncData-setParams'
  | 'asyncData-setExtraParams'
  | 'asyncData-send'
  | 'ct-update'
  | 'ct-setData'
  | 'ct-setParams'
  | 'ct-setPageNo'
  | 'ct-setPageSize'
  | 'ce-open'
  | 'ce-close'
  | 'ce-validate'
  | 'ce-reset'
  | 'ce-submit'
  | 'ce-setModels'
  | 'ce-initModelsAsync'
  | 'cs-reset'

export interface ComponentMethods {
  'button-loading': boolean
  'table-update': unknown
  'table-setParams':
    | Record<string, any>
    | ((params?: Record<string, any>) => Record<string, any>)
  'table-setData': any[]
  'pagination-setPageNo': number
  'pagination-setPageSize': number
  'ct-update': unknown
  'ct-setData': any[]
  'ct-setParams':
    | Record<string, any>
    | ((params?: Record<string, any>) => Record<string, any>)
  'ct-setPageNo': number
  'ct-setPageSize': number
  'ce-open': unknown
  'ce-close': unknown
  'ce-validate': ((validateResult: ValidateResult) => unknown) | undefined
  'ce-reset': unknown
  'ce-submit': ((httpReturn: HttpReturnType) => unknown) | undefined
  'ce-setModels':
    | Record<string, any>
    | ((models?: Record<string, any>) => Record<string, any>)
  'ce-initModelsAsync': ((httpReturn: HttpReturnType) => unknown) | undefined
  'cs-reset': unknown
  'dialog-open': any
  'dialog-close': any
  'asyncData-setParams':
    | Record<string, any>
    | ((params?: Record<string, any>) => Record<string, any>)
  'asyncData-setExtraParams':
    | Record<string, any>
    | ((params?: Record<string, any>) => Record<string, any>)
  'asyncData-send': unknown
  'form-validate': (validateResult: ValidateResult) => unknown
  'form-setModels':
    | Record<string, any>
    | ((models?: Record<string, any>) => Record<string, any>)
  'form-reset': unknown
  'form-resetValidate': unknown
  'form-submit': ((httpReturn: HttpReturnType) => unknown) | undefined
  'form-initModelsAsync': ((httpReturn: HttpReturnType) => unknown) | undefined
  'formGroup-validate': (validateResult: ValidateResult) => unknown
  'formGroup-reset': unknown
  'formGroup-resetValidate': unknown
  // 'timePicker-focus': unknown
  'input-blur': unknown
  'input-focus': unknown
  'input-select': unknown
  'select-blur': unknown
  'select-focus': unknown
  'datePicker-focus': unknown
  'upload-clearFiles': unknown
  'upload-abort': unknown
  'upload-submit': unknown
}

export type COMPONENT_DATAS = 'button'
