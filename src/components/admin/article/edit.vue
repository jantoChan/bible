<template>
  <div class="edit">
    <el-input v-model="title" placeholder="请输入标题" class="edit__title"></el-input>
    <div class="edit__tag g-mt20">
      <el-tag
        v-for="n in 5"
        :key="n"
        :closable="true"
        v-if="!!tags.length"
      >
        {{n}}
      </el-tag>
      <div class="el-tag edit__add-tag g-mb20" 
        @click="addTag"
      >
        添加标签
      </div>
    </div>
    <div class="edit__filed">
      <textarea id="editor"></textarea>
    </div>
    <el-row class="edit__action g-mt20"  type="flex" justify="space-around">
      <el-col :span="8" class="edit__action--cancle btn-floating">
        <i class="iconfont">&#xe718;</i>
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
        <div class="tag__add__form">
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-button type="primary">确定</el-button>
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

    export default {
        name: "articleEdit",
        data() {
          return {
            title: '',
            tags: [],
            is_add: false,
            name: '',
            checked: false,
            content: ''
          }
        },
        mounted: function() {
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
                vm.content = value;
            });
        },
        methods: {
          addTag: function() {
            var vm=this;
            vm.is_add=true;
          }
        },
        components: {
        }
    }
</script>

