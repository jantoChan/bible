<template>
  <div id="app" class="app" :class="{'z-on': is_toggle}">
    <!-- 头部 -->
    <div class="headband"></div>
    <header id="header" class="header">
      <div class="header__inner"> 
        <div class="site">
          <div class="site__meta ">
            <div class="custom-logo-site-title">
              <a href="https://github.com/jantoChan" class="brand" rel="start">
                <span class="site__title">JantoChan's blog</span>
              </a>
            </div>
                <h1 class="site__subtitle">github.com/jantoChan</h1>
          </div>
          <div class="site__nav-toggle" @click="is_nav=!is_nav">
            <button class="site__button">
              <span class="site__bar"></span>
              <span class="site__bar"></span>
              <span class="site__bar"></span>
            </button>
          </div>
        </div>
        <nav class="site__nav-on" v-if="is_nav">
          <ul id="menu" class="menu">
            <li class="menu__item menu__item-active">
              <a href="/" rel="section">
                <i class="iconfont">&#xe702;</i>Home</a>
            </li>
            <li class="menu__item menu__item-archives">
              <a href="/file" rel="section">
                <i class="iconfont">&#xe6de;</i>File</a>
            </li>
            <li class="menu__item menu__item-archives">
              <a href="/tag" rel="section">
                <i class="iconfont">&#xe70c;</i>Tag</a>
            </li>
          </ul>
        </nav>
        <nav class="site__nav">
          <ul id="menu" class="menu">
            <li class="menu__item">
              <a href="/" rel="section">
                <i class="iconfont">&#xe703;</i>Home</a>
            </li>
            <li class="menu__item">
              <a href="/file" rel="section">
                <i class="iconfont">&#xe6df;</i>File</a>
            </li>
            <li class="menu__item">
              <a href="/tag" rel="section">
                <i class="iconfont">&#xe70d;</i>Tag</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <aside class="sidebar" id="sidebar" :class="{'z-on': is_toggle}">
      <div class="sidebar__inner">
        <div class="sidebar__head">jantoChan</div>
        <nav class="sidebar__nav">
          <a class="sidebar__nav__item" href="javascript:;" v-for="item in router">
            <span class="sidebar__nav__item__value">30</span>
            <span class="sidebar__nav__item__name">{{item.name}}</span>
          </a> 
        </nav>
        <div class="sidebar__links">
          <span class="sidebar__links__item">
            <a href="https://github.com/jantoChan" target="_blank" title="GitHub"><i class="iconfont">&#xe69f;</i>GitHub</a>
          </span>
          <span class="sidebar__links__item">
            <a href="mailto:czengtao@163.com" target="_blank" title="E-Mail"><i class="iconfont">&#xe6a0;</i>E-Mail</a>
          </span>
        </div>
      </div> 
    </aside>
    <div class="sidebar__toggle" :class="toggleClass" @click="is_toggle=!is_toggle">
      <span class="sidebar__toggle__line sidebar__toggle__line-first"></span>
      <span class="sidebar__toggle__line sidebar__toggle__line-middle"></span>
      <span class="sidebar__toggle__line sidebar__toggle__line-last"></span>
    </div>
    <div class="back-to-top" :class="{'z-on': is_back}" @click="backToTop">
      <i class="iconfont">&#xe97b;</i>
    </div>    
    <div class="main">
      <div class="main__inner">
        <router-view></router-view>
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
      is_back: false,
      is_nav: false,
      is_toggle: false,
      user: {},
      router: [
        {to: '/file', name: '归档'},
        {to: '/tag', name: '标签'},
        {to: '/file', name: '文章'}
      ],
      tagNum: 0,
      articleNum: 0,
      fileNum: 0
    }
  },
  computed: {
    toggleClass() {
      return {
        "z-on": this.is_toggle,
        "z-toggle": !this.is_toggle
      }
    }
  },
  methods: {
    getTags() {
      var vm=this;
      //请求api获取用户数据
      axios.get('/api/tags')
        .then(function (response) {
          vm.tagNum= response.data.length;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getArticles() {
      var vm= this;
      axios.get('/api/article')
      .then(function (response) {
        vm.articleNum= response.data.length;
      })
      .catch(function (error) {
        console.error(error);
      });
    },
    getFiles() {
      var vm= this;
      axios.get('/api/file/list')
      .then(function (response) {
        //es6 枚举属性
        vm.fileNum= Object.keys(response.data).length;
      })
      .catch(function (error) {
        console.error(error);
      });
    },
    backToTop() {
      this.is_back= false;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  },
  components: {
  },
  mounted() {
    var vm= this;

    window.onscroll=  () => {
      var top= document.documentElement.scrollTop;
      if (top>100) {
        vm.is_back= true;
      }else{
        vm.is_back= false;
      }
    };
    vm.getTags();
    vm.getArticles();
    vm.getFiles();
  }
}
</script>

