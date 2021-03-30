interface RowData {
  row: object
  rowIndex: number
}
interface CellData extends RowData {
  column: object
  columnIndex: number
}

export interface TableProps {
  data: any[]
  size: string
  width: string | number
  height: string | number
  maxHeight: string | number
  fit: boolean
  stripe: boolean
  border: boolean
  rowKey: string | ((row: object) => unknown)
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
  defaultSort: { prop: string, order?: 'ascending' | 'descending' }
  tooltipEffect: 'dark' | 'light'
  spanMethod: ((data: CellData) => unknown)
  selectOnIndeterminate: boolean
  indent: number
  treeProps: object
  lazy: boolean
  load: (row: object, treeNode: object, resolve: Function) => unknown
}

export interface TableEvents {
  onSelect(selection: any[], row: object): unknown
}

export type TableSlots = 'default'
