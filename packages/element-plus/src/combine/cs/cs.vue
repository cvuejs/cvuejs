<template>
  <div class="c-cs" :ref="$options.name">
    <Form
      :c="setInner(attrs.form)"
      @output-change="onOutputChange('formOutput', $event)"
    >
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
      <template #csButtonGroup>
        <ButtonGroup :c="buttonGroup"></ButtonGroup>
      </template>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { CsAdapter, CsBindsOmitKeys, CS_DEFAULT } from './cs.adapter'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useCs } from './cs.use'
import { Form, ButtonGroup } from '../../base'

export default defineComponent({
  name: COMPONENT_NAME.cs,
  components: { Form, ButtonGroup },
  props: {
    c: {
      type: Object as PropType<CsAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.cs

    /** 合并配置，获取attrs */
    const { attrs } = useComputeAttrs<CsAdapter>({
      props,
      defaultOption: CS_DEFAULT,
      type,
      omitKeys: CsBindsOmitKeys
    })

    /** 组件输出 */
    const { output, onOutputChange, state } = useCs({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName, setInner } = useCommonSetup({ attrs, output })

    return {
      attrs,
      computedSlotName,
      onOutputChange,
      setInner,
      ...toRefs(state)
    }
  }
})
</script>
