<template>
  <el-form class="c-form" v-loading="loading" :ref="$options.name" v-bind="binds">
    <template #default>
      <slot
        v-if="computedSlotName('default')"
        :name="computedSlotName('default')"
        :attrs="attrs"
      ></slot>

      <VeeForm v-else class="c-form__container" ref="validationForm" as="div">
        <FormItem
          v-for="(formItem, index) in attrs.formItems || []"
          :key="index"
          :c="setInner(formItem)"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </FormItem>
      </VeeForm>
    </template>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { FormAdapter, FormBindsOmitKeys, FORM_DEFAULT } from './form.adapter'
import { ElForm } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useForm } from './form.use'
import { Form } from 'vee-validate'
import { FormItem } from '../form-item'

export default defineComponent({
  name: COMPONENT_NAME.form,
  inheritAttrs: false,
  components: { ElForm, VeeForm: Form, FormItem: FormItem },
  emits: ['output-change'],
  props: {
    c: {
      type: Object as PropType<FormAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.form

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<FormAdapter>({
      props,
      defaultOption: FORM_DEFAULT,
      type,
      omitKeys: FormBindsOmitKeys
    })

    /** 组件输出 */
    const { output, state } = useForm({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName, setInner } = useCommonSetup({ attrs, output })
    return { attrs, binds, computedSlotName, setInner, ...toRefs(state) }
  }
})
</script>
