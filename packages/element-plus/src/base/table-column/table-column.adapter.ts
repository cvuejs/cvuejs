import { ButtonAdapter } from './../button/button.adapter'
import { ElCommonAdapter } from '../../utils/dtos'
import { ButtonGroupAdapter } from '../button-group/button-group.adapter'
import {
  TableColumnEvents,
  TableColumnProps,
  TableColumnSlots
} from './table-column.attrs'

export const TableColumnBindsOmitKeys: (keyof TableColumnAdapter)[] = [
  'buttonGroupRender',
  'buttonDefault',
  'nestedColumns',
  'propHandle'
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
    $index: number
  }): ButtonGroupAdapter
  buttonDefault?: ButtonAdapter

  /** type nesetd时有效，多层嵌套，用于多级表头 */
  nestedColumns?: TableColumnAdapter[]

  /** 处理当前prop数据 */
  propHandle?(row: Record<string, any>): unknown
}

export interface TableColumnOutput {}

export const TABLE_COLUMN_DEFAULT: TableColumnAdapter = {}
