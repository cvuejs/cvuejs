<template>
  <el-button-group
    :class="{
      'c-button-group': true,
      'is-left': attrs.align === 'left',
      'is-mid': attrs.align === 'center',
      'is-right': attrs.align === 'right'
    }"
    :ref="$options.name"
    v-bind="binds"
  >
    <template #default>
      <slot
        v-if="computedSlotName('default')"
        :name="computedSlotName('default')"
        :attrs="attrs"
      ></slot>
      <template v-else>
        <Button
          v-for="(button, index) in attrs.buttons || []"
          :key="index"
          :c="setInner(button)"
        ></Button>
      </template>
    </template>
  </el-button-group>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  ButtonGroupAdapter,
  ButtonGroupBindsOmitKeys,
  BUTTON_GROUP_DEFAULT
} from './button-group.adapter'
import { ElButtonGroup } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useButtonGroup } from './button-group.use'
import { Button } from '../button'

export default defineComponent({
  name: COMPONENT_NAME.buttonGroup,
  inheritAttrs: false,
  components: { ElButtonGroup, Button },
  props: {
    c: {
      type: Object as PropType<ButtonGroupAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.buttonGroup

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<ButtonGroupAdapter>({
      props,
      defaultOption: BUTTON_GROUP_DEFAULT,
      type,
      omitKeys: ButtonGroupBindsOmitKeys
    })

    /** 组件输出 */
    const output = useButtonGroup({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName, setInner } = useCommonSetup({ attrs, output })
    return { attrs, binds, computedSlotName, setInner }
  }
})
</script>
