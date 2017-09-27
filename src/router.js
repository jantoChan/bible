import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import * as types from './store/types'
import Cookies from 'js-cookie'

const Home = resolve => require(["components/admin/home/index.vue"], resolve)
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
      path: '/admin',
      name: 'home',
      meta: {
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      }, 
      component: Home
    },
    {
      path: '/admin/tag',
      name: 'tag',
      meta: {
        requireAuth: true
      },
      component: tagManage
    },
    {
      path: '/admin/tag/detail/:id',
      name: 'tagDetail',
      meta: {
        requireAuth: true
      },
      component: tagDetail
    },
    {
      path: '/admin/file',
      name: 'file',
      meta: {
        requireAuth: true
      },
      component: fileManage
    },
    {
      path: '/admin/article/edit',
      name: 'articleEdit',
      meta: {
        requireAuth: true
      },
      component: articleEdit
    },
    {
      path: '/admin/article/preview',
      name: 'articlePreview',
      meta: {
        requireAuth: true
      },
      component: articlePreview
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (Cookies.get('access_token')) {  // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/admin/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})


export default router;