<template>
  <div id="app">
    <div class="main-cnt main-cnt--admin">
      <div class="page-container page-component">
        <div class="header">
          <div class="header__ct">
            <div class="header__logo"><router-link to="/admin">管理后台</router-link></div>
            <div class="header__main-nav">
              <div class="header__navigation">
                <!-- <router-link class="header__nav-item" to="/admin/article/edit"><i class="iconfont">&#xe609;</i></router-link> -->
                <router-link class="header__nav-item" to="/admin/file"><i class="iconfont">&#xe6a1;</i></router-link>
                <router-link class="header__nav-item" to="/admin/tag"><i class="iconfont">&#xe6c0;</i></router-link>
                <router-link class="header__nav-item" to="/admin/about"><i class="iconfont">&#xe726;</i></router-link>
              </div>
            </div>
          </div>
        </div>
        <router-view class="contents g-mt20"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      is_login: true
    }
  },
  components: {
  }
}
</script>

