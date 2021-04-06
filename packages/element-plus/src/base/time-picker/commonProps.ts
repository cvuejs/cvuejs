import { ComponentSize } from '../../utils/dtos'

export interface PickerCommonProps {
  name: string | any[]
  popperClass: string
  format: string
  clearable: boolean
  clearIcon: string
  editable: boolean
  prefixIcon: string
  size: ComponentSize
  readonly: boolean
  disabled: boolean
  placeholder: string
  modelValue: string | Date | Date[]
  rangeSeparator: string
  startPlaceholder: string
  endPlaceholder: string
  defaultValue: Date | Date[]
  defaultTime: Date | Date[]
  isRange: boolean
  disabledHours(selectedHour: number): boolean
  disabledMinutes(selectedHour: number): boolean
  disabledSeconds(selectedHour: number, selectedMinute: number): boolean
  disabledDate(nowDate: Date): boolean
  cellClassName(date: Date): string
  shortcuts: { text: string; value: Date }[]
  arrowControl: boolean
  validateEvent: boolean
  unlinkPanels: boolean
}
