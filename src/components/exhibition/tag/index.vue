<template>
  <div class="tag">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <div class="list-item">
          <i class="iconfont list-item__icon">&#xe619;</i>
          <div class="list-item__ct">
            <a class="list-item__header" href="javascript:;">Semantic css框架的用法</a>
            <div class="list-item__description">2017-10-52</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理2</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理3</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿4</el-tab-pane>
    </el-tabs>  
  </div>
</template>

<script>
import "./index.scss"

/*
  tag{
     taglist{
        value,
        id,
        name
     }
     tag: {
        limit,
        total,
        page,
        data: [
          {title, data, id}
        ]
     }
  }
 */

 export default {
  name: 'Tag',
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

