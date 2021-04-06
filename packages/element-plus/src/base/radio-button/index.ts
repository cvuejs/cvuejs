import { COMPONENT_TYPE } from '../../utils/constants/component';
import { RadioButtonAdapter } from './radio-button.adapter'
import RadioButton from './radio-button.vue'
import { App } from 'vue'
import { setComponentConfig } from '../../utils/config'

RadioButton.install = (app: App, opt: RadioButtonAdapter) => {
  setComponentConfig(COMPONENT_TYPE.radioButton, opt)
  app.component(RadioButton.name, RadioButton)
}

export { RadioButton }
