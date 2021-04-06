<template>
  <el-date-picker
    class="c-date-picker"
    :ref="$options.name"
    v-bind="binds"
    v-model="attrs.modelValue"
  >
    <template v-if="computedSlotName('range-separator')" #range-separator>
      <slot :name="computedSlotName('range-separator')" :attrs="attrs"></slot
    ></template>
  </el-date-picker>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  DatePickerAdapter,
  DatePickerBindsOmitKeys,
  DATE_PICKER_DEFAULT
} from './date-picker.adapter'
import { ElDatePicker } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useDatePicker } from './date-picker.use'

export default defineComponent({
  name: COMPONENT_NAME.datePicker,
  inheritAttrs: false,
  components: { ElDatePicker },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<DatePickerAdapter>,
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
    const type = COMPONENT_TYPE.datePicker

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<DatePickerAdapter>({
      props,
      defaultOption: DATE_PICKER_DEFAULT,
      type,
      omitKeys: DatePickerBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useDatePicker({ props, attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
