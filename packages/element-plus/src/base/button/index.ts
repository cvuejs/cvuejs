import { ButtonAdapter } from './adapter'
import Button from './button.vue'
import { App } from 'vue'
import { setComponentConfig } from '../../utils/config'

Button.install = (app: App, opt: ButtonAdapter) => {
  setComponentConfig('button', opt)
  app.component(Button.name, Button)
}

export { Button }
