import { PaginationAdapter } from './pagination.adapter'
import { computed, ComputedRef } from 'vue'

interface UsePaginationOpt {
  attrs: ComputedRef<PaginationAdapter>
}

export const usePagination = ({ attrs }: UsePaginationOpt) => {
  const output = computed(() => ({
    setPageNo,
    setPageSize
  }))
  return { output }

  function setPageNo(page = 1) {
    attrs.value.currentPage = page
  }
  function setPageSize(pageSize = 10) {
    attrs.value.pageSize = pageSize
  }
}
