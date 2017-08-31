<template>
  <div class="file" v-loading.fullscreen.lock="is_loading">
    <el-collapse accordion>
      <el-collapse-item v-for="item in list">
        <template slot="title" v-cloak>
          {{item.name}}
        </template>
        <div class="list-item" v-for="article in item.value" @click="goDetail(article)">
          <!-- <i class="iconfont list-item__icon">&#xe74f;</i> -->
          <el-tag type="primary" v-if="article.is_issue" class="g-mr20">布</el-tag>
          <el-tag type="primary" v-else class="g-mr20">稿</el-tag>
          <div class="list-item__ct">
            <a class="list-item__header" href="javascript:;">
              {{article.title}}
            </a>
            <div class="list-item__description">Date - {{article.createdAt | dateFormat}}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>  
  </div>
</template>

<script>
    import "./index.scss"
    import axios from 'axios'


    export default {
      filters: {
        dateFormat: function (value) {
          let dateVal= new Date(value);
          return dateVal.getFullYear() +'/'+ (dateVal.getMonth()+1) +'/' +dateVal.getDate();
        }
      },
      name: "fileManage",
      data() {
        return {
          is_loading: false,
          list: {}
        }
      },
      mounted() {
        this.getList();
      },
      methods: {
        getList() {
          let vm= this;
          vm.is_loading= true;
          axios.get('/api/file/list')
            .then(function (response) {
              vm.is_loading= false;
              if (response.status === 200) {
                vm.list= response.data;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        goDetail(article) {
          let vm= this;
          vm.$router.push({
            path: '/admin/article/preview',
            query: {
              articleId: article.objectId
            }
          })
        }
      },
      components: {
      }
    }
</script>

