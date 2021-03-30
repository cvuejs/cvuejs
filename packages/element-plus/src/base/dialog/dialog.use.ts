import { DialogAdapter } from './dialog.adapter'
import { computed, ComputedRef, Ref, ref } from 'vue'

interface UseDialogOpt {
  attrs: ComputedRef<DialogAdapter>
}

export const useDialog = ({ attrs }: UseDialogOpt) => {
  const preload: Ref<any> = ref(null)

  const open = (prelaod: any) => {
    preload.value = prelaod
    attrs.value.modelValue = true
  }

  const close = (prelaod: any) => {
    preload.value = prelaod
    attrs.value.modelValue = false
  }

  const output = computed(() => ({ open, close }))

  return { output, preload }
}
