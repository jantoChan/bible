import Vue from 'vue'
import ElementUI  from 'element-ui'
import App from './Admin.vue'
import 'element-ui/lib/theme-default/index.css'
import './main.scss'
Vue.use(ElementUI)

import VueRouter from 'vue-router'
const tagManage = resolve => require(["components/admin/tag/index.vue"], resolve)
const tagDetail = resolve => require(["components/admin/tag/detail.vue"], resolve)
const fileManage = resolve => require(["components/admin/file/index.vue"], resolve)
const articleEdit = resolve => require(["components/admin/article/edit.vue"], resolve)
const articlePreview = resolve => require(["components/admin/article/preview.vue"], resolve)
const Login = resolve => require(["components/admin/login/index.vue"], resolve)

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin/tag',
      name: 'tag',
      component: tagManage
    },
    {
      path: '/admin/tag/detail/:id',
      name: 'tagDetail',
      component: tagDetail
    },
    {
      path: '/admin/file',
      name: 'file',
      component: fileManage
    },
    {
      path: '/admin/article/edit',
      name: 'articleEdit',
      component: articleEdit
    },
    {
      path: '/admin/article/preview',
      name: 'articlePreview',
      component: articlePreview
    }
  ]
})

new Vue({
    el: '#app',
    router,
    data() {
      return{
        content: {}
      }
    },
    mounted: function()  {
      var vm=this;
    },
    render: h => h(App)
})

