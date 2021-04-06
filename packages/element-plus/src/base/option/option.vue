<template>
  <el-option class="c-option" :ref="$options.name" v-bind="binds">
    <template v-if="computedSlotName('default')" #default>
      <slot :name="computedSlotName('default')" :attrs="attrs"></slot>
    </template>
  </el-option>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  OptionAdapter,
  OptionBindsOmitKeys,
  OPTION_DEFAULT
} from './option.adapter'
import { ElOption } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useOption } from './option.use'

export default defineComponent({
  name: COMPONENT_NAME.option,
  inheritAttrs: false,
  components: { ElOption },
  emits: ['output-change'],
  props: {
    c: {
      type: Object as PropType<OptionAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.option

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<OptionAdapter>({
      props,
      defaultOption: OPTION_DEFAULT,
      type,
      omitKeys: OptionBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useOption({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
