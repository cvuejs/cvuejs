<template>
  <el-table class="c-table" :ref="$options.name" v-bind="binds">
    <template #default>
      <slot
        v-if="computedSlotName('default')"
        :name="computedSlotName('default')"
        :attrs="attrs"
      ></slot>

      <template v-else>
        <TableColumn
          v-for="(column, index) in attrs.columns || []"
          :key="index"
          :c="column"
        >
          <template v-for="(_, slot) in $slots" #[slot]="{scope, attrs}">
            <slot :name="slot" :attrs="attrs" :scope="scope"></slot>
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
import { defineComponent, PropType } from 'vue'
import {
  TableAdapter,
  TableBindsOmitKeys,
  TABLE_DEFAULT
} from './table.adapter'
import { ElTable } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/setups/useProvider'
import { useCommonSetup } from '../../utils/setups/useCommonSetup'
import { useComputeAttrs } from '../../utils/setups/useComputeAttrs'
import { useTable } from './table.use'
import { TableColumn } from '../table-column'

export default defineComponent({
  name: COMPONENT_NAME.table,
  inheritAttrs: false,
  components: { ElTable, TableColumn },
  props: {
    c: {
      type: Object as PropType<TableAdapter>,
      default: () => ({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.table

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<TableAdapter>({
      props,
      defaultOption: TABLE_DEFAULT,
      type,
      omitKeys: TableBindsOmitKeys
    })

    /** 组件输出 */
    const output = useTable({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })
    return { attrs, binds, computedSlotName }
  }
})
</script>

<style lang="scss"></style>
