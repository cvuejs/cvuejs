import { emit, reveice } from './src/utils/service/provider.service'
import { CvueOptions, setConfig } from './src/utils/config'
import './src/utils/lodash'
import { App } from 'vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './src/utils/vee-validate'

import * as Base from './src/base'
import * as Combine from './src/combine'
export * from './src/base'
export * from './src/combine'

const components = [..._.values(Base), ..._.values(Combine)]

const install = function(app: App, opt: CvueOptions) {
  setConfig(opt)
  app.use(ElementPlus, { locale })
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export { install, emit, reveice }
export default {
  install
}
