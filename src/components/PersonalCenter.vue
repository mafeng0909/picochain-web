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
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
        showUser: null,
        fileList: []
      };
    },
    created() {
      this.$http.get("/auth/verify")
        .then(resp => this.showUser = resp.data);
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
