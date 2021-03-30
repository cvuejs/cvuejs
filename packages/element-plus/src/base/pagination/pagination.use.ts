import { PaginationAdapter } from './pagination.adapter'
import { computed, ComputedRef } from 'vue'

interface UsePaginationOpt {
  attrs: ComputedRef<PaginationAdapter>
}

export const usePagination = ({ attrs }: UsePaginationOpt) => {
  console.log(attrs)
  const output = computed(() => ({}))
  return output
}
