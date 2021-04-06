import { COMPONENT_TYPE } from '../../utils/constants/component';
import { CheckboxButtonAdapter } from './checkbox-button.adapter'
import CheckboxButton from './checkbox-button.vue'
import { App } from 'vue'
import { setComponentConfig } from '../../utils/config'

CheckboxButton.install = (app: App, opt: CheckboxButtonAdapter) => {
  setComponentConfig(COMPONENT_TYPE.checkboxButton, opt)
  app.component(CheckboxButton.name, CheckboxButton)
}

export { CheckboxButton }
