<template>
  <div class="tag">
    <div class="tag__list" v-show="!is_add">
      <router-link v-for="n in 15" :to="'/admin/tag/detail/' + n" class="list-item">
        <i class="iconfont list-item__icon">&#xe619;</i>
        <div class="list-item__ct">
          <a class="list-item__header" href="javascript:;">Semantic</a>
          <div class="list-item__description">2017篇文章</div>
        </div>
        <transition name="el-zoom-in-center">
          <el-checkbox v-model="checked" v-show="is_edit"></el-checkbox>
        </transition>
      </router-link>
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
          <el-button type="primary" @click="is_edit=!is_edit">取消</el-button> 
        </el-col>
        <el-col :span="12" class="f-txt-right">
          <el-button type="primary">删除</el-button>
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
    /*
      tag:{
        total,
        list: [
          id,
          name,
          value,
          count
        ] 
      } 
    */
    /*
      add{
        [id] 
      } 
   */ 
    /*
      delete{
        [id] 
      } 
   */ 

    export default {
        name: "tagManage",
        created() {
          this.getTagList();          
        },
        data() {
          return {
            activeName: 'first',
            checked: true,
            is_edit: false,
            is_add: false,
            name: '',
            value: ''
          };
        },
        methods: {
          getTagList() {
            var vm=this;
            axios.get('/api/tags')
              .then(function (response) {
                console.log('success');
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          addTag() {
            var vm=this;
            axios.post('/api/tags/add', {
                name: vm.name,
                value: vm.value
              })
              .then(function (response) {
                console.log('success');
                console.log(response);

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
                console.log(error);
              });
          }
        }
    }
</script>
