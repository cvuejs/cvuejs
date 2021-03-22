import { CommonAdapter } from '@cvue/shared/dtos/common'
import { ButtonEvents, ButtonProps } from './attrs'

export interface ButtonAdapter
  extends Partial<ButtonProps & ButtonEvents & CommonAdapter> {
  /** 按钮文字 */
  text?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonOutput {}

export const BUTTON_DEFAULT: ButtonAdapter = {}
