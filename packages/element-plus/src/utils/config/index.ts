import { ButtonAdapter } from './../../base/button/adapter'
import _ from 'lodash'

export interface InstallOptions {
  button?: ButtonAdapter
}

const $CVUE = {} as InstallOptions

const setConfig = (option: InstallOptions) => {
  _.assign($CVUE, option)
}

const setComponentConfig = (
  key: keyof InstallOptions,
  option: InstallOptions[keyof InstallOptions]
): void => {
  $CVUE[key] = option
}

const getConfig = (key: keyof InstallOptions) => {
  return $CVUE[key]
}

export { getConfig, setConfig, setComponentConfig }
