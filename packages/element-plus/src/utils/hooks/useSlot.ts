import { getCurrentInstance } from '@vue/runtime-core'
import { ComputedRef } from 'vue'

interface UseSlotOpt {
  attrs: ComputedRef<Record<string, any>>
}

export const useSlot = ({ attrs }: UseSlotOpt) => {
  const instance = getCurrentInstance()

  /**
   * 计算slot的名称
   * 
   */
  const computedSlotName = (slotName: string) => {
    const customSlotName = attrs.value.slotAlias && attrs.value.slotAlias[slotName]
    const hasCustomSlot = customSlotName && instance!.proxy!.$slots[customSlotName]

    const defaultSlotName = slotName
    const hasDefaultSlot = instance!.slots[slotName]
    return hasCustomSlot
      ? customSlotName
      : hasDefaultSlot
      ? defaultSlotName
      : ''
  }

  return {
    computedSlotName
  }
}
