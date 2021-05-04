import { ElFormCtrlCommonAdapter } from '../../utils/dtos'
import {
  UploadEvents,
  UploadFile,
  UploadProps,
  UploadSlots
} from './upload.attrs'

export const UploadBindsOmitKeys: (keyof UploadAdapter)[] = []
export interface UploadAdapter
  extends Partial<
    UploadProps &
      UploadEvents &
      ElFormCtrlCommonAdapter<UploadAdapter, UploadOutput, UploadSlots>
  > {}

export interface UploadOutput {
  clearFiles(): unknown
  abort(file: UploadFile): unknown
  submit(): unknown
}

export const UPLOAD_DEFAULT: UploadAdapter = {}
