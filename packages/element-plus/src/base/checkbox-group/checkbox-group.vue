<template>
  <el-checkbox-group
    class="c-checkbox-group"
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

      <template v-else-if="attrs.type === 'checkbox'">
        <Checkbox
          v-for="(checkbox, index) in attrs.checkboxs || []"
          :key="index"
          :c="checkbox"
        ></Checkbox>
      </template>

      <template v-else-if="attrs.type === 'checkboxButton'">
        <CheckboxButton
          v-for="(checkboxButton, index) in attrs.checkboxButtons || []"
          :key="index"
          :c="checkboxButton"
        ></CheckboxButton>
      </template>
    </template>
  </el-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  CheckboxGroupAdapter,
  CheckboxGroupBindsOmitKeys,
  CHECKBOX_GROUP_DEFAULT
} from './checkbox-group.adapter'
import { ElCheckboxGroup } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useCheckboxGroup } from './checkbox-group.use'
import { Checkbox } from '../checkbox'
import { CheckboxButton } from '../checkbox-button'

export default defineComponent({
  name: COMPONENT_NAME.checkboxGroup,
  inheritAttrs: false,
  components: { ElCheckboxGroup, Checkbox, CheckboxButton },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<CheckboxGroupAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    },
    modelValue: {
      type: [Object, Boolean, Array] as PropType<object | boolean | any[]>,
      default: ''
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.checkboxGroup

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<CheckboxGroupAdapter>({
      props,
      defaultOption: CHECKBOX_GROUP_DEFAULT,
      type,
      omitKeys: CheckboxGroupBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useCheckboxGroup({ props, attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
