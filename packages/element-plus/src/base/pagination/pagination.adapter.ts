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
}

export const PAGINATION_DEFAULT: PaginationAdapter = {
}