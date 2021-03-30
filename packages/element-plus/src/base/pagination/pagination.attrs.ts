import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { PaginationAdapter, PaginationOutput } from './pagination.adapter'

export interface PaginationProps {
  pageSize: number
  small: boolean
  total: number
  pageCount: number
  pagerCount: number
  currentPage: number
  layout: string
  pageSizes: number[]
  popperClass: string
  prevText: string
  nextText: string
  background: boolean
  disabled: boolean
  hideOnSinglePage: boolean
}

export interface PaginationEvents {
  onSizeChange(
    size: number,
    componentData: ComponentCallbackInjectParam<
      PaginationAdapter,
      PaginationOutput
    >
  ): unknown
  onCurrentChange(
    current: number,
    componentData: ComponentCallbackInjectParam<
      PaginationAdapter,
      PaginationOutput
    >
  ): unknown
  onPrevClick(
    current: number,
    componentData: ComponentCallbackInjectParam<
      PaginationAdapter,
      PaginationOutput
    >
  ): unknown
  onNextClick(
    current: number,
    componentData: ComponentCallbackInjectParam<
      PaginationAdapter,
      PaginationOutput
    >
  ): unknown
}

export type PaginationSlots = 'default'
