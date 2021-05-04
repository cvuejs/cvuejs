<template>
  <div class="c-form-group" :ref="$options.name" v-bind="binds">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import {
  FormGroupAdapter,
  FormGroupBindsOmitKeys,
  FORM_GROUP_DEFAULT
} from './form-group.adapter'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useFormGroup } from './form-group.use'

export default defineComponent({
  name: COMPONENT_NAME.formGroup,
  inheritAttrs: false,
  emits: ['output-change'],
  props: {
    c: {
      type: Object as PropType<FormGroupAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.formGroup

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<FormGroupAdapter>({
      props,
      defaultOption: FORM_GROUP_DEFAULT,
      type,
      omitKeys: FormGroupBindsOmitKeys
    })

    /** 组件输出 */
    const { output } = useFormGroup({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName }
  }
})
</script>
