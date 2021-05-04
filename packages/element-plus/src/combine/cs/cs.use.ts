import { emit } from './../../utils/service/provider.service'
import { FormItemAdapter } from './../../base/form-item/form-item.adapter'
import { ButtonGroupAdapter } from './../../base/button-group/button-group.adapter'
import { CsAdapter, CsOutput } from './cs.adapter'
import { computed, ComputedRef, getCurrentInstance, reactive } from 'vue'
import { FormOutput } from '../../base/form/form.adapter'
import { useOutputChange } from '../../utils/hooks/useOutputChange'

interface UseCsOpt {
  attrs: ComputedRef<CsAdapter>
}

export interface CsState {
  formOutput: Partial<FormOutput>
  buttonGroup: ButtonGroupAdapter
}

export const useCs = ({ attrs }: UseCsOpt) => {
  const instance = getCurrentInstance()!
  const state = reactive<CsState>({
    formOutput: {},
    buttonGroup: {
      buttons: [
        {
          text: '查询',
          icon: 'el-icon-search',
          type: 'primary',
          onClick() {
            const models = (attrs.value.form && attrs.value.form.models) || {}
            emit(
              { type: 'ct-setParams', name: attrs.value.n || '' },
              (params) => {
                return _.pickBy(
                  _.assign(params, models),
                  (v) => !_.isUndefined(v) && !_.isNull(v) && v !== ''
                )
              }
            )
            emit({ type: 'ct-setPageNo', name: attrs.value.n || '' }, 1)
            emit({ type: 'ct-update', name: attrs.value.n || '' })
            _.isFunction(attrs.value.onSearch) && onSearch(models)
          }
        },
        {
          text: '重置',
          icon: 'el-icon-delete',
          onClick() {
            state.formOutput.reset && state.formOutput.reset()
          }
        }
      ]
    }
  })

  setButtonGroup()

  const { onOutputChange } = useOutputChange(state)

  const output = computed<CsOutput>(() => ({
    ...(state.formOutput as FormOutput)
  }))
  return { output, state, onOutputChange }

  function setButtonGroup() {
    const items = attrs.value.form!.formItems
    const addItem: FormItemAdapter = {
      type: 'slot',
      slot: {
        name: 'csButtonGroup'
      }
    }
    if (items) {
      items.push(addItem)
    } else {
      attrs.value.form!.formItems = [addItem]
    }

    if (attrs.value.buttonGroup) {
      _.defaultsDeepSafe(state.buttonGroup, attrs.value.buttonGroup)
    }
  }
  function onSearch(params: Record<string, any>) {
    attrs.value.onSearch!(params, {
      attrs: attrs.value,
      output: output.value,
      instance
    })
  }
}
