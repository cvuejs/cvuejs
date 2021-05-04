<template>
  <Dialog
    :ref="$options.name"
    :c="setInner(dialog)"
    @output-change="onOutputChange('dialogOutput', $event)"
  >
    <Form
      :c="setInner(attrs.form)"
      @output-change="onOutputChange('formOutput', $event)"
    >
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </Form>

    <template v-for="(_, slot) in $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { CeAdapter, CeBindsOmitKeys, CE_DEFAULT } from './ce.adapter'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useCe } from './ce.use'
import { Dialog, Form } from '../../base'

export default defineComponent({
  name: COMPONENT_NAME.ce,
  components: { Dialog, Form },
  props: {
    c: {
      type: Object as PropType<CeAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.ce

    /** 合并配置，获取attrs */
    const { attrs } = useComputeAttrs<CeAdapter>({
      props,
      defaultOption: CE_DEFAULT,
      type,
      omitKeys: CeBindsOmitKeys
    })

    /** 组件输出 */
    const { output, onOutputChange, state } = useCe({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName, setInner } = useCommonSetup({ attrs, output })

    return {
      attrs,
      computedSlotName,
      setInner,
      onOutputChange,
      ...toRefs(state)
    }
  }
})
</script>
