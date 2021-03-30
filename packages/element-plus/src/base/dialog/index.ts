import { COMPONENT_TYPE } from '../../utils/constants/component';
import { DialogAdapter } from './dialog.adapter'
import Dialog from './dialog.vue'
import { App } from 'vue'
import { setComponentConfig } from '../../utils/config'

Dialog.install = (app: App, opt: DialogAdapter) => {
  setComponentConfig(COMPONENT_TYPE.dialog, opt)
  app.component(Dialog.name, Dialog)
}

export { Dialog }
