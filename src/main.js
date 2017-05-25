import Vue from 'vue'
import ElementUI  from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'

Vue.use(ElementUI)

import VueRouter from 'vue-router';
import Home from "./components/exhibition/home/index.vue";
import File from "./components/exhibition/file/index.vue";
import Tag from "./components/exhibition/tag/index.vue";
import About from "./components/exhibition/about/index.vue";

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

