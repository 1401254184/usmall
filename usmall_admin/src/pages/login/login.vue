<template>
  <div class="box">
      <div class="con">
          <h1>登录</h1>
          <el-input  placeholder="请输入内容" v-model="user.username" clearable></el-input>
          <el-input  placeholder="请输入内容" v-model="user.password" show-password clearable></el-input>
          <el-button type="primary" @click="login">登录</el-button>
      </div>
  </div>
</template>
<script>
import {requestManageLogin} from '../../util/request'
export default {
  components: {},
  data() {
    return {
        user:{
            username:'',
            password:""
        }
    };
  },
  methods: {
      login(){
        requestManageLogin(this.user).then(res=>{
            if(res.data.code==200){
                this.$router.push('/')
            }
        })

      }
  },
  mounted() {},
};
</script>
<style scoped>
.box{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#563443,#2F3D60);
}
.con{
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
   text-align: center;
   position: fixed;
   left: 50%;
   top: 50%;
 transform: translate(-50%, -50%);
}
.con h1{
    line-height: 60px;
}
.el-input {
    margin-bottom: 20px;
}
.el-button{
    width: 400px;
}
</style>