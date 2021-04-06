import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { ComponentSize } from '../../utils/dtos'
import { SelectAdapter, SelectOutput } from './select.adapter'

export interface SelectProps {
  name: string
  id: string
  modelValue: any[] | string | number | boolean | object
  autocomplete: string
  automaticDropdown: boolean
  size: ComponentSize
  disabled: boolean
  clearable: boolean
  filterable: boolean
  allowCreate: boolean
  loading: boolean
  popperClass: string
  remote: boolean
  loadingText: string
  noMatchText: string
  noDataText: string
  remoteMethod(query: string | number): unknown
  filterMethod(query: string | number): unknown
  multiple: boolean
  multipleLimit: number
  placeholder: string
  defaultFirstOption: boolean
  reserveKeyword: boolean
  valueKey: string
  collapseTags: boolean
  popperAppendToBody: boolean
  clearIcon: string
}

export interface SelectEvents {
  onBlur(
    e: FocusEvent,
    componentData: ComponentCallbackInjectParam<SelectAdapter, SelectOutput>
  ): unknown
  onFocus(
    e: FocusEvent,
    componentData: ComponentCallbackInjectParam<SelectAdapter, SelectOutput>
  ): unknown
  onChange(
    value: string | number,
    componentData: ComponentCallbackInjectParam<SelectAdapter, SelectOutput>
  ): unknown
  onRemoveTag(
    removeTagValue: string | number,
    componentData: ComponentCallbackInjectParam<SelectAdapter, SelectOutput>
  ): unknown
  onVisibleChange(
    visible: boolean,
    componentData: ComponentCallbackInjectParam<SelectAdapter, SelectOutput>
  ): unknown
  onClear(
    componentData: ComponentCallbackInjectParam<SelectAdapter, SelectOutput>
  ): unknown
}

export type SelectSlots = 'default' | 'prefix' | 'empty'
