<template>
  <el-table
    class="c-table"
    :ref="$options.name"
    v-bind="binds"
    v-loading="loading"
    :element-loading-text="loadingSetting.text"
    :element-loading-spinner="loadingSetting.spinner"
    :element-loading-background="loadingSetting.background"
  >
    <template #default>
      <slot
        v-if="computedSlotName('default')"
        :name="computedSlotName('default')"
        :attrs="attrs"
      ></slot>

      <template v-if="attrs.columns">
        <TableColumn
          v-for="(column, index) in attrs.columns || []"
          :key="index"
          :c="column"
          @prop-handle="onPropHandle"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </TableColumn>
      </template>
    </template>

    <template v-if="computedSlotName('append')" #append>
      <slot :name="computedSlotName('append')" :attrs="attrs"></slot>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import {
  TableAdapter,
  TableBindsOmitKeys,
  TABLE_DEFAULT
} from './table.adapter'
import { ElTable } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { TableState, useTable } from './table.use'
import { TableColumn } from '../table-column'

export default defineComponent({
  name: COMPONENT_NAME.table,
  inheritAttrs: false,
  components: { ElTable, TableColumn },
  emits: ['output-change'],
  props: {
    c: {
      type: Object as PropType<TableAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.table
    const state = reactive<TableState>({
      loading: false,
      loadingSetting: {}
    })

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<TableAdapter>({
      props,
      defaultOption: TABLE_DEFAULT,
      type,
      omitKeys: TableBindsOmitKeys
    })

    /** 组件输出 */
    const { output, onPropHandle } = useTable({ attrs, state })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })
    return { attrs, binds, computedSlotName, onPropHandle, ...toRefs(state) }
  }
})
</script>
