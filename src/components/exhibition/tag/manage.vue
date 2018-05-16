<template>
  <div class="tag" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="tag__list" v-show="!is_add" v-if="tagList.length > 0 && !fullscreenLoading">
      <div class="tag__total">目前共计{{tagList.length}}个标签</div>
      <div class="tag__list__item" v-for="(tag, index) in tagList" @click="guideAction(index)">
        {{tag.name}} 
      </div>
    </div>
    <div class="tag__empty" v-if="tagList.length === 0 && !fullscreenLoading">
      <i class="iconfont">&#xe7ec;</i>
      暂未添加标签 ~
    </div>
  </div>
</template>
<script>
    import "src/components/exhibition/tag/index.scss"
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
                console.error(error);
              });
          },
          guideAction(index) {
            let vm=this;
            let curItem=vm.tagList[index];
            if (!curItem.quote) {
              vm.$message('抱歉，该标签暂无相关文章 ～');
              return false;
            }
            vm.$router.push({
              path: '/tag/detail',
              query: {
                tagId: curItem['objectId']
              }
            })
          }
        }
    }
</script>
