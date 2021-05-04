import { COMPONENT_TYPE } from '../../utils/constants/component';
import { CeAdapter } from './ce.adapter'
import Ce from './ce.vue'
import { App } from 'vue'
import { setComponentConfig } from '../../utils/config'

Ce.install = (app: App, opt: CeAdapter) => {
  setComponentConfig(COMPONENT_TYPE.ce, opt)
  app.component(Ce.name, Ce)
}

export { Ce }
