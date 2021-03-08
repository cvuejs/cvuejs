import CoreButton from './button.vue'
import { CoreVueConstructor } from '../../dtos/core.dto'

const Button = CoreButton as CoreVueConstructor
Button.install = (Vue) => {
  Vue.component(Button.options.name, Button)
}

export { Button }
