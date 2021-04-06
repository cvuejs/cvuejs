import { COMPONENT_TYPE } from '../../utils/constants/component';
import { OptionGroupAdapter } from './option-group.adapter'
import OptionGroup from './option-group.vue'
import { App } from 'vue'
import { setComponentConfig } from '../../utils/config'

OptionGroup.install = (app: App, opt: OptionGroupAdapter) => {
  setComponentConfig(COMPONENT_TYPE.optionGroup, opt)
  app.component(OptionGroup.name, OptionGroup)
}

export { OptionGroup }
