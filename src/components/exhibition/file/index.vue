<template>
  <div class="file" v-loading.fullscreen.lock="is_loading">
    <div class="file__counter">目前共计 {{total}} 篇日志</div>
    <section v-for="item in fileList">
      <div class="file__title">{{item}}</div>
      <div class="list-item" v-for="article in fileFilter(articleList, item)" @click="goDetail(article)">
        <div class="list-item__ct">
          <a class="list-item__header" href="javascript:;">
            {{article.title}}
          </a>
          <div class="list-item__description">Date - {{article.createdAt | dateFormat}}</div>
        </div>
      </div>
    </section>
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
    var style= require("./index.scss");
    import axios from 'axios'

    export default {
      filters: {
        dateFormat: function (value) {
          let dateVal= new Date(value);
          return dateVal.getFullYear() +'-'+ (dateVal.getMonth()+1) +'-' +dateVal.getDate();
        }
      },
      name: "fileManage",
      data() {
        return {
          is_loading: false,
          fileList: [],
          articleList: {},
          page: 1,
          limit: 10,
          total: 0 
        }
      },
      mounted() {
        this.getArticles();
      },
      methods: {
        goDetail(article) {
          let vm= this;
          vm.$router.push({
            path: '/article',
            query: {
              articleId: article.objectId
            }
          })
        },
        getArticles() {
          let vm= this;
          vm.is_loading= true;
          axios.post('/api/article', {page: vm.page, limit: vm.limit})
            .then(function (response) {
              vm.is_loading= false;
              if (response.status === 200) {
                vm.articleList= response.data.list;
                vm.fileList.length= 0;
                vm.articleList.forEach(function(item, index) {
                  var curFile= item.date;
                  var prefix= 'file_';
                  if (vm.fileList.indexOf(curFile) == -1) {
                    vm.fileList.push(curFile);
                  };
                });
                vm.total= response.data.count;
              }
            })
            .catch(function (error) {
              vm.$message({
                message: error,
                type: 'error'
              });
            });
        },
        fileFilter(articleList, fileIndex) {
          return articleList.filter(function (article) {
            return article.date == fileIndex 
          })
        }
      },
      watch: {
        page() {
          this.getArticles();
        }
      }
    }
</script>

