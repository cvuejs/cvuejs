<template>
  <el-button class="c-button" :ref="$options.name" v-bind="attrs">{{
    attrs.text
  }}</el-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ButtonAdapter, BUTTON_DEFAULT } from './adapter'
import { ElButton } from 'element-plus'
import { originalProps } from './attrs'
import { useAttrs } from '../../utils/setups/useAttrs'

export default defineComponent({
  name: 'CButton',
  components: { ElButton },
  props: {
    c: {
      type: Object as PropType<ButtonAdapter>,
      default: () => ({})
    },
    n: {
      type: String
    },
    ...originalProps
  },
  setup(props) {
    const { attrs } = useAttrs(props, BUTTON_DEFAULT)
    return { attrs }
  }
})
</script>
