import { TableAdapter } from './table.adapter'
import { computed, ComputedRef, watch, watchEffect } from 'vue'
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
  const propHandles: ((data: Record<string, any>) => Record<string, any>)[] = []
  const { data, setParams, setExtraParams, sendAlways } = useAsyncData(
    attrs.value.asyncData
  )
  watchEffect(() => {
    if (attrs.value.asyncData) {
      if (data.value) {
        attrs.value.data = data.value
      }
    }
  })
  watchEffect(() => {
    if (attrs.value.asyncData) {
      state.loading = !!attrs.value.asyncData.loading
    }
  })
  watchEffect(() => {
    state.loadingSetting = attrs.value.loadingSetting || {}
  })
  watch(
    () => attrs.value.data,
    (data) => {
      if (data && propHandles.length) {
        propHandles.forEach((handle) => data.forEach(handle))
      }
    },
    { immediate: true, deep: true }
  )

  const output = computed(() => ({
    setData,
    setParams,
    setExtraParams,
    update: sendAlways
  }))
  return { output, onPropHandle }

  function setData(data: any[]) {
    attrs.value.data = data
  }

  function onPropHandle(handle: () => any) {
    propHandles.push(handle)
  }
}
