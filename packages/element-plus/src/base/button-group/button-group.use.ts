import { ButtonGroupAdapter } from './button-group.adapter'
import { computed, ComputedRef, getCurrentInstance, onMounted } from 'vue'
import { removeClass } from '@cvue/shared/utils/dom/class'

interface UseButtonGroupOpt {
  attrs: ComputedRef<ButtonGroupAdapter>
}

export const useButtonGroup = ({ attrs }: UseButtonGroupOpt) => {
  const instance = getCurrentInstance()

  /**
   * isGroup
   */
  onMounted(() => {
    !attrs.value.isGroup &&
      removeClass(instance!.vnode.el as HTMLElement, 'el-button-group')
  })

  const output = computed(() => ({}))
  return output
}
