import { TableColumnAdapter } from './table-column.adapter'
import { computed, ComputedRef, SetupContext } from 'vue'

interface UseTableColumnOpt {
  attrs: ComputedRef<TableColumnAdapter>
  ctx: SetupContext<any>
}

export const useTableColumn = ({ attrs, ctx }: UseTableColumnOpt) => {
  const getButtonGroup = (scope: any) => {
    if (attrs.value.buttonGroupRender) {
      const group = attrs.value.buttonGroupRender(scope)
      if (group.buttons && attrs.value.buttonDefault) {
        group.buttons.forEach((button) =>
          _.defaults(button, attrs.value.buttonDefault)
        )
      }
      return group
    } else {
      return {}
    }
  }

  if (_.isFunction(attrs.value.propHandle))
    ctx.emit('prop-handle', attrs.value.propHandle)

  const output = computed(() => ({}))
  return { output, getButtonGroup }
}
