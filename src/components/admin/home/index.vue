<template>
  <div class="home">
    <!-- home-->
     
  </div>
</template>

<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import { mapState } from 'vuex'

  export default {
    name: 'Home',
    data() {
      return {
        is_login: true,
        code: ''
      }
    },
    mounted() {
      let vm=this;
      vm.getUser();
    },
    methods: {
      getUser() {
        var vm= this;
        var access_token= Cookies.get('access_token');
        axios.post('/api/github/user', {token: access_token})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    components: {
    }
  }
</script>

