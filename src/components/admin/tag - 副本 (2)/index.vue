<template>
  <div class="login">
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
    <el-button class="login__btn" @click="handleLoginClick" :loading="is_loading">登录</el-button>
  </div>
</template>

<style lang="scss">
  @import "./index.scss"
</style>

<script>
    import PacmanLoader from "../../loading/pacman.vue"
    export default {
        name: "Login",
        data() {
          return {
            is_loading: false,
            username: '',
            password: '',
            loading: true
            color: '#bfcbd9',
          }
        },
        methods: {
          handleLoginClick(ev) {
            console.log(ev);
          }
        },
        components: {
          PacmanLoader
        }
    }
</script>

