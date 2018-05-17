<template>
  <div class="tagDetail" v-loading.fullscreen.lock="is_loading">
    <div class="tagDetail__title">
      {{tagName.name}} <small>标签</small>
    </div>
    <div class="tagDetail__ct g-flex--wrap" v-if="articleList.length>0">
      <div class="list-item" v-for="article in articleList" @click="routeDetail(article['article'].objectId)">
        <div class="list-item__ct">
          <a class="list-item__header" href="javascript:;">
            {{article['article'].title}}
          </a>
          <div class="list-item__description">Date - {{article['article'].createdAt | dateFormat}}</div>
        </div>
      </div>
    </div>
    <div class="tagDetail__empty" v-if="!is_loading && articleList.length<=0">
      <i class="iconfont">&#xe648;</i>
      <p>暂未添加文章</p>
    </div>
  </div>
</template>
<script>
    import "src/components/exhibition/tag/index.scss"
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
          articleList: [],
          tagName: ''
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
              vm.articleList= response.data.list;
              vm.tagName= response.data.name;

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

