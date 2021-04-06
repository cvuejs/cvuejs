<template>
  <el-radio-group
    class="c-radio-group"
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

      <template v-else-if="attrs.type === 'radio'">
        <Radio
          v-for="(radio, index) in attrs.radios"
          :key="index"
          :c="radio"
        ></Radio>
      </template>

      <template v-else-if="attrs.type === 'radioButton'">
        <RadioButton
          v-for="(radioButton, index) in attrs.radioButtons"
          :key="index"
          :c="radioButton"
        ></RadioButton>
      </template>
    </template>
  </el-radio-group>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  RadioGroupAdapter,
  RadioGroupBindsOmitKeys,
  RADIO_GROUP_DEFAULT
} from './radio-group.adapter'
import { ElRadioGroup } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useRadioGroup } from './radio-group.use'
import { Radio } from '../radio'
import { RadioButton } from '../radio-button'

export default defineComponent({
  name: COMPONENT_NAME.radioGroup,
  inheritAttrs: false,
  components: { ElRadioGroup, Radio, RadioButton },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<RadioGroupAdapter>,
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
    const type = COMPONENT_TYPE.radioGroup

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<RadioGroupAdapter>({
      props,
      defaultOption: RADIO_GROUP_DEFAULT,
      type,
      omitKeys: RadioGroupBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useRadioGroup({ props, attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
