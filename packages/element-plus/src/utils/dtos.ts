import {
  CommonAdapter,
  ComponentCallbackInjectParam
} from '@cvue/shared/dtos/common'
import { ComponentInternalInstance } from 'vue'

export type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export interface VLoading {
  text?: string
  spinner?: string // 加载图案字体
  background?: string
}

export interface ElCommonAdapter<T, M, S extends string>
  extends CommonAdapter<T, S> {
  /** setup执行时的回调 */
  onSetup?(data: {
    attrs: T
    output: M
    instance: ComponentInternalInstance | null
  }): void
}

export interface ElFormCtrlCommonAdapter<T, M, S extends string>
  extends ElCommonAdapter<T, M, S> {
  onModelChange?(
    value: any,
    oldValue: any,
    componentData: ComponentCallbackInjectParam<T, M>
  ): unknown
}

// export interface VeeValidateConfi
export interface ValidateResult {
  valid: boolean
  errors: Record<string, string>
}
