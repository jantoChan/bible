<template>
  <el-button type="text" @click="open4">点击打开 Message Box</el-button>
</template>

<script>
export default {
    name: "Login",
    methods: {
      open4() {
        const h = this.$createElement;
        this.$msgbox({
          title: '博客管理后台',
          message: h('div', null, [
            h('el-input', {placeholder: '请选择日期', icon: "search"}, 'VNode'),
            h('i', { style: 'color: teal', class: 'iconfont' }, 'VNode')
          ]),
          showCancelButton: true,
          confirmButtonText: '登录',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      },
    }
  }
</script>

<style>

</style>