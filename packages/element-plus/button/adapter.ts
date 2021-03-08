import { ElButton } from 'element-ui/types/button'
import { CoreAdapter, CoreOutput } from '../../dtos/core.dto'

type OmitKeys = ''
type ElButtonAdapter = Omit<Partial<ElButton>, OmitKeys>

export interface ButtonAdapter extends ElButtonAdapter, CoreAdapter<ElButton> {
  on?: {}
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonOutput extends CoreOutput {}

export const BUTTON_DEFAULT: ButtonAdapter = {}
