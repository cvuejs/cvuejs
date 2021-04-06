import { TableColumnAdapter } from './table-column.adapter'
import { computed, ComputedRef } from 'vue'

interface UseTableColumnOpt {
  attrs: ComputedRef<TableColumnAdapter>
}

export const useTableColumn = ({ attrs }: UseTableColumnOpt) => {
  const getButtonGroup = (scope: any) => {
    if (attrs.value.buttonGroupRender) {
      return attrs.value.buttonGroupRender(scope)
    }
  }

  const output = computed(() => ({}))
  return { output, getButtonGroup }
}
