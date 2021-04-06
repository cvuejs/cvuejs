import { TableColumnAdapter } from './../table-column/table-column.adapter'
import { ElCommonAdapter, VLoading } from '../../utils/dtos'
import { TableEvents, TableProps, TableSlots } from './table.attrs'
import { AsyncDataAdapter } from '../../utils/hooks/useAsyncData'

export const TableBindsOmitKeys: (keyof TableAdapter)[] = [
  'asyncData',
  'loadingSetting',
  'columns'
]
export interface TableAdapter
  extends Partial<
    TableProps &
      TableEvents &
      ElCommonAdapter<TableAdapter, TableOutput, TableSlots>
  > {
  asyncData?: AsyncDataAdapter<any[]>

  columns?: TableColumnAdapter[]

  /** v-loading配置 */
  loadingSetting?: VLoading
}

export interface TableOutput {
  setData(data: any[]): unknown
  setParams(
    params:
      | Record<string, any>
      | ((params?: Record<string, any>) => Record<string, any>)
  ): unknown
  update(): unknown
}

export const TABLE_DEFAULT: TableAdapter = {}
