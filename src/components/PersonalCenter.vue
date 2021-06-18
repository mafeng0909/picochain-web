<template>
  <div class="home-box">
    <div class="background">
      <img :src="imgSrc" width="100%" height="105%" alt="" />
    </div>
    <div class="container">
      <!--导航栏-->
      <el-header class="header">
        <el-menu router
                 class="el-menu"
                 mode="horizontal"
                 @select="handleSelect"
                 background-color=transparent
                 text-color="#ffffff">
          <el-menu-item index="main">数字孪生身份许可公链</el-menu-item>
          <el-menu-item index="main">主页</el-menu-item>
          <el-menu-item index="introduction" route="introduction">基本介绍</el-menu-item>
          <el-submenu index="4" style="left: 750px" v-if="showUser !== null">
            <template slot="title">{{showUser.username}}</template>
            <el-menu-item index="PersonalCenter">个人中心</el-menu-item>
            <el-menu-item index="picochainRegister">链上注册</el-menu-item>
            <el-menu-item index="main" @click="exit">退出</el-menu-item>
          </el-submenu>
          <el-menu-item index="login" style="left: 750px" v-else>登录/注册</el-menu-item>
        </el-menu>
      </el-header>
      <!--主内容-->
      <el-main class="main">

        <div class="user">
          <h1>个人信息</h1>
          <el-card class="box-card box">
            <div>用户名: {{showUser.username}}</div>
            <el-divider></el-divider>
<!--            <div>picochain地址：{{showUser.address}}</div>-->
<!--            <el-divider></el-divider>-->
            <div>手机号：{{showUser.phone}}</div>
            <el-divider></el-divider>
            <div>城市：{{showUser.city}}</div>
          </el-card>
          <div class="btns">
            <el-button type="primary" @click="change=1">修改密码</el-button>
            <el-button type="primary" @click="change=2">修改手机号</el-button>
            <el-button type="primary" @click="change=3">修改城市</el-button>
            <el-button type="info" @click="exit">退出登录</el-button>
          </div>
          <div v-if="change === 1">
            <el-input v-model="oldPsw" placeholder="旧密码" class="width80"></el-input>
            <el-input v-model="newPsw" placeholder="新密码" class="width80"></el-input>
            <el-button @click="pswChange">修改</el-button>
          </div>
          <div v-if="change === 2">
            <el-input v-model="newPhone" placeholder="新手机号" class="width80"></el-input>
            <el-button type="primary" @click="descChange">修改</el-button>
          </div>
          <div v-if="change === 3">
            <el-input v-model="newCity" placeholder="新城市" class="width80"></el-input>
            <el-button type="primary" @click="descChange">修改</el-button>
          </div>
        </div>

      </el-main>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';

  export default {
    name: "PersonalCenter",
    data() {
      return {
        imgSrc: require('../assets/背景.jpg'),
        showUser: {
          username: "",
          address: "",
          phone: "",
          city: ""
        },
        fileList: [],
        oldPsw: "",
        newPsw: "",
        newPhone: "",
        newCity: "",
        change: ''
      };
    },
    created() {
      const token = Cookies.get("PC_TOKEN");
      if (token) {
        this.$http.get("/auth/verify")
          .then(resp => {
            this.showUser.username = resp.data.username;

            this.$http.post("/user/queryUser", this.$qs.stringify({"username": this.showUser.username}))
              .then(resp => {
                this.showUser.city = resp.data.city;
                this.showUser.phone = resp.data.phone;
              })
          });

      }else {
        window.location = "http://www.picochain.com/#/login";
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      exit() {
        // 删除cookie中的token即可
        Cookies.remove("PC_TOKEN", {
          path: "/",
          domain: "picochain.com"
        });
        window.location = "http://www.picochain.com";
      },
      pswChange () { // 修改密码
        if (this.newPsw) {
          this.$http.post("/user/changePsw", this.$qs.stringify({"username": this.showUser.username, "oldPsw": this.oldPsw, "newPsw": this.newPsw}))
            .then(resp => {
              if (resp.data) {
                this.newPsw = "";
                this.oldPsw = "";
                this.change = 0;
                window.alert("change success!!!")
              }else {
                this.newPsw = "";
                this.oldPsw = "";
                this.change = 0;
                window.alert("change filed!!!")
              }
              window.reload();
            })

        }


      },

      descChange () { // 修改个人简介
        if (this.newCity) {
          this.$http.post("/user/changeInfo", this.$qs.stringify(
            {"username": this.showUser.username,
                   "info": "city",
                   "data": this.newCity}))
            .then(resp => {
              if (resp.data) {
                this.showUser.city = resp.data.city;
                this.newCity = null;
                this.change = 0;
                window.alert("change success!!!");
              }else {
                this.newCity = null;
                this.change = 0;
                window.alert("change filed!!!");
              }
            })
        }else if (this.newPhone) {
          this.$http.post("/user/changeInfo", this.$qs.stringify(
            {"username": this.showUser.username,
                   "info": "phone",
                   "data": this.newPhone}))
            .then(resp => {
              if (resp.data) {
                this.showUser.phone = resp.data.phone;
                this.newPhone = null;
                this.change = 0;
                window.alert("change success!!!");
              }else {
                this.newPhone = null;
                this.change = 0;
                window.alert("change filed!!!");
              }
            })
        }

        this.getData();
      },
      getData() {
        const token = Cookies.get("PC_TOKEN");
        if (token) {
          this.$http.get("/auth/verify")
            .then(resp => {
              this.showUser.username = resp.data.username;

              this.$http.post("/user/queryUser", this.$qs.stringify({"username": this.showUser.username}))
                .then(resp => {
                  this.showUser.city = resp.data.city;
                  this.showUser.phone = resp.data.phone;
                })
            });

        }else {
          window.location = "http://www.picochain.com/#/login";
        }
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

  .container {
    top: 0px;
    margin-bottom: 5px;
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .header {
    /*background-color: #ffffff;*/
    color: #333;
    text-align: center;
    line-height: 40px;
  }

  .el-menu {
    font-size: 18px !important;
  }

  .main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    line-height: 80px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #333366;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #333366;
  }
</style>
