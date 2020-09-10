<template>
  <div id="login">
    <div class="login_box">
      <div class="img_box">
        <img src="../../assets/logo.png" alt=""/>
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="rules" lable-width="0" class="form_box">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghu"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" show-password></el-input>
        </el-form-item>

        <el-form-item class="login_button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Login from '../../api/login/login'
export default {
  name: "Login",
  data() {
    return {
      //登录表单数据绑定对象
      loginForm: {
        username: '',
        password: '',
      },
      //输入验证规则
      rules: {
        username: [
          {required:true, message: "请输入用户名", trigger: "blur" },
          {min: 3,max: 10,message: "长度在 3 到 10 个字符",trigger: "blur"}
        ],
        // password: [
        //   { required: true, message: "请输入密码", trigger: "blur" },
        //   { min: 6, max:15, message: "长度最小为6个字符", trigger: "blur" },
        // ],
      },
    } 
  },
  methods:{
    //登录方法
    login(){
      this.$refs.loginForm.validate((vaild)=>{
        if (!vaild) return console.log('验证失败')
        Login(this.loginForm).then((res) => {
          if(res.data.meta.status !==200) return this.$message.error('登录失败');
          this.$message({
          message: '登录成功',
          type: 'success'
           });
          window.sessionStorage.setItem('token',res.data.data.token) 
          this.$router.push('/home')
          // console.log(res.data);

    })
      })
      
    },
    //表单重置方法
    resetFrom(){
      // console.log(this.$refs)
      this.$refs.loginForm.resetFields()
    }
  }

};
</script>

<style lang="less" scoped>
#login {
  height: 100%;
  background-color: #2d4d6d;
  display: flex;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: aliceblue;
    margin: auto;
    box-shadow: 0 0 10px #fff;
    border-radius: 5%;
    .img_box {
      width: 150px;
      height: 150px;
      // border: 1px solid #000;
      margin: auto;
      border-radius: 50%;
      transform: translate(0, -50%);
      background-color: aliceblue;
      box-shadow: 0 0 5px #000;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }
    .form_box {
      padding: 0 20px;
      transform: translate(0, -30%);
    }
    .login_button {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>