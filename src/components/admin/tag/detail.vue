<template>
  <div class="tagDetail">
    <div class="tagDetail__ct g-flex--wrap">
      <div class="card" v-for="n in 5">
        <div class="card__header">
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
    
    export default {
        name: "tagDetail",
        data() {
          return {

          };
        },
        methods: {

        }
    }
</script>

