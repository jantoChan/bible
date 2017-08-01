<template>
  <div class="preview" v-loading.fullscreen.lock="is_loading">
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
          <a href="javascript:;" target="_blank" class="g-ml10" v-text="articleDetail.author"></a>
        </div>
        <div v-compiledMarkdown> {{articleDetail.contents}} </div>
        <div class="article__tags">
          <div class="article__tag" v-for="tag in tagList">
            <router-link :to="'/admin/tag/detail/' + tag['tag']['objectId']" class="article__tag-link" v-text="tag['tag']['name']"></router-link>
          </div>
        </div>
      </div>
      <!-- 编辑 -->
      <div class="tag__action">
        <div class="btn-floating g-mb10" @click="edit">
          <i class="iconfont">&#xe69e;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import "./index.scss";

  import axios from "axios";
  var marked = require('marked');
  import highlight from 'highlight.js';

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
        articleContent: "",
        articleDetail: {},
        tagList: []
      }
    },
    created(){
      let vm= this;
      vm.objectId= vm.$route.query.articleId;
      vm.getContents();
    },
    mouted() {
      marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
          // 代码语法高亮
          highlight: function (code) {
              return highlight.highlightAuto(code).value;
          }
      });
    },
    methods: {
      getContents() {
        let vm= this;
        vm.is_loading= true;
        axios.post('/api/article/detail', {id: vm.objectId})
          .then(function (response) {
            vm.is_loading= false;
            if (response.status === 200) {
              vm.articleDetail= response['data']['articleDetail'];
              vm.articleContent= marked(response['data']['articleDetail']['content']);
              vm.tagList= response['data']['tagList'];
            }
          })
          .catch(function (error) {
            vm.$message({
              message: error,
              type: 'error'
            });
          });
      },
      edit() {
        let vm=this;
        console.log(vm.articleDetail.objectId);
        vm.$router.push({
          path: '/admin/article/edit',
          query: {
            articleId: vm.articleDetail.objectId
          }
        })
      }
    },
    watch: {
      '$route': 'getContents'
    },
    directives: {
        compiledMarkdown: {
            bind: function(el){
                console.log(el);
                el.innerHTML = marked(el.innerText);
            }
        }
    }
  }
</script>
