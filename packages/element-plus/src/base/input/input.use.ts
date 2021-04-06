import { InputAdapter } from './input.adapter'
import { computed, ComputedRef, getCurrentInstance, SetupContext } from 'vue'
import { useModelValue } from '../../utils/hooks/useModelValue'
import { COMPONENT_NAME } from '../../utils/constants/component'

interface UseInputOpt {
  props: Record<string, any>
  attrs: ComputedRef<InputAdapter>
  ctx: SetupContext<any>
}

export const useInput = ({ props, attrs, ctx }: UseInputOpt) => {
  const instance = getCurrentInstance()

  useModelValue({ props, attrs, ctx })

  function focus() {
    const input = instance!.refs[COMPONENT_NAME.input] as any
    input && input.focus()
  }
  function blur() {
    const input = instance!.refs[COMPONENT_NAME.input] as any
    input && input.blur()
  }
  function select() {
    const input = instance!.refs[COMPONENT_NAME.input] as any
    input && input.select()
  }

  const output = computed(() => ({
    focus,
    blur,
    select
  }))
  return { output }
}
