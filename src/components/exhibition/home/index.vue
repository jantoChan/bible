<template>
    <div class="home" v-loading.fullscreen.lock="is_loading">
      <div class="article" v-for="item in articleList">
        <div class="article__title">
          <router-link class="article__title__link" :to="{ path: 'article', query: { articleId: item.objectId }}">{{item.title}}</router-link>
        </div>
        <div class="article__nav">
          <span>
            <i class="iconfont">&#xe6de;</i>
            {{item.createdAt | dateFormat}}
          </span>
          <span>
            <i class="iconfont">&#xe604;</i>
            {{item.viewCount}}
          </span>
        </div>
        <div class="article__abstract">
          {{item.abstract}}
        </div>
        <div class="article__more">
          <router-link class="article__more__button" :to="{ path: 'article', query: { articleId: item.objectId }}">Read More>></router-link>
        </div>
        <div class="article__line"></div>
      </div>
      <div class="pager" v-if="total">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync= "page"
          :page-size= "limit"
          :total="total">
        </el-pagination>
        </div> 
    </div>
</template>

<script>
import "components/exhibition/home/index.scss"

import axios from "axios";
export default {
  filters: {
    dateFormat: function (value) {
      let dateVal= new Date(value);
      return dateVal.getFullYear() +'-'+ (dateVal.getMonth()+1) +'-' +dateVal.getDate();
    }
  },
  name: 'Home',
  data() {
    return {
        is_loading: false,
        articleList: [],
        page: 1,
        limit: 5,
        total: 0 
    }
  },
  mounted() {
    let vm= this;
    vm.getArticles();
  },
  methods: {
    getArticles() {
      let vm= this;
      vm.is_loading= true;
      axios.post('/api/article', {page: vm.page, limit: vm.limit})
        .then(function (response) {
          vm.is_loading= false;
          if (response.status === 200) {
            vm.articleList= response.data.list;
            vm.total= response.data.count;
          }
        })
        .catch(function (error) {
          vm.$message({
            message: error,
            type: 'error'
          });
        });
    }
  },
  watch: {
    page() {
      this.getArticles();
    }
  }
}
</script>
