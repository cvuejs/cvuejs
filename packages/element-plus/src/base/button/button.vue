<template>
  <el-button class="c-button" :ref="$options.name" v-bind="attrs">{{
    $options.name
  }}</el-button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, SetupContext } from 'vue'
import { ButtonAdapter } from './adapter'
import { ElButton } from 'element-plus'
import { originalProps } from './props'

function useGetBindAttrs(ctx: SetupContext<Record<string, any>>) {
  const attrs = computed(() => {
    return ctx.attrs
  })
  return {
    attrs
  }
}

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
    const { attrs } = useGetBindAttrs(ctx)
    console.log(ctx)
    return {
      attrs
    }
  }
})
</script>
