<template>
  <div class="edit">
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
      <textarea id="editor"></textarea>
    </div>
    <el-row class="edit__action g-mt20 g-mb20"  type="flex" justify="space-around">
      <el-col :span="8" class="edit__action--cancle btn-floating">
        <i class="iconfont">&#xe69a;</i>
      </el-col>
      <el-col :span="8" class="edit__action--draft btn-floating">
        <i class="iconfont">&#xe6fc;</i>
      </el-col>
      <el-col :span="8" class="edit__action--issue btn-floating">
        <i class="iconfont">&#xe61d;</i>
      </el-col>
    </el-row>
    <transition name="el-zoom-in-top">
      <div class="edit__add" v-show="is_add">
        <div class="edit__add__header g-mb20">
          <el-button type="primary" icon="arrow-left" @click="is_add=!is_add"></el-button>
        </div>
        <div class="edit__add__form">
          <el-checkbox-group v-model="tagSelect">
             <el-checkbox :label="index" v-for="(tag, index) in tagList" :value="tag.objectId" :key="tag.objectId">{{tag.name}}</el-checkbox>
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
    import SimpleMDE from "simplemde"
    import "../../../assets/css/simplemde.css"
    import marked from 'marked'
    import hljs from "highlight.js"
    import "../../../assets/css/monokai-sublime.css"

    //ajax
    import axios from 'axios'

    export default {
        name: "articleEdit",
        data() {
          return {
            is_add: false,
            checked: false,
            title: '',
            tags: [],
            name: '',
            content: '',
            tagSelect: [],
            tagSelectObj: [],
            tagList: []
          }
        },
        created() {
          var vm=this;
          vm.getTags();
        },
        mounted() {
          var vm=this;
          var dom=document.getElementById('editor');
          if (!dom) {
            return false;
          }
          hljs.initHighlightingOnLoad();
          var smde = new SimpleMDE({
                element: dom,
                autofocus: true,
                autosave: true,
                showIcons: ["code", "table"],
                hideIcons: ["fullscreen", "guide"],
                previewRender: function(plainText) {
                    return marked(plainText,{
                        renderer: new marked.Renderer(),
                        gfm: true,
                        pedantic: false,
                        sanitize: false,
                        tables: true,
                        breaks: true,
                        smartLists: true,
                        smartypants: true,
                        highlight: function (code) {
                            return hljs.highlightAuto(code).value;
                        }
                    });
                },
            });
            smde.codemirror.on("change", function(){
                var value = smde.value();
                console.log(value);
                vm.content = value;
            });
        },
        methods: {
          addTag() {
            var vm=this;
            vm.is_add=true;
          },
          getTags() {
            var vm=this;
            axios.get('/api/tags')
              .then(function (response) {
                if (response.status === 200 && response.data.length>0) {
                  vm.tagList=response.data.reverse();
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        },
        watch: {
          tagSelect(val) {
            var vm=this;
            vm.tagSelectObj.splice(0, vm.tagSelectObj.length)
            for(var i=0; i<val.length; i++){
              var cur=val[i]
              vm.tagSelectObj.push(vm.tagList[cur]);
            }
          }
        },
        components: {
        }
    }
</script>

