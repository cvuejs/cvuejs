<template>
  <el-checkbox-button
    class="c-checkbox-button"
    :ref="$options.name"
    v-bind="binds"
    v-model="attrs.modelValue"
  ></el-checkbox-button>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  CheckboxButtonAdapter,
  CheckboxButtonBindsOmitKeys,
  CHECKBOX_BUTTON_DEFAULT
} from './checkbox-button.adapter'
import { ElCheckboxButton } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useCheckboxButton } from './checkbox-button.use'

export default defineComponent({
  name: COMPONENT_NAME.checkboxButton,
  inheritAttrs: false,
  components: { ElCheckboxButton },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<CheckboxButtonAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    },
    modelValue: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      default: ''
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.checkboxButton

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<CheckboxButtonAdapter>({
      props,
      defaultOption: CHECKBOX_BUTTON_DEFAULT,
      type,
      omitKeys: CheckboxButtonBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useCheckboxButton({ props, attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
