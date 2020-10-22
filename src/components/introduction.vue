<template>
  <div class="introduction-box">
    <div class="background">
      <img :src="imgSrc" width="100%" height="158%" alt="" />
    </div>
    <div class="container">
      <el-container>
        <!--导航栏-->
        <el-header class="header-1">
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
        <el-main class="main-1">
          <!-- 内部导航 -->
<!--          <el-header class="header-2">-->
<!--            <el-page-header @back="goBack" content="基本介绍">-->
<!--            </el-page-header>-->
<!--          </el-header>-->
          <el-container>
            <!--左边栏-->
            <el-aside width="200px">
              <el-menu
                :default-active="flag"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title" @click="flag = 1">基本介绍</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title" @click="flag = 2">竞品分析</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-menu"></i>
                  <span slot="title" @click="flag = 3">核心优势</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-menu"></i>
                  <span slot="title" @click="flag = 4">发展历程</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <i class="el-icon-menu"></i>
                  <span slot="title" @click="flag = 5">组织架构</span>
                </el-menu-item>
                <el-menu-item index="6">
                  <i class="el-icon-menu"></i>
                  <span slot="title" @click="flag = 6">技术荣誉</span>
                </el-menu-item>
                <el-menu-item index="7">
                  <i class="el-icon-menu"></i>
                  <span slot="title" @click="flag = 7">SWOT分析</span>
                </el-menu-item>
              </el-menu>
            </el-aside>
            <!--内容-->
            <el-main class="main-2">
              <img :src="imgList[flag - 1].idView">
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
    import Cookies from "js-cookie";

    export default {
        name: "introduction",
      data() {
        return {
          imgSrc: require('../assets/背景.jpg'),
          imgList: [
            {id:0, idView: require('../assets/基本介绍1.png')},
            {id:1, idView: require('../assets/基本介绍2.png')},
            {id:2, idView: require('../assets/基本介绍3.png')},
            {id:3, idView: require('../assets/基本介绍4.png')},
            {id:4, idView: require('../assets/基本介绍5.png')},
            {id:5, idView: require('../assets/基本介绍6.png')},
            {id:6, idView: require('../assets/基本介绍7.png')},
          ],
          flag: '1',
          showUser: null,
        }
      },
      created() {
        this.$http.get("/auth/verify")
          .then(resp => this.showUser = resp.data);
      },
      methods: {
        // goBack() {
        //   window.location = "http://www.picochain.com";
        // },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
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

  .header-1 {
    /*background-color: #ffffff;*/
    color: #333;
    text-align: center;
    line-height: 40px;
  }

  .el-menu {
    font-size: 18px !important;
  }

  .main-1 {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    line-height: 80px;
  }

  .front{
    z-index: 1;
    position: absolute;
    top: 25px;
    margin-bottom: 5px;
    width: 100%;
    height: 100%;
  }

  .header-2 {
    color: white;
    font-size: 20px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .main-2 {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
