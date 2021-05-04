<template>
  <el-table-column class="c-table-column" :ref="$options.name" v-bind="binds">
    <template
      v-if="
        computedSlotName('default') ||
          ['buttonGroup', 'nested'].includes(attrs.type)
      "
      #default="scope"
    >
      <slot
        v-if="computedSlotName('default')"
        :name="computedSlotName('default')"
        :attrs="attrs"
        :scope="scope"
      ></slot>

      <template
        v-else-if="
          attrs.type === 'buttonGroup' &&
            typeof attrs.buttonGroupRender === 'function'
        "
      >
        <ButtonGroup :c="getButtonGroup(scope)">
          <template v-for="(_, slot) in $slots" #[slot]="{attrs}">
            <slot :name="slot" v-bind="{ attrs, ...scope }"></slot>
          </template>
        </ButtonGroup>
      </template>

      <template v-else-if="attrs.type === 'nested'">
        <CTableColumn
          v-for="(column, index) in attrs.nestedColumns || []"
          :key="index"
          :c="column"
        ></CTableColumn>
      </template>
    </template>

    <template v-if="computedSlotName('header')" #header="scope">
      <slot
        :name="computedSlotName('header')"
        v-bind="{ attrs, ...scope }"
      ></slot>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  TableColumnAdapter,
  TableColumnBindsOmitKeys,
  TABLE_COLUMN_DEFAULT
} from './table-column.adapter'
import { ElTableColumn } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useTableColumn } from './table-column.use'
import { ButtonGroup } from '../button-group'

export default defineComponent({
  name: COMPONENT_NAME.tableColumn,
  inheritAttrs: false,
  components: { ElTableColumn, ButtonGroup },
  emits: ['prop-handle'],
  props: {
    c: {
      type: Object as PropType<TableColumnAdapter>,
      default: () => (reactive({}))
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.tableColumn

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<TableColumnAdapter>({
      props,
      defaultOption: TABLE_COLUMN_DEFAULT,
      type,
      omitKeys: TableColumnBindsOmitKeys
    })

    /** 组件输出 */
    const { output, getButtonGroup } = useTableColumn({ attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })
    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })
    return { attrs, binds, computedSlotName, getButtonGroup }
  }
})
</script>

<style lang="scss">
</style>
