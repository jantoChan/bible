<template>
  <div id="app">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字的按钮</el-button>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <router-link to="/home">Go to home</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'admin',
  components: {
  }
}
</script>

<style>

</style>