<template>
  <el-time-picker
    class="c-time-picker"
    :ref="$options.name"
    v-bind="binds"
    v-model="attrs.modelValue"
  ></el-time-picker>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  TimePickerAdapter,
  TimePickerBindsOmitKeys,
  TIME_PICKER_DEFAULT
} from './time-picker.adapter'
import { ElTimePicker } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useTimePicker } from './time-picker.use'

export default defineComponent({
  name: COMPONENT_NAME.timePicker,
  inheritAttrs: false,
  components: { ElTimePicker },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<TimePickerAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    },
    modelValue: {
      type: [String, Date, Array] as PropType<string | Date | Date[]>,
      default: ''
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.timePicker

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<TimePickerAdapter>({
      props,
      defaultOption: TIME_PICKER_DEFAULT,
      type,
      omitKeys: TimePickerBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useTimePicker({ props, attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
