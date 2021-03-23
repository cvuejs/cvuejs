<template>
  <el-button class="c-button" :ref="$options.name" v-bind="attrs">{{
    attrs.text
  }}</el-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ButtonAdapter, BUTTON_DEFAULT } from './adapter'
import { ElButton } from 'element-plus'
import { useAttrs } from '../../utils/setups/useAttrs'
import {
  COMPONENT_NAME,
  COMPONENT_TYPE
} from '../../utils/constants/component'

export default defineComponent({
  name: COMPONENT_NAME.button,
  components: { ElButton },
  props: {
    c: {
      type: Object as PropType<ButtonAdapter>,
      default: () => ({})
    },
    n: {
      type: String
    }
  },
  setup(props) {
    const { attrs } = useAttrs(props, BUTTON_DEFAULT, COMPONENT_TYPE.button)
    return { attrs }
  }
})
</script>
