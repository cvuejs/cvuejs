import { ElCommonAdapter } from '../../utils/dtos'
import { PaginationEvents, PaginationProps, PaginationSlots } from './pagination.attrs'

export const PaginationBindsOmitKeys: (keyof PaginationAdapter)[] = [
  'pageSize',
  'currentPage'
]
export interface PaginationAdapter
  extends Partial<
    PaginationProps &
      PaginationEvents &
      ElCommonAdapter<PaginationAdapter, PaginationOutput, PaginationSlots>
  > {}

export interface PaginationOutput {
  setPageNo(pageNo: number): unknown
  setPageSize(pageSize: number): unknown
}

export const PAGINATION_DEFAULT: PaginationAdapter = {
  currentPage: 1,
  pageSize: 10,
  total: 0
}