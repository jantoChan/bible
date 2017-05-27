<template>
  <div class="validate">
    <el-input v-model="bankno"></el-input> 
    <el-button @click="check">check</el-button>
  </div>
</template>

<script type="text/javascript">
  export default {
      name: "bankValidate",
      data() {
        return {
          bankno: ''
        }
      },
      methods: {
        luhmCheck(bankno) {
          var bankno = bankno.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          pass = true,
          is_bank = true,
          is_bin = true,

          //卡号开头6位验证
          strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";

          if (!bankno || !(/^\d{16}$/.test(bankno) || /^\d{19}$/.test(bankno))) {
            pass = false;
          }else if(strBin.indexOf(bankno.substring(0, 2))== -1){
              pass = false;
          }else{
            var lastnum = bankno[bankno.length-1],
            validateArr = bankno.split(""),
            sum = 0;
            for(var i =0; i<validateArr.length; i++){
              var cur = +validateArr[i];
              if (i%2) {
                cur = (cur*2)>9? cur*2-9 : cur*2;
              }
              sum+=cur;
            }
            pass = !(sum%10);
          }
          return pass;
        },
        check(){
          var val=this.luhmCheck(this.bankno);
          console.log(val);
        }
      },
      components: {
      }
  }
</script>
