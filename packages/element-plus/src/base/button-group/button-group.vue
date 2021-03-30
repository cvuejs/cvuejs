<template>
  <el-button-group class="c-button-group" :ref="$options.name" v-bind="binds">
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
          :c="button"
        ></Button>
      </template>
    </template>
  </el-button-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  ButtonGroupAdapter,
  ButtonGroupBindsOmitKeys,
  BUTTON_GROUP_DEFAULT
} from './button-group.adapter'
import { ElButtonGroup } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/setups/useProvider'
import { useCommonSetup } from '../../utils/setups/useCommonSetup'
import { useComputeAttrs } from '../../utils/setups/useComputeAttrs'
import { useButtonGroup } from './button-group.use'
import { Button } from '../button'

export default defineComponent({
  name: COMPONENT_NAME.buttonGroup,
  inheritAttrs: false,
  components: { ElButtonGroup, Button },
  props: {
    c: {
      type: Object as PropType<ButtonGroupAdapter>,
      default: () => ({})
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
    const { computedSlotName } = useCommonSetup({ attrs, output })
    return { attrs, binds, computedSlotName }
  }
})
</script>

<style lang="scss"></style>
