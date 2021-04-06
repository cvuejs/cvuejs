<template>
  <el-radio-button
    class="c-radio-button"
    :ref="$options.name"
    v-bind="binds"
  ></el-radio-button>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  RadioButtonAdapter,
  RadioButtonBindsOmitKeys,
  RADIO_BUTTON_DEFAULT
} from './radio-button.adapter'
import { ElRadioButton } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useRadioButton } from './radio-button.use'

export default defineComponent({
  name: COMPONENT_NAME.radioButton,
  inheritAttrs: false,
  components: { ElRadioButton },
  emits: ['output-change'],
  props: {
    c: {
      type: Object as PropType<RadioButtonAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.radioButton

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<RadioButtonAdapter>({
      props,
      defaultOption: RADIO_BUTTON_DEFAULT,
      type,
      omitKeys: RadioButtonBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useRadioButton({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
