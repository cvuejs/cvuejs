import {
  DialogAdapter,
  DialogButtonAdapter,
  DialogOutput
} from './../../base/dialog/dialog.adapter'
import { FormOutput } from './../../base/form/form.adapter'
import { CeAdapter, CeOutput } from './ce.adapter'
import {
  computed,
  ComputedRef,
  getCurrentInstance,
  nextTick,
  reactive
} from 'vue'
import { useOutputChange } from '../../utils/hooks/useOutputChange'
import { emit } from '../../utils/service/provider.service'

interface UseCeOpt {
  attrs: ComputedRef<CeAdapter>
}

export interface CeState {
  dialogOutput: Partial<DialogOutput>
  formOutput: Partial<FormOutput>
  dialog: ComputedRef<DialogAdapter>
}

export const useCe = ({ attrs }: UseCeOpt) => {
  const instance = getCurrentInstance()!

  const state = reactive<CeState>({
    dialogOutput: {},
    formOutput: {},
    dialog: computed(() => {
      const SUBMIT_BUTTON: DialogButtonAdapter = {
        text: '提交',
        n: 'ceSubmitButton',
        type: 'primary',
        async onClick(err, { output }) {
          output.loading()
          const { e } = await new Promise((resolve) =>
            state.formOutput.submit!(resolve)
          )
          output.loading(false)
          if (!e) {
            dialogClose()
            emit({ type: 'ct-update', name: attrs.value.n || '' })
          }
        }
      }
      const DEFAULT_BUTTONS = [SUBMIT_BUTTON, { tag: 'close' }]
      if (!attrs.value.dialog)
        return {
          onClosed() {
            reset()
          },
          footerButtonGroup: { buttons: DEFAULT_BUTTONS }
        }
      const footerButtonGroup = attrs.value.dialog.footerButtonGroup || {}
      const buttons = footerButtonGroup.buttons || DEFAULT_BUTTONS
      _.defaults(attrs.value.dialog, {
        onClosed() {
          reset()
        }
      })
      _.assign(attrs.value.dialog, {
        footerButtonGroup: {
          ...footerButtonGroup,
          buttons: buttons.map((button) => {
            if (button.tag === 'submit') {
              _.defaultsDeepSafe(button, SUBMIT_BUTTON)
            }
            return button
          })
        }
      })
      return attrs.value.dialog
    })
  })

  const output = computed<CeOutput>(() => {
    return {
      ...(state.dialogOutput as DialogOutput),
      ...(state.formOutput as FormOutput),
      open: dialogOpen
    }
  })

  const { onOutputChange } = useOutputChange(state)

  return { output, onOutputChange, state }

  function dialogClose(preload?: any) {
    state.dialogOutput.close && state.dialogOutput.close(preload)
  }
  function dialogOpen(preload?: any) {
    if (attrs.value.form && _.isPlainObject(preload)) {
      /** 防止form models初始化有值 */
      nextTick(() => attrs.value.form!.models = preload)
    }
    state.dialogOutput.open && state.dialogOutput.open(preload)
  }
  function reset() {
    emit({ type: 'button-loading', name: 'ceSubmitButton' }, false)
    state.formOutput.reset && state.formOutput.reset()
  }
}
