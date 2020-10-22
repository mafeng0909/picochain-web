<template>
  <div class="register-box">
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="front">
      <el-form ref="form" :model="form" label-width="90px" class="form">
        <span class="register-title">欢迎注册</span>
        <div style="margin-top: 5px"></div>
        <el-form-item label="用户名" class="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirmPassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-select v-model="form.city" placeholder="请选择地区" style="width: 100%">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
            <el-option label="广州" value="guangzhou"></el-option>
            <el-option label="深圳" value="shenzhen"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendVerifyCode">获取验证码</el-button>
          <el-button type="primary" @click="onSubmit">立即注册</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
      name: "register",
      data() {
        return {
          imgSrc: require('../assets/背景.jpg'),
          form: {
            username: '',
            password: '',
            confirmPassword: '',
            phone: '',
            code: '',
            city: ''
          },
        }
      },
      methods: {
        sendVerifyCode() {
          this.$http.post("/user/sendCode", "phone=" + this.form.phone);
        },
        onSubmit() {
          // 如果两次输入的密码相等，则进行注册
          if (this.form.password === this.form.confirmPassword) {
            this.$http.post("/user/register", this.$qs.stringify(this.form))
              .then(resp => {
                if (resp.status === 201) {
                  // 注册成功
                  alert("注册成功,即将跳转到登录页！");
                  setTimeout(() => window.location = '/login', 2000);
                }
              }).catch(() => alert("注册失败！"))
          }else {
            alert("密码重复输入错误！");
          }
        },
        cancel() {
          window.location = "http://www.picochain.com";
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

  .front{
    padding: 10px 10px 10px 10px;
    z-index: 1;
    position: absolute;
    margin-left: calc(calc(100vw - 400px) / 2);
    background-color: rgba(200, 200, 200, 0.5);
    border-color: rgba(200, 200, 200, 0.5);
    border-radius: 10px;
    top: 50px;
  }

  .register-title {
    text-align: center;
    color: white;
    font-size: 24px;
    color: rgba(50,50,50,0.8);
  }

</style>
