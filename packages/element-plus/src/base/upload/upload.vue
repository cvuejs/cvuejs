<template>
  <el-upload
    class="c-upload"
    :ref="$options.name"
    v-bind="binds"
  >
    <template v-if="computedSlotName('default')" #default>
      <slot :name="computedSlotName('default')" :attrs="attrs"></slot>
    </template>
    <template v-if="computedSlotName('trigger')" #trigger>
      <slot :name="computedSlotName('trigger')" :attrs="attrs"></slot>
    </template>
    <template v-if="computedSlotName('tip')" #tip>
      <slot :name="computedSlotName('tip')" :attrs="attrs"></slot>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import {
  UploadAdapter,
  UploadBindsOmitKeys,
  UPLOAD_DEFAULT
} from './upload.adapter'
import { ElUpload } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useUpload } from './upload.use'

export default defineComponent({
  name: COMPONENT_NAME.upload,
  inheritAttrs: false,
  components: { ElUpload },
  emits: ['output-change', 'update:modelValue'],
  props: {
    c: {
      type: Object as PropType<UploadAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.upload

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<UploadAdapter>({
      props,
      defaultOption: UPLOAD_DEFAULT,
      type,
      omitKeys: UploadBindsOmitKeys
    })

    /** 组件输出 */
    const { output, state } = useUpload({ props, attrs, ctx })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName } = useCommonSetup({ attrs, output })

    return { attrs, binds, computedSlotName, ...toRefs(state) }
  }
})
</script>
