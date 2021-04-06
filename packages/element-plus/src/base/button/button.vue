<template>
  <el-button
    v-if="attrs.visable"
    class="c-button"
    :ref="$options.name"
    v-bind="binds"
  >
    <template #default>
      <slot
        v-if="computedSlotName('default')"
        :name="computedSlotName('default')"
        :attrs="attrs"
      ></slot>
      <template v-else>{{ attrs.text || '' }}</template>
    </template>
  </el-button>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  ButtonAdapter,
  ButtonOmitBindsKeys,
  BUTTON_DEFAULT
} from './button.adapter'
import { ElButton } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useButton } from './button.use'
import { BUTTON_PROPS } from './button.attrs'

export default defineComponent({
  name: COMPONENT_NAME.button,
  inheritAttrs: false,
  components: { ElButton },
  props: {
    c: {
      type: Object as PropType<ButtonAdapter>,
      default: () => (reactive({}))
    },
    n: {
      type: String
    },
    ...BUTTON_PROPS
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.button

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<ButtonAdapter>({
      props,
      defaultOption: BUTTON_DEFAULT,
      type,
      omitKeys: ButtonOmitBindsKeys
    })

    /** 组件输出 */
    const output = useButton({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })
    return { attrs, binds, computedSlotName }
  }
})
</script>
