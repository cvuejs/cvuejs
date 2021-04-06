import { TableAdapter } from './table.adapter'
import { computed, ComputedRef, watchEffect } from 'vue'
import { useAsyncData } from '../../utils/hooks/useAsyncData'
import { VLoading } from '../../utils/dtos'

interface UseTableOpt {
  attrs: ComputedRef<TableAdapter>
  state: TableState
}

export interface TableState {
  loading: boolean
  loadingSetting: VLoading
}

export const useTable = ({ attrs, state }: UseTableOpt) => {
  const { data, setParams, sendAlways } = useAsyncData(attrs.value.asyncData)
  watchEffect(() => {
    if (attrs.value.asyncData) {
      if (data.value) attrs.value.data = data.value
      state.loading = !!attrs.value.asyncData.loading
    }
  })
  watchEffect(() => {
    state.loadingSetting = attrs.value.loadingSetting || {}
  })

  const output = computed(() => ({
    setData,
    setParams,
    update: sendAlways
  }))
  return { output }

  function setData (data: any[]) {
    attrs.value.data = data
  }
}
