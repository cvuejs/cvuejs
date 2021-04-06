import { COMPONENT_TYPE } from '../../utils/constants/component';
import { OptionAdapter } from './option.adapter'
import Option from './option.vue'
import { App } from 'vue'
import { setComponentConfig } from '../../utils/config'

Option.install = (app: App, opt: OptionAdapter) => {
  setComponentConfig(COMPONENT_TYPE.option, opt)
  app.component(Option.name, Option)
}

export { Option }
