<template>
  <el-dialog :ref="$options.name" v-bind="binds" v-model="attrs.modelValue">
    <template #default>
      <slot :name="computedSlotName('default')" :attrs="attrs"></slot>
    </template>
    <template #title>
      <slot :name="computedSlotName('title')" :attrs="attrs"></slot>
    </template>
    <template #footer>
      <slot
        v-if="computedSlotName('footer')"
        :name="computedSlotName('footer')"
        :attrs="attrs"
      ></slot>
      <ButtonGroup v-else :c="attrs.footerButtonGroup"></ButtonGroup>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  DialogAdapter,
  DialogBindsOmitKeys,
  DIALOG_DEFAULT
} from './dialog.adapter'
import { ElDialog } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/setups/useProvider'
import { useCommonSetup } from '../../utils/setups/useCommonSetup'
import { useComputeAttrs } from '../../utils/setups/useComputeAttrs'
import { useDialog } from './dialog.use'
import { ButtonGroup } from '../button-group'

export default defineComponent({
  name: COMPONENT_NAME.dialog,
  inheritAttrs: false,
  components: { ElDialog, ButtonGroup },
  props: {
    c: {
      type: Object as PropType<DialogAdapter>,
      default: () => ({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.dialog

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<DialogAdapter>({
      props,
      defaultOption: DIALOG_DEFAULT,
      type,
      omitKeys: DialogBindsOmitKeys
    })

    /** 组件输出 */
    const { output, preload } = useDialog({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output, preload })

    return { attrs, binds, computedSlotName }
  }
})
</script>

<style lang="scss"></style>
