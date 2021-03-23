import { CvueOptions, setConfig } from './src/utils/config'
import './src/utils/lodash'
import { App } from 'vue'
// import './src/utils/vee-validate'

import * as Base from './src/base'
// import * as Combine from './src/combine'
export * from './src/base'
export * from './src/combine'

const components = [..._.values(Base)]

const install = function(app: App, opt: CvueOptions) {
  setConfig(opt)
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export { install }
export default {
  install
}
