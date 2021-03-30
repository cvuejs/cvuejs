type TableColumnType = 'default' | 'selection' | 'index' | 'expand'
type TableColumnExtendType = 'buttonGroup' | 'nested'

export interface TableColumnProps {
  type: TableColumnType | TableColumnExtendType
  label: string
  className: string
  labelClassName: string
  property: string
  prop: string
  width: object | number | string
  minWidth: object | number | string
  renderHeader(data: { column: object; $index: number }): unknown
  sortable: boolean | 'custom'
  sortMethod(a: any, b: any): unknown
  sortBy: string | string[] | ((row: object, index: number) => unknown)
  resizable: boolean
  columnKey: string
  align: 'left' | 'center' | 'right'
  headerAlign: 'left' | 'center' | 'right'
  showTooltipWhenOverflow: boolean
  showOverflowTooltip: boolean
  fixed: boolean | 'left' | 'right'
  formatter(row: object, column: object, cellValue: any, index: number): unknown
  selectable: Function
  reserveSelection: boolean
  filterMethod(value: any, row: object, column: object): unknown
  filteredValue: any[]
  filters: { text: string; value: any }[]
  filterPlacement: string
  filterMultiple: boolean
  index: number | ((index: number) => number)
  sortOrders: ('ascending' | 'descending' | null)[]
}

export interface TableColumnEvents {}

export type TableColumnSlots = 'default' | 'header'
