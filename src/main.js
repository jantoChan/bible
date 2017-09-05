import Vue from 'vue'
import ElementUI  from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'

Vue.use(ElementUI)

import VueRouter from 'vue-router';
const Home = resolve => require(["components/exhibition/home/index.vue"], resolve)
const File = resolve => require(["components/exhibition/file/index.vue"], resolve)
const About = resolve => require(["components/exhibition/about/index.vue"], resolve)
const Article = resolve => require(["components/exhibition/article/index.vue"], resolve)
const tagManage = resolve => require(["components/exhibition/tag/manage.vue"], resolve) 
const tagDetail = resolve => require(["components/exhibition/tag/detail.vue"], resolve) 

Vue.use(VueRouter)
var router = new VueRouter({
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
    },
    {
      path: '/tag',
      name: 'tag',
      component: tagManage
    },
    {
      path: '/tag/detail',
      name: 'tagDetail',
      component: tagDetail
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    }
  ]
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

