<template>
  <el-input
    class="c-input"
    :ref="$options.name"
    v-bind="binds"
    v-model="attrs.modelValue"
  >
    <template v-if="computedSlotName('prefix')" #prefix>
      <slot :name="computedSlotName('prefix')" :attrs="attrs"></slot>
    </template>
    <template v-if="computedSlotName('suffix')" #suffix>
      <slot :name="computedSlotName('suffix')" :attrs="attrs"></slot
    ></template>
    <template v-if="computedSlotName('prepend')" #prepend>
      <slot :name="computedSlotName('prepend')" :attrs="attrs"></slot
    ></template>
    <template v-if="computedSlotName('append')" #append>
      <slot :name="computedSlotName('append')" :attrs="attrs"></slot
    ></template>
  </el-input>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  InputAdapter,
  InputBindsOmitKeys,
  INPUT_DEFAULT
} from './input.adapter'
import { ElInput } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useInput } from './input.use'

export default defineComponent({
  name: COMPONENT_NAME.input,
  inheritAttrs: false,
  components: { ElInput },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<InputAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.input

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<InputAdapter>({
      props,
      defaultOption: INPUT_DEFAULT,
      type,
      omitKeys: InputBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useInput({ props, attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
