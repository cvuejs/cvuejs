import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { DialogAdapter, DialogOutput } from './dialog.adapter'

export interface DialogProps {
  appendToBody: boolean
  beforeClose: (done: () => unknown) => unknown
  destroyOnClose: boolean
  center: boolean
  customClass: string
  closeOnClickModal: boolean
  closeOnPressEscape: boolean
  fullscreen: boolean
  lockScroll: boolean
  modal: boolean
  showClose: boolean
  title: string
  openDelay: number
  closeDelay: number
  top: string
  modelValue: boolean
  modalClass: string
  width: string
  zIndex: number
}

export interface DialogEvents {
  onOpen(
    componentData: ComponentCallbackInjectParam<DialogAdapter, DialogOutput>
  ): unknown
  onOpened(
    componentData: ComponentCallbackInjectParam<DialogAdapter, DialogOutput>
  ): unknown
  onClose(
    componentData: ComponentCallbackInjectParam<DialogAdapter, DialogOutput>
  ): unknown
  onClosed(
    componentData: ComponentCallbackInjectParam<DialogAdapter, DialogOutput>
  ): unknown
}

export type DialogSlots = 'default' | 'title' | 'footer'
