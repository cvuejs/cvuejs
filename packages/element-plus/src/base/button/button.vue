<template>
  <el-button class="c-button" :ref="$options.name" v-bind="attrs">{{
    attrs.text
  }}</el-button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ButtonAdapter, BUTTON_DEFAULT } from './adapter'
import { ElButton } from 'element-plus'
import { originalProps } from './props'
import _ from 'lodash'

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
  setup(props, ctx) {
    const attrs = computed(() => {
    return _(props.c)
      .defaultsDeepSafe(BUTTON_DEFAULT)
      .value()
  })
    console.log(ctx)
    return {
      attrs
    }
  }
})
</script>
