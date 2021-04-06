<template>
  <el-select
    class="c-select"
    :ref="$options.name"
    v-bind="binds"
    v-model="attrs.modelValue"
  >
    <template #default>
      <slot
        v-if="computedSlotName('default')"
        :name="computedSlotName('default')"
        :attrs="attrs"
      ></slot>
      <template v-else-if="attrs.type === 'option'">
        <Option
          v-for="option in attrs.options || []"
          :key="option.value"
          :c="setInner(option)"
        ></Option>
      </template>
      <template v-else-if="attrs.type === 'optionGroup'">
        <OptionGroup
          v-for="(optionGroup, index) in attrs.optionGroups || []"
          :key="index"
          :c="setInner(optionGroup)"
        ></OptionGroup>
      </template>
    </template>

    <template v-if="computedSlotName('prefix')" #prefix>
      <slot :name="computedSlotName('prefix')" :attrs="attrs"></slot
    ></template>

    <template v-if="computedSlotName('empty')" #empty>
      <slot :name="computedSlotName('empty')" :attrs="attrs"></slot
    ></template>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  SelectAdapter,
  SelectBindsOmitKeys,
  SELECT_DEFAULT
} from './select.adapter'
import { ElSelect } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { SelectState, useSelect } from './select.use'
import { OptionGroup } from '../option-group'
import { Option } from '../option'

export default defineComponent({
  name: COMPONENT_NAME.select,
  inheritAttrs: false,
  components: { ElSelect, Option, OptionGroup },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<SelectAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    },
    modelValue: [Array, String, Number, Boolean, Object] as PropType<
      string | number | any[] | boolean | object
    >
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.select
    const state = reactive<SelectState>({
      loading: false
    })

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<SelectAdapter>({
      props,
      defaultOption: SELECT_DEFAULT,
      type,
      omitKeys: SelectBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useSelect({ props, attrs, state, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName, setInner } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName, setInner }
  }
})
</script>
