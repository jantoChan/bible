import Vue from 'vue'
import ElementUI  from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

import VueRouter from 'vue-router';
import Home from "./components/exhibition/home/index.vue";
import File from "./components/exhibition/file/index.vue";

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'home',
      component: Home
    },
    {
      path: '/file',
      name: 'file',
      component: File
    }
  ]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

