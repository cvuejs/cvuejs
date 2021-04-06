<template>
  <el-checkbox
    class="c-checkbox"
    :ref="$options.name"
    v-bind="binds"
    v-model="attrs.modelValue"
  ></el-checkbox>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  CheckboxAdapter,
  CheckboxBindsOmitKeys,
  CHECKBOX_DEFAULT
} from './checkbox.adapter'
import { ElCheckbox } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useCheckbox } from './checkbox.use'

export default defineComponent({
  name: COMPONENT_NAME.checkbox,
  inheritAttrs: false,
  components: { ElCheckbox },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<CheckboxAdapter>,
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
    const type = COMPONENT_TYPE.checkbox

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<CheckboxAdapter>({
      props,
      defaultOption: CHECKBOX_DEFAULT,
      type,
      omitKeys: CheckboxBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useCheckbox({ props, attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
