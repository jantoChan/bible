import Vue from 'vue'
import ElementUI  from 'element-ui'
import App from './Admin.vue'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

import VueRouter from 'vue-router'
import Login from "./components/admin/login/index.vue"
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      component: Login
    }
  ]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

