import { TableOutput } from './../../base/table/table.adapter'
import { CtAttrsType, CtOutput } from './ct.adapter'
import {
  computed,
  ComputedRef,
  getCurrentInstance,
  nextTick,
  onMounted,
  watchEffect
} from 'vue'
import { PaginationOutput } from '../../base/pagination/pagination.adapter'
import { useOutputChange } from '../../utils/hooks/useOutputChange'
import { COMPONENT_NAME } from '../../utils/constants/component'

interface UseCtOpt {
  attrs: ComputedRef<CtAttrsType>
  state: CtState
}

export interface CtState {
  ctStyle: Record<string, string>
  tableOutput: Partial<TableOutput>
  paginationOutput: Partial<PaginationOutput>
}

export const useCt = ({ attrs, state }: UseCtOpt) => {
  const instance = getCurrentInstance()!
  const output = computed<CtOutput>(() => {
    return {
      ...(state.tableOutput as TableOutput),
      ...(state.paginationOutput as PaginationOutput)
    }
  })

  /** 设置pageNo pageSize  */
  if (attrs.value.table.asyncData && attrs.value.paginationParamsHandle) {
    onMounted(() => {
      watchEffect(() => {
        const { currentPage, pageSize } = attrs.value.pagination
        setPaginationParams(currentPage, pageSize)
      })
    })
    const { onCurrentChange, onSizeChange } = attrs.value.pagination
    attrs.value.pagination.onCurrentChange = (current, data) => {
      onCurrentChange
        ? onCurrentChange(current, data)
        : nextTick(output.value.update)
    }
    attrs.value.pagination.onSizeChange = (size, data) => {
      onSizeChange ? onSizeChange(size, data) : nextTick(output.value.update)
    }
  }

  /** 处理返回的数据 */
  if (attrs.value.table.asyncData && attrs.value.tableAsyncDataResHandle) {
    const { dataHandle, dataInterceptorHandle } = attrs.value.table.asyncData
    attrs.value.table.asyncData.dataInterceptorHandle = (data, config) => {
      if (dataInterceptorHandle) return dataInterceptorHandle(data, config)
      /* eslint-disable-next-line prefer-const */
      let { list, total = 0 } = attrs.value.tableAsyncDataResHandle!(data)
      if (attrs.value.paginationBySelf) {
        /** 前端分页 */
        const { currentPage = 1, pageSize = 10 } = attrs.value.pagination
        attrs.value.pagination.total = list.length
        const startIndex = (currentPage - 1) * pageSize
        const endIndex = startIndex + pageSize
        list = list.slice(startIndex, endIndex)
      } else {
        attrs.value.pagination.total = total
      }
      return dataHandle ? dataHandle(list) : list
    }
  }

  /** Sink - 不适用于弹窗场景 */
  if (attrs.value.paginationSink || _.isNumber(attrs.value.paginationSink)) {
    onMounted(() => {
      const el = instance!.refs[COMPONENT_NAME.ct] as HTMLElement
      const top = el.getBoundingClientRect().top
      const adapterValue = _.isNumber(attrs.value.paginationSink)
        ? top - attrs.value.paginationSink
        : top
      state.ctStyle.minHeight = `calc(100vh - ${adapterValue}px)`
    })
  }

  const { onOutputChange } = useOutputChange(state)

  return { output, onOutputChange, getTableNo }

  function setPaginationParams(
    pageNo: number | undefined,
    pageSize: number | undefined
  ) {
    if (!pageNo || !pageSize) return
    const pageParams = attrs.value.paginationParamsHandle!({
      pageNo,
      pageSize
    })
    output.value.setExtraParams &&
      output.value.setExtraParams((params) => ({
        ...params,
        ..._.omitBy(pageParams, _.isUndefined)
      }))
  }

  function getTableNo(index = 0) {
    const { currentPage = 1, pageSize = 10 } = attrs.value.pagination
    return index + 1 + (currentPage - 1) * pageSize
  }
}
