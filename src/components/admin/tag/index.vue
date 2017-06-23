<template>
  <div class="tag" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="tag__list" v-show="!is_add" v-if="tagList.length > 0 && !fullscreenLoading">
      <div class="list-item" v-for="(tag, index) in tagList" @click="guideAction(index)">
        <i class="iconfont list-item__icon">&#xe707;</i>
        <div class="list-item__ct">
          <a class="list-item__header" href="javascript:;" v-text="tag.name"></a>
          <div class="list-item__description" v-cloak>{{tag.quote}}篇文章</div>
        </div>
        <transition name="el-zoom-in-center">
          <div class="list-item__label" v-show="is_edit">
            <div class="checkbox">
              <i class="checkbox__checked iconfont" v-if="tag.is_select">&#xe730;</i>
              <i class="checkbox__nochecked iconfont" v-else>&#xe72f;</i>
            </div> 
          </div>
        </transition>
      </div>
    </div>
    <div class="tag__empty" v-if="tagList.length === 0 && !fullscreenLoading">
      <i class="iconfont">&#xe7ec;</i>
      暂未添加标签 ~
    </div>
    <div class="tag__action" v-show="!is_edit && !is_add">
      <div class="btn-floating g-mb10" @click="is_edit=!is_edit">
        <i class="iconfont">&#xe69e;</i>
      </div>
      <div class="btn-floating" @click="is_add=!is_add">
        <i class="iconfont">&#xe6b9;</i>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <div class="tag__del" v-show="is_edit">
        <el-row class="tag__del__ct">
          <el-col :span="12">      
            <el-button type="primary" @click="resetTag">取消</el-button> 
          </el-col>
          <el-col :span="12" class="f-txt-right">
            <el-button type="primary" @click="deleteTag">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </transition>
    <transition name="el-zoom-in-top">
      <div class="tag__add" v-show="is_add">
        <div class="tag__add__header g-mb20">
          <el-button type="primary" icon="arrow-left" @click="is_add=!is_add"></el-button>
        </div>
        <div class="tag__add__form">
          <el-row :gutter="20" class="g-mb20">
            <el-col :span="4">
              <i class="iconfont">&#xe649;</i>
            </el-col>
            <el-col :span="20">
              <el-input v-model="name" placeholder="标签名称"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <i class="iconfont">&#xe6e1;</i>
            </el-col>
            <el-col :span="20">
              <el-input v-model="value" placeholder="标签值"></el-input>
            </el-col>
          </el-row>
          <el-button type="primary" @click="addTag">确定</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
    import "./index.scss"
    import axios from 'axios'

    export default {
        name: "tagManage",
        created() {
          this.getTagList();          
        },
        data() {
          return {
            activeName: 'first',
            is_edit: false,
            is_add: false,
            fullscreenLoading: true,
            name: '',
            value: '',
            tagList: [],
            selectTag: []
          };
        },
        methods: {
          checkNull() {
            let vm= this,
            is_fill= vm.name && vm.value;
            if (!is_fill) {
              vm.$message({
                message: '注意，标签名或值不能为空',
                type: 'warning'
              });
            } 
            return is_fill;
          },
          getTagList() {
            let vm=this;
            vm.fullscreenLoading=true;
            axios.get('/api/tags')
              .then(function (response) {
                vm.fullscreenLoading=false;
                if (response.status === 200 && response.data.length>0) {
                  for (let i = response.data.length- 1; i >= 0; i--) {
                      let cur= response.data[i];
                      cur['is_select']= false;
                  }
                  vm.tagList=response.data.reverse();
                }
              })
              .catch(function (error) {
                vm.fullscreenLoading=false;
                console.log(error);
              });
          },
          addTag() {
            let vm=this;
            let is_fill=vm.checkNull();
            if (is_fill) {
              axios.post('/api/tags/add', {
                  name: vm.name,
                  value: vm.value
                })
                .then(function (response) {

                  vm.getTagList();
                  vm.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  // reset
                  vm.name='';
                  vm.value='';
                  vm.is_add = false;

                })
                .catch(function (error) {
                  vm.$message({
                    message: "sorry, we've got a problem !",
                    type: 'error'
                  });
                  console.log(error);
                });
            }
          },
          deleteTag() {
            let vm=this;
            if (vm.selectTag.length ===0 ) {
              vm.$message({
                message: '请选择删除的标签',
                type: 'warning'
              }); 
            }else{
             axios.post('/api/tags/delete', {tags: vm.selectTag})
              .then(function (response) {

                vm.getTagList();
                vm.$message({
                  message: '删除成功',
                  type: 'success'
                });
                // reset
                vm.resetTag();
              })
              .catch(function (error) {
                vm.$message({
                  message: "sorry, we've got a problem !",
                  type: 'error'
                });
                console.log(error);
              });
            }
          },
          resetTag() {
            let vm=this;
            vm.is_edit=false;

            //清空所选标签
            let length=vm.selectTag.length;
            vm.selectTag.splice(0, length);

            //重置标签状态
            for (let i = vm.tagList.length - 1; i >= 0; i--) {
              vm.tagList[i]['is_select'] =false;
            }
          },
          guideAction(index) {
            let vm=this;
            let curItem=vm.tagList[index];
            if (vm.is_edit) {
              //编辑状态
              if (curItem['is_select']) {
                let curIndex = vm.selectTag.indexOf(curItem['objectId']);
                vm.selectTag.splice(curIndex, 1);
              }else{
                vm.selectTag.push(curItem['objectId']);
              }
              curItem['is_select'] = !curItem['is_select'];

            }else{
              let path= "/admin/tag/detail/" + curItem['objectId'];
              vm.$router.push(path);
            }
          }
        }
    }
</script>
