import { ElCommonAdapter } from '../../utils/dtos'
import { ButtonGroupAdapter } from '../button-group/button-group.adapter'
import {
  TableColumnEvents,
  TableColumnProps,
  TableColumnSlots
} from './table-column.attrs'

export const TableColumnBindsOmitKeys: (keyof TableColumnAdapter)[] = [
  'buttonGroupRender',
  'nestedColumns'
]
export interface TableColumnAdapter
  extends Partial<
    TableColumnProps &
      TableColumnEvents &
      ElCommonAdapter<TableColumnAdapter, TableColumnOutput, TableColumnSlots>
  > {
  /** type 为 button 时有效 可根据scope返回不同行不同状态的buttonGroup */
  buttonGroupRender?(scope: {
    row: Record<string, any>
    column: Record<string, any>
  }): ButtonGroupAdapter

  /** type nesetd时有效，多层嵌套，用于多级表头 */
  nestedColumns?: TableColumnAdapter[]
}

export interface TableColumnOutput {}

export const TABLE_COLUMN_DEFAULT: TableColumnAdapter = {}
