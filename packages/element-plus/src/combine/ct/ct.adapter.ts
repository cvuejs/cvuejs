import { TableOutput } from './../../base/table/table.adapter'
import {
  PaginationAdapter,
  PaginationOutput
} from './../../base/pagination/pagination.adapter'
import { TableAdapter } from '@cvue/element-plus/src/base/table/table.adapter'
import { ElCommonAdapter } from '../../utils/dtos'
import { CtEvents, CtProps, CtSlots } from './ct.attrs'

export const CtBindsOmitKeys: (keyof CtAdapter)[] = []
export interface CtAdapter
  extends Partial<
    CtProps & CtEvents & ElCommonAdapter<CtAdapter, CtOutput, CtSlots>
  > {
  table?: TableAdapter
  tableAsyncDataResHandle?(data: any): { total?: number; list: any[] }
  tableShowNo?: boolean

  pagination?: PaginationAdapter
  paginationHidden?: boolean
  paginationBySelf?: boolean
  paginationSink?: boolean | number
  paginationParamsHandle?(data: {
    pageNo?: number
    pageSize?: number
  }): Record<string, any> | undefined
}

export interface CtAttrsType extends CtAdapter {
  table: TableAdapter
  pagination: PaginationAdapter
}

export interface CtOutput extends Required<PaginationOutput & TableOutput> {}

export const CT_DEFAULT: CtAttrsType = {
  table: {},
  pagination: {}
}
