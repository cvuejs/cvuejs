import { ElCommonAdapter } from './../dtos'
import { ComputedRef } from 'vue'

export const useSetupCb = (
  attrs: ComputedRef<Partial<ElCommonAdapter<any, any>>>,
  output: Readonly<Record<string, any>>
) => {
  attrs.value.onSetup && attrs.value.onSetup(attrs, output)
}
