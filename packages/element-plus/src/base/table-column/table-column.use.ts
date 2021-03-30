import { TableColumnAdapter } from './table-column.adapter'
import { computed, ComputedRef, reactive } from 'vue'

interface UseTableColumnOpt {
  attrs: ComputedRef<TableColumnAdapter>
}

export const useTableColumn = ({ attrs }: UseTableColumnOpt) => {
  const getButtonGroup = (scope: any) => {
    if (typeof attrs.value.buttonGroupRender === 'function') {
      return reactive(_.cloneDeep(attrs.value.buttonGroupRender(scope)))
    }
    return 
  }

  const output = computed(() => ({}))
  return { output, getButtonGroup }
}
