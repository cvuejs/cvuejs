import { cvueOpt } from './config'
import { createApp } from 'vue'
import cvue from '@cvue/element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(cvue, cvueOpt)
  .mount('#app')
