import { createApp } from 'vue'
import cvue from '@cvue/element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/lib/theme-chalk/index.css'
import { HttpConfig } from '@cvue/http'
import * as MockData from '../_mock'

const app = createApp(App)

HttpConfig({
  mock: {
    data: MockData
  }
})

app
  .use(store)
  .use(router)
  .use(cvue)
  .mount('#app')
