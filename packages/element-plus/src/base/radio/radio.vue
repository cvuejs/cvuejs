<template>
  <el-radio
    class="c-radio"
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
      <template v-else>{{ attrs.text || '' }}</template>
    </template>
  </el-radio>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  RadioAdapter,
  RadioBindsOmitKeys,
  RADIO_DEFAULT
} from './radio.adapter'
import { ElRadio } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useRadio } from './radio.use'

export default defineComponent({
  name: COMPONENT_NAME.radio,
  inheritAttrs: false,
  components: { ElRadio },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<RadioAdapter>,
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
    const type = COMPONENT_TYPE.radio

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<RadioAdapter>({
      props,
      defaultOption: RADIO_DEFAULT,
      type,
      omitKeys: RadioBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useRadio({ props, attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
