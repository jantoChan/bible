<template>
    <div>
        <el-input
                placeholder="请输入Token"
                suffix-icon="el-icon-date"
                v-model="token">
        </el-input>
        <el-button @click="punch">签到</el-button>
    </div>
</template>

<script>
	import axios from "axios";
	export default {
		name: "index",
        data() {
			return {
				token: ''
            }
        },
        methods: {
	        punch() {
                let vm= this;
		        axios.post('/api/punch', {token: this.token})
			        .then(function (response) {
				        vm.is_loading= false;
				        if (response.status === 200) {

				        }
			        })
			        .catch(function (error) {
				        vm.$message({
					        message: error,
					        type: 'error'
				        });
			        });
            }
        }
	}
</script>

<style scoped>

</style>