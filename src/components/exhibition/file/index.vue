<template>
  <div class="file">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="'201'+n" :name="n+''" class="g-flex--wrap g-mb20" v-for="n in 5">
          <div class="card" v-for="n in 5">
            <div class="card__header">
              <!-- <router-link to="/aa"></router-link> -->
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
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import "./index.scss"

export default {
  name: 'File',
  data() {
    return {
      activeName: '1'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

