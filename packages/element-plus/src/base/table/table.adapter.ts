import { TableColumnAdapter } from './../table-column/table-column.adapter'
import { ElCommonAdapter } from '../../utils/dtos'
import { TableEvents, TableProps, TableSlots } from './table.attrs'

export const TableBindsOmitKeys: (keyof TableAdapter)[] = []
export interface TableAdapter
  extends Partial<
    TableProps &
      TableEvents &
      ElCommonAdapter<TableAdapter, TableOutput, TableSlots>
  > {
  columns?: TableColumnAdapter[]
}

export interface TableOutput {}

export const TABLE_DEFAULT: TableAdapter = {}
