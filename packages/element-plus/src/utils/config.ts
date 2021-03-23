import { COMPONENT_TYPE } from './constants/component'
import { ButtonAdapter } from './../base/button/adapter'
import _ from 'lodash'

export interface CvueOptions  {
  [COMPONENT_TYPE.button]?: ButtonAdapter
}

const $CVUE = {} as CvueOptions

const setConfig = (option: CvueOptions) => {
  _.assign($CVUE, option)
}

const setComponentConfig = (
  key: keyof CvueOptions,
  option: CvueOptions[keyof CvueOptions]
): void => {
  $CVUE[key] = option
}

const getConfig = (key: keyof CvueOptions) => {
  return $CVUE[key]
}

export { getConfig, setConfig, setComponentConfig }
