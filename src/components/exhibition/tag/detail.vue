<template>
  <div class="tagDetail" v-loading.fullscreen.lock="is_loading">
    <div class="tagDetail__ct g-flex--wrap" v-if="articleList.length>0">
      <div class="card" v-for="article in articleList" @click="routeDetail(article['article'].objectId)">
        <div class="card__header">
          <span v-text="article['article'].title"></span>
          <!-- <i class="iconfont" :class="{'s-publish': article['article'].is_issue, 's-draft': !article['article'].is_issue}">&#xe600;</i> -->
        </div>
        <div class="card__meta">
         <span class="card__meta__author" v-text="article['article'].author"></span> 
         <span class="card__meta__date" v-cloak>{{article['article'].createdAt | dateFormat}}</span> 
        </div> 
        <div class="card__abstract" v-text="article['article'].content.slice(0,150)+'...'"> </div>
      </div>
    </div>
    <div class="tagDetail__empty" v-if="!is_loading && articleList.length<=0">
      <i class="iconfont">&#xe648;</i>
      <p>暂未添加文章</p>
    </div>
  </div>
</template>
<script>
    import "src/components/admin/tag/index.scss"
    import axios from 'axios'

    export default {
      filters: {
        dateFormat: function (value) {
          let dateVal= new Date(value);
          return dateVal.getFullYear() +'/'+ (dateVal.getMonth()+1) +'/' +dateVal.getDate();
        }
      },
      name: "tagDetail",
      data() {
        return {
          is_loading: false,
          objectId: '',
          articleList: []
        };
      },
      created() {
        this.objectId=this.$route.query.tagId;
        this.getDetail();
      },
      methods: {
        getDetail() {
          let vm= this;
          let data= {
            id: vm.objectId
          };
          vm.is_loading= true;
          axios.get('/api/tags/detail', {
              params: data
            })
            .then(function (response) {
              vm.is_loading= false;
              vm.articleList= response.data;

            })
            .catch(function (error) {
              console.error(error);
            });
        },
        routeDetail(id) {
          let vm= this;
          vm.$router.push({
            path: '/article',
            query: {
              articleId: id
            }
          })
        }
      }
    }
</script>

