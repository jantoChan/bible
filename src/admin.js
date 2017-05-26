import Vue from 'vue'
import ElementUI  from 'element-ui'
import App from './Admin.vue'
import 'element-ui/lib/theme-default/index.css'
import './main.scss'
Vue.use(ElementUI)

import VueRouter from 'vue-router'
import tagManage from "./components/admin/tag/index.vue"
import fileManage from "./components/admin/file/index.vue"
import articleEdit from "./components/admin/article/edit.vue"
import Login from "./components/admin/login/index.vue"

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

