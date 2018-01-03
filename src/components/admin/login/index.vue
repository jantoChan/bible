<template>
  <div class="login" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="login__logo">
     <pacman-loader :loading="loading" :color="color"></pacman-loader>
    </div>
    <el-input
      placeholder="Username"
      icon="password icon-personal-center iconfont"
      v-model="username"
      class="g-mb20 login__input">
    </el-input>
    <el-input
      placeholder="Password"
      icon="password icon-password iconfont"
      v-model="password"
      class="g-mb20 login__input">
    </el-input>
    <a href="javascript:;">
      <el-button
       :loading="is_loading"
       class="btn login__btn g-mb20">登录</el-button>
    </a>
    <a :href="identity_url" @click="setLoading">
     <el-button class="btn login__btn">
       <i class="iconfont">&#xe69f;</i>
     </el-button>
    </a>
  </div>
</template>

<style lang="scss">
  @import "./index.scss"
</style>

<script>
    import PacmanLoader from "../../loading/pacman.vue"
    import axios from 'axios'
    import store from 'src/store/store'
    import * as types from 'src/store/types'

    export default {
        name: "Login",
        data() {
          return {
            fullscreenLoading: false,
            is_loading: false,
            username: '',
            password: '',
            loading: true,
            color: '#bfcbd9',
            identity_url: '/oauth/github/login'
          }
        },
        created() {
          let vm= this;
          // console.log(vm.$route.query);
          // this.getToken();
        },
        methods: {
            getToken() {
              var vm= this;
              vm.code=vm.$route.query.code;
              if (!vm.code) {
                return false;
              }
              axios.post('/oauth/github/callback', {
                  code: vm.code
                })
                .then(function (response) {
                  vm.is_loading= false;
                  if (!response.data.error) {
                    vm.$store.commit(types.LOGIN, response.data.access_token);
                    if (vm.$route.query && vm.route.query.redirect) {
                      vm.$router.push({ pate: vm.route.query.redirect});
                    }else{
                      vm.$router.push({ path: '/admin'});
                    }
                  }
                })
                .catch(function (error) {
                  console.error(error);
                });
            },
            getCode() {
              location.href="https://github.com/login/oauth/authorize?client_id=574b4707eb7c5011c7e0";
            },
            oauthHandler() {
              var vm= this;
              axios.get('/api/github/login')
                .then(function (response) {
                  vm.is_loading= false;
                  // vm.$router.push({ path: '/admin'});
                })
                .catch(function (error) {
                  console.error(error);
                });
            },
            setLoading() {
              this.fullscreenLoading= true;
            }
        },
        components: {
          PacmanLoader
        }
    }
</script>

