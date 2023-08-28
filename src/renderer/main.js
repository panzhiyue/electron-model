import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Directive from './directives/index'
import { createPinia } from 'pinia'
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'windi.css'
import Vue2ol from '@gis-js/vue2ol'
import Vue2olExtend from '@gis-js/vue2ol-extend'

const sotre = createPinia()

createApp(App)
  .use(router)
  .use(Directive)
  .use(sotre)
  .use(AntD)
  .use(Vue2ol)
  .use(Vue2olExtend)
  .mount('#app')
