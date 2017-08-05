<template>
  <div id="app">
    <div class="main-cnt g-pt40">
      <div class="page-container page-component">
        <div class="nav-header">
            <div class="nav-header__icon" @click="is_nav = !is_nav">
              <i class="iconfont">&#xe696;</i>
            </div>
            <div class="nav-header__title">
              Janto
            </div>
        </div>
        <el-row :gutter="20">
          <el-col class="el-col el-col-24 el-col-xs-24 el-col-sm-6">
            <div class="user">
              <div class="user__head">
                <span class="user__head__img"></span>                
              </div>
              <div class="user__name">
                <span class="user__name__nick">janto-Chan</span>
                <p class="user__name__job">页面仔升级版</p>
              </div>
              <ul class="user__count">
                <li class="user__count__child">
                  <p class="user__count__txt">0</p>
                  <i class="iconfont">&#xe6a2;</i>
                </li>                   
                <li class="user__count__child">
                  <p class="user__count__txt">0</p>
                  <i class="iconfont">&#xe6c5;</i>
                </li>                   
                <li class="user__count__child">
                  <p class="user__count__txt">0</p>
                  <i class="iconfont">&#xe6c3;</i>
                </li>                   
              </ul>
              <transition name="el-zoom-in-top">
                <div class="nav" v-show="is_nav" @click="is_nav=false">
                  <router-link v-for="(item ,index) in router"  class="nav__item" v-text="item.name" :to="item.to"></router-link>
                </div>
              </transition>
            </div>
          </el-col>
          <el-col class="el-col el-col-24 el-col-xs-24 el-col-sm-18 contents">
            <router-view></router-view>
          </el-col>
        </el-row> 
      </div>
    </div>
  </div>
</template>

<script>
import "src/main.scss"
import axios from 'axios'

export default {
  name: 'app',
  data(){
    return{
      is_nav: false,
      user: {},
      router: [
        {to: '/', name: '首页'},
        {to: '/file', name: '归档'},
        {to: '/tag', name: '标签'},
        {to: '/about', name: '关于我'},
        {to: '/article', name: '文章'}
      ]
    }
  },
  methods: {
    getUser() {
      var vm=this;
      //请求api获取用户数据
    }
  },
  components: {
  }
}
</script>

