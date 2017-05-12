<template>
  <div id="app">
    <div class="main-cnt">
      <div class="page-container page-component">
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
              <div class="nav">
                <router-link to="/" class="nav__item">首页</router-link>
                <router-link to="/file" class="nav__item">归档</router-link>
                <router-link to="/tag" class="nav__item">标签</router-link>
                <router-link to="/about" class="nav__item">关于我</router-link>
              </div>
            </div>
          </el-col>
          <el-col class="el-col el-col-24 el-col-xs-24 el-col-sm-18">
            <router-view></router-view>
          </el-col>
        </el-row> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>
<style lang="scss">
    @import "./main.scss"
</style>
