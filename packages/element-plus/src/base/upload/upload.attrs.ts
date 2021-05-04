import { ComponentCallbackInjectParam } from '@cvue/shared/dtos/common'
import { UploadAdapter, UploadOutput } from './upload.adapter'

type ListType = 'text' | 'picture' | 'picture-card'
type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
export type UploadFile = {
  name: string
  percentage?: number
  status: UploadStatus
  size: number
  response?: unknown
  uid: number
  url?: string
  raw: ElFile
}
type UploadComponentData = ComponentCallbackInjectParam<
  UploadAdapter,
  UploadOutput
>
interface ElFile extends File {
  uid: number
}
type FileHandler<T = void> = (
  file: UploadFile,
  uploadFiles: UploadFile[],
  componentData: UploadComponentData
) => T
type FileResultHandler<T = any> = (
  param: T,
  file: UploadFile,
  uploadFiles: UploadFile[],
  componentData: UploadComponentData
) => void

export interface UploadProps {
  action: string
  headers: Headers
  data: Record<string, any>
  multiple: boolean
  name: string
  drag: boolean
  withCredentials: boolean
  showFileList: boolean
  accept: string
  type: string
  beforeUpload: FileHandler<void>
  beforeRemove: FileHandler<boolean>
  fileList: UploadFile[]
  autoUpload: boolean
  listType: ListType
  httpRequest(...args: any[]): unknown
  disabled: boolean
  limit: number
}

export interface UploadEvents {
  onRemove: FileHandler<void>
  onChange: FileHandler<void>
  onPreview: (file: UploadFile, componentData: UploadComponentData) => void
  onSuccess: FileResultHandler
  onProgress: FileResultHandler<ProgressEvent>
  onError: FileResultHandler<Error>
  onExceed: FileHandler<void>
}

export type UploadSlots = 'default' | 'trigger' | 'tip'
