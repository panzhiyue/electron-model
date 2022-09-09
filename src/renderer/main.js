import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Directive from './directives/index'
import { createPinia } from 'pinia'
import 'windi.css'

const sotre = createPinia()

createApp(App).use(router).use(Directive).use(sotre).mount('#app')
