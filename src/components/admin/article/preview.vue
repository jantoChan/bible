<template>
  <div class="preview">
    <div class="preview__ct">
      <div class="author">
        <div class="list-item">
          <i class="iconfont list-item__icon">&#xe70e;</i>
          <div class="list-item__ct">
            <a class="list-item__header" href="javascript:;" v-text="articleDetail.author"></a>
            <div class="list-item__description" v-cloak>{{articleDetail.createdAt | dateFormat}}</div>
          </div>
        </div>
      </div>
      <div class="article">
        <h1 class="article__title" v-text="articleDetail.title"></h1>
        <div class="article__info-mobile">
          <div v-cloak>{{articleDetail.createdAt | dateFormat}}</div>
          <a href="/user/5875dfc7a22b9d0058a96d06" target="_blank" class="g-ml10" v-text="articleDetail.author"></a>
        </div>
        <div v-text="articleDetail.content">
        </div>
        <div class="article__tags">
          <div class="article__tag" v-for="tag in tagList">
            <a target="_blank" class="article__tag-link">前端</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import "./index.scss";

  import axios from "axios";

  export default {
    filters: {
      dateFormat: function (value) {
        let dateVal= new Date(value);
        return dateVal.getFullYear() +'年 '+ (dateVal.getMonth()+1) +'月 ' +dateVal.getDate()+'日';
      }
    },
    name: "preview",
    data() {
      return {
        is_loading: false,
        objectId: "",
        articleDetail: {},
        tagList: []
      }
    },
    created(){
      let vm= this;
      vm.objectId= vm.$route.query.id;
      vm.getContents();
    },
    methods: {
      getContents() {
        let vm= this;
        vm.is_loading= true;
        axios.post('/api/article/detail', {id: vm.objectId})
          .then(function (response) {
            vm.is_loading= false;
            if (response.status === 200) {
              console.log(response);
              vm.articleDetail= response['data']['articleDetail'];
              vm.tagList= response['data']['tagList'];
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
  }
</script>
