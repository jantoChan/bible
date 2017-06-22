<template>
  <div class="edit"  v-loading.fullscreen.lock="is_loading">
    <el-input v-model="title" placeholder="文章标题" class="edit__title"></el-input>
    <div class="edit__tag g-mt20">
      <el-tag
        v-for="tag in tagSelectObj"
        v-if="!!tagSelectObj.length"
      >
        {{tag.name}}
      </el-tag>
      <div class="el-tag edit__add-tag g-mb20" 
        @click="addTag"
      >
        编辑标签
      </div>
    </div>
    <div class="edit__filed">
      <markdown-editor :value="content" @input="handleInput" ref="markdownEditor" preview-class="markdown-body" :configs="configs"></markdown-editor>    
    </div>
    <el-row class="edit__action g-mt20 g-mb20"  type="flex" justify="space-around">
      <el-col :span="8" class="edit__action--cancle btn-floating">
        <i class="iconfont">&#xe69a;</i>
      </el-col>
      <el-col :span="8" class="edit__action--draft btn-floating">
        <i class="iconfont"  @click="goDraft">&#xe6fc;</i>
      </el-col>
      <el-col :span="8" class="edit__action--issue btn-floating">
        <i class="iconfont" @click="goIssue">&#xe61d;</i>
      </el-col>
    </el-row>
    <transition name="el-zoom-in-top">
      <div class="edit__add" v-show="is_add">
        <div class="edit__add__header g-mb20">
          <el-button type="primary" icon="arrow-left" @click="is_add=!is_add"></el-button>
        </div>
        <div class="edit__add__form">
          <el-checkbox-group v-model="tagSelect">
             <el-checkbox :label="tag.objectId" v-for="(tag, index) in tagList" :value="tag.objectId" :key="tag.objectId">{{tag.name}}</el-checkbox>
          </el-checkbox-group>
          <!-- <el-button type="primary" class="edit__add__form__sub">确定</el-button> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    import "./index.scss"

    /*
      articleAdd{
        title,
        tag: [ids],
        contents,
        is_publish
      }
    */

    /* maked */
    import { markdownEditor } from 'vue-simplemde'
    // 使用默认编辑器主题时
    require.ensure([], () => require('github-markdown-css'), 'markdown-style')

    //ajax
    import axios from 'axios'

    export default {
        name: "articleEdit",
        data() {
          return {
            //marked 配置
            configs:{
              status: false, // 禁用底部状态栏
              initialValue: '', // 设置初始值
              showIcons: ['code', 'table'],
              renderingConfig: {
                codeSyntaxHighlighting: true, // 开启代码高亮
                highlightingTheme: 'github-gist' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
              }
            },
            is_add: false,
            is_issue: false,
            is_loading: false,
            articleId: '',
            title: '',
            tags: [],
            name: '',
            content: '',
            tagSelect: [],
            tagSelectObj: [],
            tagList: [],
            /* add 添加 update 更新 */
            tagAction: 'add'  
          }
        },
        created() {
          this.init();
        },
        methods: {
          init: async function() {
            let vm= this,
            route= vm.$route;
            if (route.query.articleId) {
              vm.articleId= route.query.articleId;  
              vm.tagAction= 'update';
            };
            vm.articleId= '594b9355fe88c2005f6c67c5';
            window.vm=this;
            vm.tagList= await vm.getTags();
            vm.renew();
          },
          addTag() {
            let vm=this;
            vm.is_add=true;
          },
          getTags() {
            return new Promise((resolve, reject) => {
            let vm=this;
            vm.is_laoding= true;
            axios.get('/api/tags')
              .then(function (response) {
                vm.is_loading= false;
                if (response.status === 200 && response.data.length>0) {
                  resolve(response.data.reverse());
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            });
          },
          renew() {
            let vm= this;
            if(!vm.articleId) return false;
            vm.is_loading= true;
            axios.post('/api/article/detail', {
                id: vm.articleId 
              }).then(function (response) {
                if (response.status === 200) {
                  vm.is_loading= false;

                  let articleAll= response.data;

                  vm.title= articleAll['articleDetail']['title'];
                  vm.content= articleAll['articleDetail']['content'];

                  articleAll['tagList'].forEach(function(map) {
                    vm.tagSelect.push(map['tag']['objectId']);
                  })
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          checkNull() {
            let vm =this;
            let is_fill= vm.content && vm.title;
            if (!is_fill) {
              vm.$message({
                message: '文章标题或正文未填写~',
                type: 'warning'
              });
            }
            return is_fill;
          },
          saveArticle() {
            let vm= this;
            let tags=[];
            let data= {};

            //标签

            data['title']= vm.title;
            data['content']= vm.content;
            data['tags']= vm.tagSelect;
            data['is_issue']= vm.is_issue;
            axios.post('/api/article/'+ vm.tagAction, data)
              .then(function (response) {
                if (response.status === 200) {
                  let article= response.data;
                  //reset
                  vm.$router.push({
                    path: '/admin/article/preview', 
                    query: {articleId: article.objectId}
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          goDraft() {
            let vm= this;
            let is_fill= !!vm.checkNull();
            if (is_fill) {
              vm.is_issue= false;
              vm.saveArticle();
            }
          },
          goIssue() {
            let vm= this;
            let is_fill= !!vm.checkNull();
            if (is_fill) {
              vm.is_issue= true;
              vm.saveArticle();
            }
          },
          reset() {
            let vm= this;
            vm.title='';
            vm.content='';
            vm.simplemde.value('');
            vm.tagSelect.splice(0, vm.tagSelect);
          },
          handleInput() {
            // 同步实例content
            let vm =this;
            vm.content= vm.simplemde.value();
          }
        },
        watch: {
          tagSelect(val) {
            //objectId搜索对应list
            let vm=this;
            console.log(val);
            vm.tagSelectObj.splice(0, vm.tagSelectObj.length);

            for(let i=0; i<val.length; i++){
              let cur=val[i];
              console.log(cur);
              vm.tagList.forEach(function(tag) {
                if (cur== tag['objectId'] ) {
                  vm.tagSelectObj.push(tag);  
                }
              })
              // vm.tagSelectObj.push(vm.tagList[cur]);
            }
          }
        },
        computed: {
          simplemde () {
            return this.$refs.markdownEditor.simplemde
          } 
        },
        components: {
          markdownEditor
        }
    }
</script>

