<template>
  <div class="tagDetail" v-loading.fullscreen.lock="is_loading">
    <div class="tagDetail__ct g-flex--wrap">
      <div class="card" v-for="article in articleList">
        <div class="card__header" v-text="article.title">
          saldkjf
        </div> 
        <div class="card__meta">
         <span class="card__meta__author">janto</span> 
         <span class="card__meta__date">2017/2/1</span> 
        </div> 
        <div class="card__abstract">
          本文首先综合介绍模型项目的优先级，模型项目推进的四个要素，并按照优先级顺序依次展开四个要素细节实施过程中需要注意的方方面面。
        </div> 
      </div>
    </div>
  </div>
</template>
<script>
    import "./index.scss"

    /*
      tag:{
        total,
        list: [
          {title, author, date, abstract, id, is_publish}
        ] 
      } 
     */
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
          articleList: []
        };
      },
      created() {
        this.objectId=this.$route.params.id;
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
              vm.articleList= response.data;
              console.log(response);

            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
</script>

