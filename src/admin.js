import Vue from 'vue'
import { Button, Input } from 'element-ui'
import App from './Admin.vue'
import 'element-ui/lib/theme-default/index.css'

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)

import VueRouter from 'vue-router'
import Home from "./components/exhibition/home/index.vue"
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

