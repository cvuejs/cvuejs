import { COMPONENT_NAME } from './../../utils/constants/component'
import {
  DialogAdapter,
  DialogButtonAdapter,
  DialogButtonGroupAdapter
} from './dialog.adapter'
import {
  computed,
  ComputedRef,
  getCurrentInstance,
  onMounted,
  Ref,
  ref
} from 'vue'

interface UseDialogOpt {
  attrs: ComputedRef<DialogAdapter>
}

export const useDialog = ({ attrs }: UseDialogOpt) => {
  const instance = getCurrentInstance()
  const preload: Ref<any> = ref(null)

  const footerButtonGroup = computed<DialogButtonGroupAdapter>(() => {
    const CLOSE_BUTTON: DialogButtonAdapter = {
      text: '关闭',
      onClick() {
        close(false)
      }
    }
    if (!attrs.value.footerButtonGroup) return { buttons: [CLOSE_BUTTON] }
    const buttons = attrs.value.footerButtonGroup.buttons || [CLOSE_BUTTON]
    return {
      ...attrs.value.footerButtonGroup,
      buttons: buttons.map((button) => {
        if (button.tag === 'close') {
          _.defaultsDeepSafe(button, CLOSE_BUTTON)
        }
        return button
      })
    }
  })

  const output = computed(() => ({ open, close }))

  onMounted(() => {
    const el = instance!.refs[COMPONENT_NAME.dialog] as Record<string, any>
    console.log(el)
    if (!el || !el.$refs) return
    el.$refs.dialogRef.style.minWidth = attrs.value.minWidth
  })

  return { output, preload, footerButtonGroup }

  function open(data?: any) {
    preload.value = data
    attrs.value.modelValue = true
  }

  function close(data?: any) {
    preload.value = data
    attrs.value.modelValue = false
  }
}
