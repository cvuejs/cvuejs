<template>
  <div class="c-ct" :ref="$options.name" :style="ctStyle">
    <Table
      class="c-ct__table"
      :c="setInner(attrs.table)"
      @output-change="onOutputChange('tableOutput', $event)"
    >
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </Table>
    <Pagination
      v-show="!attrs.paginationHidden"
      class="c-ct__pagination"
      :c="setInner(attrs.pagination)"
      @output-change="onOutputChange('paginationOutput', $event)"
    >
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </Pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import {
  CtAdapter,
  CtAttrsType,
  CtBindsOmitKeys,
  CT_DEFAULT
} from './ct.adapter'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { CtState, useCt } from './ct.use'
import { Pagination, Table } from '../../base'

export default defineComponent({
  name: COMPONENT_NAME.ct,
  components: { Table, Pagination },
  props: {
    c: {
      type: Object as PropType<CtAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.ct
    const state = reactive<CtState>({
      ctStyle: {},
      tableOutput: {},
      paginationOutput: {}
    })

    /** 合并配置，获取attrs */
    const { attrs } = useComputeAttrs<CtAttrsType>({
      props,
      defaultOption: CT_DEFAULT,
      type,
      omitKeys: CtBindsOmitKeys
    })

    /** 组件输出 */
    const { output, onOutputChange, getTableNo } = useCt({ attrs, state })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName, setInner } = useCommonSetup({
      attrs,
      output
    })

    return {
      attrs,
      computedSlotName,
      setInner,
      onOutputChange,
      getTableNo,
      ...toRefs(state)
    }
  }
})
</script>
