import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { TableAdapter, TableOutput } from './table.adapter'

interface RowData {
  row: Record<string, any>
  rowIndex: number
}
interface CellData extends RowData {
  column: Record<string, any>
  columnIndex: number
}

interface Sort {
  prop: string
  order?: 'ascending' | 'descending'
}

export interface TableProps {
  data: any[]
  size: 'medium' | 'small' | 'mini'
  width: string | number
  height: string | number
  maxHeight: string | number
  fit: boolean
  stripe: boolean
  border: boolean
  rowKey: string | ((row: Record<string, any>) => unknown)
  showHeader: boolean
  showSummary: boolean
  sumText: string
  summaryMethod: Function
  rowClassName: string | ((data: RowData) => unknown)
  rowStyle: object | ((data: RowData) => unknown)
  cellClassName: string | ((data: CellData) => unknown)
  cellStyle: object | ((data: CellData) => unknown)
  headerRowClassName: string | ((data: RowData) => unknown)
  headerRowStyle: object | ((data: RowData) => unknown)
  headerCellClassName: string | ((data: CellData) => unknown)
  headerCellStyle: object | ((data: CellData) => unknown)
  highlightCurrentRow: boolean
  currentRowKey: string | number
  emptyText: string
  expandRowKeys: (string | number)[]
  defaultExpandAll: boolean
  defaultSort: Sort
  tooltipEffect: 'dark' | 'light'
  spanMethod: (data: CellData) => unknown
  selectOnIndeterminate: boolean
  indent: number
  treeProps: object
  lazy: boolean
  load: (
    row: Record<string, any>,
    treeNode: Record<string, any>,
    resolve: Function
  ) => unknown
}

export interface TableEvents {
  onSelect(
    selection: Record<string, any>[],
    row: Record<string, any>,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onSelectAll(
    selection: Record<string, any>[],
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onSelectionChange(
    selection: Record<string, any>[],
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onCellMouseEnter(
    row: Record<string, any>,
    column: Record<string, any>,
    cell: HTMLTableCellElement,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onCellMouseLeave(
    row: Record<string, any>,
    column: Record<string, any>,
    cell: HTMLTableCellElement,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onCellClick(
    row: Record<string, any>,
    column: Record<string, any>,
    cell: HTMLTableCellElement,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onCellDbclick(
    row: Record<string, any>,
    column: Record<string, any>,
    cell: HTMLTableCellElement,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onRowClick(
    row: Record<string, any>,
    column: Record<string, any>,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onRowDbclick(
    row: Record<string, any>,
    column: Record<string, any>,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onRowContextmenu(
    row: Record<string, any>,
    column: Record<string, any>,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onHeaderClick(
    column: Record<string, any>,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onHeaderContextmenu(
    column: Record<string, any>,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onSortChange(
    sortData: { column: Record<string, any> } & Required<Sort>,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onFilterChange(
    filters: any[],
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onCurrentChange(
    currentRow: Record<string, any>,
    oldCurrentRow: Record<string, any>,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onHeaderDragend(
    newWidth: number,
    oldWidth: number,
    column: Record<string, any>,
    event: MouseEvent,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
  onExpandChange(
    row: Record<string, any>,
    expanded: any,
    componentData: ComponentCallbackInjectParam<TableAdapter, TableOutput>
  ): unknown
}

export type TableSlots = 'default' | 'append'
