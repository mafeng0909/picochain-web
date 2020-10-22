<template>
  <div class="home-box">
    <div class="background">
      <img :src="imgSrc" width="100%" height="120%" alt="" />
    </div>
    <div class="container">
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
      <!--导航栏-->
<!--      <el-header class="header">-->
<!--        <el-page-header @back="goBack" content="公链注册" style="color: white; margin-top: 15px">-->
<!--        </el-page-header>-->
<!--      </el-header>-->
      <!--主内容-->
      <el-main class="main">
        <div>
          <el-header class="header2">
            <el-steps :active="index - 1" finish-status="success" simple style="margin-top: 0px">
              <el-step title="上传图片" ></el-step>
              <el-step title="生成证明" ></el-step>
              <el-step title="认证交易" ></el-step>
              <el-step title="注册交易" ></el-step>
            </el-steps>
          </el-header>
          <el-main class="main2">
            <!-- 步骤一：上传图片 -->
            <el-upload
              class="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              multiple="true"
              list-type="picture"
              v-show="index === 1">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" style="margin-top: -40px; color: white">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div style="color: white" v-show="index === 1 && isSuccess === 1">验证成功</div>
            <div style="color: white" v-show="index === 1 && isSuccess === 2">验证失败</div>
            <el-button v-show="index === 1" type="primary" @click="back">返回</el-button>
            <el-button v-show="index === 1" type="primary" @click="checkImages">进行初步认证</el-button>
            <el-button v-show="index === 1 && isSuccess === 1" type="primary" @click="nextStep">下一步</el-button>

            <!-- 步骤二：生成证明 -->
            <el-button v-show="index === 2" type="primary" @click="beforeStep">上一步</el-button>
            <el-button v-show="index === 2" type="primary" @click="generateProof">生成证明</el-button>
            <el-button v-show="index === 2" type="primary" @click="nextStep">下一步</el-button>

            <!-- 步骤三：认证交易 -->
            <el-button v-show="index === 3" type="primary" @click="beforeStep">上一步</el-button>
            <el-button v-show="index === 3" type="primary" @click="createCertifiedTx">认证交易</el-button>
            <el-button v-show="index === 3" type="primary" @click="nextStep">下一步</el-button>

            <!-- 步骤四：注册交易 -->
            <el-button v-show="index === 4" type="primary" @click="beforeStep">上一步</el-button>
            <el-button v-show="index === 4" type="primary" @click="createRegisterTx">注册交易</el-button>
            <el-button v-show="index === 4" type="primary" @click="nextStep">完成</el-button>
          </el-main>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';

    export default {
        name: "picochainRegister",
      data() {
        return {
          imgSrc: require('../assets/背景.jpg'),
          index: 1,
          fileList: [],
          showUser: null,
          path: {
            path1: "",
            path2: "",
          },
          flag: 0,
          isSuccess: 0,
        };
      },
      created() {
        const token = Cookies.get("PC_TOKEN");
        if (token) {
          this.$http.get("/auth/verify")
            .then(resp => this.showUser = resp.data);
        }else {
          window.location = "http://www.picochain.com/#/login";
        }
      },
      methods: {
        // goBack() {
        //   window.location = "http://www.picochain.com";
        // },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleSuccess(res, file) {//图片上传成功
          console.log(res);
          console.log(file);
          if (this.flag === 0) {
            this.path.path1 = "F:\\IdeaProjects\\picochain-web\\src\\picture\\"+ file.name;
            this.flag++;
          }else if (this.flag === 1) {
            this.path.path2 = "F:\\IdeaProjects\\picochain-web\\src\\picture\\"+ file.name;
            this.flag++;
          }
        },
        checkImages() {
          this.$http.post("/face/verifyFace", this.$qs.stringify(this.path))
            .then(resp => {
              if (resp.data) {
                this.isSuccess = 1;
              }else {
                this.isSuccess = 2;
              }
            })
        },
        generateProof() {

        },
        createCertifiedTx() {

        },
        createRegisterTx() {

        },
        back() {
          window.location = "http://www.picochain.com";
        },
        beforeStep() {
          this.index--;
        },
        nextStep() {
          this.index++;
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

  .background {
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

  .main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    line-height: 80px;
  }

  .header2 {
    color: #333;
    text-align: center;
    line-height: 20px;
  }

  .upload {
    width: 50%;
    text-align: left;
  }
</style>
