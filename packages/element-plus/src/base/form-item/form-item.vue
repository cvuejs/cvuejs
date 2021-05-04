<template>
  <Field
    class="c-form-item"
    :name="attrs.validateFieldName || attrs.label || ''"
    :rules="attrs.rules || ''"
    v-slot="{ errors }"
    v-model="formAttrs.models[attrs.prop]"
  >
    <el-form-item
      :ref="$options.name"
      :style="{ width: attrs.width || formAttrs.itemWidth }"
      v-bind="binds"
      :class="{
        'c-form-item__item': true,
        [attrs.className || '']: true,
        'is-required': isRequired,
        'is-error': errors[0],
        [`is-content-${align}`]: align
      }"
    >
      <template #default>
        <Input
          v-if="!attrs.type || attrs.type === 'input'"
          :class="[attrs.formControlClassName]"
          :c="setInner(attrs.input)"
          v-model="formAttrs.models[attrs.prop]"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </Input>

        <Select
          v-else-if="attrs.type === 'select'"
          :class="[attrs.formControlClassName]"
          :c="setInner(attrs.select)"
          v-model="formAttrs.models[attrs.prop]"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </Select>

        <DatePicker
          v-else-if="attrs.type === 'date-picker'"
          :class="[attrs.formControlClassName]"
          :c="setInner(attrs.datePicker)"
          v-model="formAttrs.models[attrs.prop]"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </DatePicker>

        <TimePicker
          v-else-if="attrs.type === 'time-picker'"
          :class="[attrs.formControlClassName]"
          :c="setInner(attrs.timePicker)"
          v-model="formAttrs.models[attrs.prop]"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </TimePicker>

        <Checkbox
          v-else-if="attrs.type === 'checkbox'"
          :class="[attrs.formControlClassName]"
          :c="setInner(attrs.checkbox)"
          v-model="formAttrs.models[attrs.prop]"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </Checkbox>

        <CheckboxGroup
          v-else-if="attrs.type === 'checkbox-group'"
          :class="[attrs.formControlClassName]"
          :c="setInner(attrs.checkboxGroup)"
          v-model="formAttrs.models[attrs.prop]"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </CheckboxGroup>

        <Radio
          v-else-if="attrs.type === 'radio'"
          :class="[attrs.formControlClassName]"
          :c="setInner(attrs.radio)"
          v-model="formAttrs.models[attrs.prop]"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </Radio>

        <RadioGroup
          v-else-if="attrs.type === 'radio-group'"
          :class="[attrs.formControlClassName]"
          :c="setInner(attrs.radioGroup)"
          v-model="formAttrs.models[attrs.prop]"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </RadioGroup>

        <Upload
          v-else-if="attrs.type === 'upload'"
          :class="[attrs.formControlClassName]"
          :c="setInner(attrs.upload)"
          v-model="formAttrs.models[attrs.prop]"
        >
          <template v-for="(_, slot) in $slots" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </Upload>

        <div v-else-if="attrs.type === 'div'">
          {{ formAttrs.models[attrs.prop] }}
        </div>

        <template v-else-if="attrs.type === 'empty'"></template>

        <slot
          v-else-if="attrs.type === 'slot'"
          :name="slotConfig.name"
          :scope="slotConfig.scope"
        ></slot>

        <span class="c-form-item__error">{{ errors[0] }}</span>
        <span v-if="!errors[0] && attrs.tip" class="c-form-item__tip">
          {{ attrs.tip }}
        </span>
      </template>

      <template v-if="computedSlotName('label')" #label>
        <slot :name="computedSlotName('label')" :attrs="attrs"></slot>
      </template>
    </el-form-item>
  </Field>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import {
  FormItemAdapter,
  FormItemBindsOmitKeys,
  FORM_ITEM_DEFAULT
} from './form-item.adapter'
import { ElFormItem } from 'element-plus'
import { COMPONENT_NAME, COMPONENT_TYPE } from '../../utils/constants/component'
import { useProvider } from '../../utils/hooks/useProvider'
import { useCommonSetup } from '../../utils/hooks/useCommonSetup'
import { useComputeAttrs } from '../../utils/hooks/useComputeAttrs'
import { useFormItem } from './form-item.use'
import { Field } from 'vee-validate'
import { Input } from '../input'
import { Select } from '../select'
import { DatePicker } from '../date-picker'
import { TimePicker } from '../time-picker'
import { Checkbox } from '../checkbox'
import { CheckboxGroup } from '../checkbox-group'
import { Radio } from '../radio'
import { RadioGroup } from '../radio-group'
import { Upload } from '../upload'

export default defineComponent({
  name: COMPONENT_NAME.formItem,
  inheritAttrs: false,
  components: {
    ElFormItem,
    Field,
    Input,
    Select,
    DatePicker,
    TimePicker,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Upload
  },
  emits: ['output-change'],
  props: {
    c: {
      type: Object as PropType<FormItemAdapter>,
      default: () => reactive({})
    },
    n: {
      type: String
    }
  },
  setup(props, ctx) {
    const type = COMPONENT_TYPE.formItem

    /** 合并配置，获取attrs */
    const { attrs, binds } = useComputeAttrs<FormItemAdapter>({
      props,
      defaultOption: FORM_ITEM_DEFAULT,
      type,
      omitKeys: FormItemBindsOmitKeys
    })

    /** 组件输出 */
    const { output, formAttrs, state } = useFormItem({ attrs })

    /** 注册、注销组件 */
    useProvider({ attrs, output, type, ctx })

    /** 组件通用setup */
    const { computedSlotName, setInner } = useCommonSetup({ attrs, output })
    return {
      attrs,
      binds,
      computedSlotName,
      setInner,
      formAttrs,
      ...toRefs(state)
    }
  }
})
</script>
