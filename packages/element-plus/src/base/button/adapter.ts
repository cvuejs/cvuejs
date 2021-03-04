import { CommonAdapter } from '@cvue/shared/dtos/common'
import { ButtonProps } from './props'

export interface ButtonAdapter extends Partial<ButtonProps>, CommonAdapter {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonOutput {}

export const BUTTON_DEFAULT: ButtonAdapter = {}
