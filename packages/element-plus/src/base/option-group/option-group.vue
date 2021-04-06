<template>
  <el-option-group class="c-option-group" :ref="$options.name" v-bind="binds">
    <template #default>
      <slot
        v-if="computedSlotName('default')"
        :name="computedSlotName('default')"
        :attrs="attrs"
      ></slot>
      <template v-else>
        <Option
          v-for="option in attrs.options"
          :key="option.value"
          :c="setInner(option)"
        ></Option>
      </template>
    </template>
  </el-option-group>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  OptionGroupAdapter,
  OptionGroupBindsOmitKeys,
  OPTION_GROUP_DEFAULT
} from './option-group.adapter'
import { ElOptionGroup } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useOptionGroup } from './option-group.use'

export default defineComponent({
  name: COMPONENT_NAME.optionGroup,
  inheritAttrs: false,
  components: { ElOptionGroup },
  emits: ['output-change'],
  props: {
    c: {
      type: Object as PropType<OptionGroupAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.optionGroup

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<OptionGroupAdapter>({
      props,
      defaultOption: OPTION_GROUP_DEFAULT,
      type,
      omitKeys: OptionGroupBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useOptionGroup({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName, setInner } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName, setInner }
  }
})
</script>
