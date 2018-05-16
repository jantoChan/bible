<template>
  <div class="file" v-loading.fullscreen.lock="is_loading">
    <div class="list-item" v-for="n in 4">
      <div class="list-item__ct">
        <a class="list-item__header" href="javascript:;">
          article.title
        </a>
        <div class="list-item__description">Date - article.createdAt | dateFormat</div>
      </div>
    </div>
  </div>
</template>

<script>
    var style= require("./index.scss");
    import axios from 'axios'

    export default {
      filters: {
        dateFormat: function (value) {
          let dateVal= new Date(value);
          return dateVal.getFullYear() +'-'+ (dateVal.getMonth()+1) +'-' +dateVal.getDate();
        }
      },
      name: "fileManage",
      data() {
        return {
          is_loading: false,
          list: {}
        }
      },
      mounted() {
        this.getList();
      },
      methods: {
        getList() {
          let vm= this;
          vm.is_loading= true;
          axios.get('/api/file/list')
            .then(function (response) {
              vm.is_loading= false;
              if (response.status === 200) {
                vm.list= response.data;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        goDetail(article) {
          let vm= this;
          vm.$router.push({
            path: '/article',
            query: {
              articleId: article.objectId
            }
          })
        }
      },
      components: {
      }
    }
</script>

