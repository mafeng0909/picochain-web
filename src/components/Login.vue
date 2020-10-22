<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="login-box">
      <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
      <el-form :rules="loginFormRules" ref="loginForm" :model="loginForm" label-position="right" label-width="auto" show-message>
        <span class="login-title">欢迎登录</span>
        <div style="margin-top: 5px"></div>
        <el-form-item label="用户名" prop="loginName" class="loginName">
          <el-col :span="22">
            <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="loginPassword">
          <el-col :span="22">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit">登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        imgSrc: require('../assets/背景.jpg'),
        loginForm: {
          username: '',
          password: ''
        },
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        loginFormRules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      loginSubmit() {
        this.$http.post("/auth/accredit", this.$qs.stringify(this.loginForm))
          .then(resp => {
            if (resp.status === 200) {
              window.location = "http://www.picochain.com";
            }
          })
          .catch(() => this.msg = '用户名或者密码错误');
      },
      register() {
        window.location = "http://www.picochain.com/#/register";
      }
    }
  }
</script>

<style scoped>

  .background{
    width: 100%;
    height: 100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index: -1;
    position: absolute;
    top: 0px;
  }

  .login-box {
    z-index: 1;
    position: absolute;
    /*border: 1px solid #DCDFE6;*/
    /*width: 350px;*/
    /*margin: 180px auto;*/
    padding: 35px 35px 15px 35px;
    /*border-radius: 50px;*/
    /*-webkit-border-radius: 5px;*/
    /*-moz-border-radius: 5px;*/
    /*box-shadow: 0 0 25px palegreen;*/
    margin-top: 10%;
    margin-left: calc(calc(100vw - 400px) / 2);
    background-color: rgba(200, 200, 200, 0.5);
    border-color: rgba(200, 200, 200, 0.5);
    border-radius: 10px;
  }

  .login-title {
    text-align: center;
    /*margin: 0 auto 40px auto;*/
    /*color: #66CD00;*/
    /*font-size: 30px;*/
    /*font-weight: bold;*/
    color: white;
    font-size: 24px;
    color: rgba(50,50,50,0.8);
  }

</style>

