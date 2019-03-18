import Vue from 'vue'
import axios from './http'
import store from './store/store'
import * as types from './store/types'
import ElementUI  from 'element-ui'
import App from './Admin.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './main.scss'
import { mapState } from 'vuex'
Vue.use(ElementUI)
Vue.prototype.axios = axios;

new Vue({
    el: '#app',
    axios,
    router,
    store,
    data() {
      return{
        content: {}
      }
    },
    created() {
    },
    methods: {
      getToken() {
        let vm= this;
        axios.get('/api/github/access_token')
          .then(function (response) {
            if (!!response.data.status) {
              let responseDat= response.data.response;
              vm.$store.commit(types.LOGIN, responseDat.token);
            }else{
              vm.$router.push({
                path: '/admin/login'
              })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      route() {
        let vm= this;
        if (vm.route.query.redirect) {
          vm.$router.push({
            path: '/admin/login'
          })
        }
      }
    },
    render: h => h(App)
})

