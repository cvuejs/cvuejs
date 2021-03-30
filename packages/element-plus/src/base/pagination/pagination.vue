<template>
  <el-pagination
    class="c-pagination"
    :ref="$options.name"
    v-bind="binds"
    v-model:currentPage="attrs.currentPage"
    v-model:pageSize="attrs.pageSize"
  >
    <template v-if="computedSlotName('default')" #default>
      <slot :name="computedSlotName('default')" :attrs="attrs"></slot>
    </template>
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  PaginationAdapter,
  PaginationBindsOmitKeys,
  PAGINATION_DEFAULT
} from './pagination.adapter'
import { ElPagination } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/setups/useProvider'
import { useCommonSetup } from '../../utils/setups/useCommonSetup'
import { useComputeAttrs } from '../../utils/setups/useComputeAttrs'
import { usePagination } from './pagination.use'

export default defineComponent({
  name: COMPONENT_NAME.pagination,
  inheritAttrs: false,
  components: { ElPagination },
  props: {
    c: {
      type: Object as PropType<PaginationAdapter>,
      default: () => ({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.pagination

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<PaginationAdapter>({
      props,
      defaultOption: PAGINATION_DEFAULT,
      type,
      omitKeys: PaginationBindsOmitKeys
    })

    /** 组件输出 */
    const output = usePagination({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>

<style lang="scss"></style>
