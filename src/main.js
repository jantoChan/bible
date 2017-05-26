import Vue from 'vue'
import ElementUI  from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'

Vue.use(ElementUI)

import VueRouter from 'vue-router';
const Home = resolve => require(["./components/exhibition/home/index.vue"], resolve)
const File = resolve => require(["./components/exhibition/file/index.vue"], resolve)
const Tag = resolve => require(["./components/exhibition/tag/index.vue"], resolve)
const About = resolve => require(["./components/exhibition/about/index.vue"], resolve)

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
      component: Tag
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

axios.get('/api/tags')
  .then(function (response) {
    console.log('success');
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

