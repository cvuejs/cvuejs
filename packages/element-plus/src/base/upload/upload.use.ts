import { COMPONENT_NAME } from './../../utils/constants/component'
import { UploadAdapter, UploadOutput } from './upload.adapter'
import {
  computed,
  ComputedRef,
  SetupContext,
  reactive,
  getCurrentInstance
} from 'vue'
import { useModelValue } from '../../utils/hooks/useModelValue'

interface UseUploadOpt {
  props: Record<string, any>
  attrs: ComputedRef<UploadAdapter>
  ctx: SetupContext<any>
}
interface UploadState {}

export const useUpload = ({ props, attrs, ctx }: UseUploadOpt) => {
  const instance = getCurrentInstance()
  const state = reactive<UploadState>({})
  const uploadRef = computed(() => instance!.refs[COMPONENT_NAME.upload] as any)

  useModelValue({ props, attrs, ctx })

  const output = computed<UploadOutput>(() => ({
    clearFiles() {
      _.isFunction(uploadRef.value.clearFiles) && uploadRef.value.clearFiles()
    },
    abort() {
      _.isFunction(uploadRef.value.abort) && uploadRef.value.abort()
    },
    submit() {
      _.isFunction(uploadRef.value.submit) && uploadRef.value.submit()
    }
  }))
  return { output, state }
}
