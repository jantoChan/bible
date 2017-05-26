import Vue from 'vue'
import ElementUI  from 'element-ui'
import App from './Admin.vue'
import 'element-ui/lib/theme-default/index.css'
import './main.scss'
Vue.use(ElementUI)

import VueRouter from 'vue-router'
const tagManage = resolve => require(["./components/admin/tag/index.vue"], resolve)
const fileManage = resolve => require(["./components/admin/file/index.vue"], resolve)
const articleEdit = resolve => require(["./components/admin/article/edit.vue"], resolve)
const Login = resolve => require(["./components/admin/login/index.vue"], resolve)

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
      path: '/admin/file',
      name: 'file',
      component: fileManage
    },
    {
      path: '/admin/article/edit',
      name: 'articleEdit',
      component: articleEdit
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
      var dom=document.getElementById('editor');
      if (!dom) {
        return false;
      }
      hljs.initHighlightingOnLoad();
      var smde = new SimpleMDE({
            element: dom,
            autofocus: true,
            autosave: true,
            showIcons: ["code", "table"],
            hideIcons: ["fullscreen", "guide"],
            previewRender: function(plainText) {
                return marked(plainText,{
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        return hljs.highlightAuto(code).value;
                    }
                });
            },
        });
        smde.codemirror.on("change", function(){
            var value = smde.value();
            console.log(value);
            vm.content = value;
        });
    },
    render: h => h(App)
})

