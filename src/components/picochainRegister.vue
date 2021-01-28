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
              <el-step title="人脸校验" ></el-step>
              <el-step title="生成证明" ></el-step>
              <el-step title="认证交易" ></el-step>
              <el-step title="注册交易" ></el-step>
            </el-steps>
          </el-header>
          <el-main class="main2">
            <!-- 步骤一：上传图片 -->
            <div>
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
            </div>
            <div style="color: white" v-show="index === 1 && isSuccess_face === 1">验证成功</div>
            <div style="color: white" v-show="index === 1 && isSuccess_face === 2">验证失败</div>
            <div>
              <el-button v-show="index === 1" type="primary" @click="back">返回</el-button>
              <el-button v-show="index === 1" type="primary" @click="checkImages">进行初步认证</el-button>
              <el-button v-show="index === 1 && isSuccess_face === 1" type="primary" @click="nextStep">下一步</el-button>
            </div>

            <!-- 步骤二：生成证明 -->
            <div style="color: white" v-show="index === 2 && isSuccess_proof === 1">proof生成成功</div>
            <div style="color: white" v-show="index === 2 && isSuccess_proof === 2">proof生成失败</div>
            <div>
              <el-button v-show="index === 2" type="primary" @click="beforeStep">上一步</el-button>
              <el-button v-show="index === 2" type="primary" @click="generateProof">生成证明</el-button>
              <el-button v-show="index === 2 && isSuccess_proof === 1" type="primary" @click="nextStep">下一步</el-button>
            </div>

            <!-- 步骤三：认证交易 -->
            <div class="mpAddress" style="color: white">
              <el-form ref="form" :model="form1" label-width="110px" v-show="index === 4">
                <el-form-item label="身份证号">
                  <el-col :span="20">
                    <el-input v-model="form.id_card" placeholder="请输入一次性地址"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="一次性地址密码">
                  <el-col :span="20">
                    <el-input v-model="form.temp_address_password" placeholder="请输入一次性地址密码"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
            <div style="color: white" v-show="index === 3 && isSuccess_tx === 1">发送认证交易...</div>
            <div style="color: white" v-show="index === 3 && isSuccess_tx === 2">认证交易打包成功</div>
            <div style="color: white" v-show="index === 3 && isSuccess_tx === 3">认证交易打包失败</div>
            <div>
              <el-button v-show="index === 3" type="primary" @click="beforeStep">上一步</el-button>
              <el-button v-show="index === 3" type="primary" @click="createTempAddress">生成一次性地址</el-button>
              <el-button v-show="index === 3" type="primary" @click="createCertifiedTx">认证交易</el-button>
              <el-button v-show="index === 3 " type="primary" @click="nextStep">下一步</el-button>
            </div>

            <!-- 步骤四：注册交易 -->
            <div class="signature" style="color: white">
              <el-form ref="form" :model="form" label-width="110px" v-show="index === 4">
                <el-form-item label="一次性地址">
                  <el-col :span="20">
                    <el-input v-model="form.temp_address" placeholder="请输入一次性地址"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="一次性地址密码">
                  <el-col :span="20">
                    <el-input v-model="form.temp_address_password" placeholder="请输入一次性地址密码"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="主地址">
                  <el-col :span="20">
                    <el-input v-model="form.main_address" placeholder="请输入主地址"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
            <div style="color: white" v-show="index === 4 && isSuccess_tx === 4">环签名生成成功</div>
            <div style="color: white" v-show="index === 4 && isSuccess_tx === 5">发送注册交易...</div>
            <div style="color: white" v-show="index === 4 && isSuccess_tx === 6">注册交易打包成功</div>
            <div style="color: white" v-show="index === 4 && isSuccess_tx === 6">恭喜您，注册成功!!!</div>
            <div style="color: white" v-show="index === 4 && isSuccess_tx === 7">注册交易打包失败</div>
            <div>
              <el-button v-show="index === 4" type="primary" @click="beforeStep">上一步</el-button>
              <el-button v-show="index === 4" type="primary" @click="generateSignature">生成环签名</el-button>
              <el-button v-show="index === 4" type="primary" @click="createRegisterTx">注册交易</el-button>
              <el-button v-show="index === 4 && isSuccess_tx === 6" type="primary" @click="finished">完成</el-button>
            </div>
          </el-main>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import ringVerifier from '../eth/ringVerifier';
  import web3 from '../eth/web3';
  import zkpVerifier from "../eth/zkpVerifier";

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
          isSuccess_face: 0,
          isSuccess_proof: 0,
          isSuccess_tx: 0,
          contractParams: {
            paramA1: "",
            paramA2: "",
            paramB1: "",
            paramB2: "",
            paramB3: "",
            paramB4: "",
            paramC1: "",
            paramC2: "",
          },
          form: {
            temp_address: '',
            temp_address_password: '',
            main_address: '',
          },
          form1: {
            id_card: '',
            temp_address_password: '',
          }
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
      watch: {

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
            this.path.path1 = "/home/mafeng/IdeaProjects/picochain-web/src/picture/"+ file.name;
            this.flag++;
          }else if (this.flag === 1) {
            this.path.path2 = "/home/mafeng/IdeaProjects/picochain-web/src/picture/"+ file.name;
            this.flag++;
          }
        },
        checkImages() {
          this.$http.post("/face/verifyFace", this.$qs.stringify(this.path))
            .then(resp => {
              if (resp.data) {
                this.isSuccess_face = 1;
              }else {
                this.isSuccess_face = 2;
              }
            })
        },
        generateProof() {
          this.$http.get("/zksnark/generateProof")
            .then(resp => {
              if (resp.data) {
                this.isSuccess_proof = 1;
              }else {
                this.isSuccess_proof = 2;
              }
            })
        },
        createTempAddress() {
          // 生成一次性地址

        },
        createCertifiedTx() {

          let A, B, C;

          this.$http.get("/blockchain/contractParams")
            .then(resp => {
              this.contractParams.paramA1 = resp.data.paramA1;
              this.contractParams.paramA2 = resp.data.paramA2;
              this.contractParams.paramB1 = resp.data.paramB1;
              this.contractParams.paramB2 = resp.data.paramB2;
              this.contractParams.paramB3 = resp.data.paramB3;
              this.contractParams.paramB4 = resp.data.paramB4;
              this.contractParams.paramC1 = resp.data.paramC1;
              this.contractParams.paramC2 = resp.data.paramC2;

              // 将读取的proof_data转成对应坐标
              A = [this.contractParams.paramA1, this.contractParams.paramA2];
              console.log(A);
              B = [[this.contractParams.paramB1, this.contractParams.paramB2], [this.contractParams.paramB3, this.contractParams.paramB4]];
              console.log(B);
              C = [this.contractParams.paramC1, this.contractParams.paramC2];
              console.log(C);

              this.isSuccess_tx = 1;

              void async function(_this) {
                // 读取钱包账户
                const accounts = await web3.eth.getAccounts();
                console.log('Sending from Metamask account: ' + accounts[0])

                const ethAddress= await zkpVerifier.options.address;
                console.log(ethAddress)

                zkpVerifier.methods.verifyProof(A, B, C, [90]).send({
                  from: accounts[0]
                }, (error, transactionHash) => {
                  if (error) {
                    console.log(error);
                  } else{
                    console.log(transactionHash);
                    // 创建合约监听事件
                    zkpVerifier.once("IsVerified", {
                      filter:{},
                      fromBlock: 0
                    }, function(error, event){
                      console.log(event.returnValues.isVerified);
                        if (event.returnValues.isVerified) {
                          _this.isSuccess_tx = 2;
                        }else {
                          _this.isSuccess_tx = 3;
                        }
                    })
                  }
                }); //verifier
              }(this)

            })

        },
        generateSignature() {
          // 生成环签名，成功后将isSuccess_tx置为4
          void async function(_this) {
            console.log('中间地址：' + _this.form.temp_address);
            console.log('密码：' + _this.form.temp_address_password);
            console.log('中间地址：' + _this.form.main_address);

            _this.sign = await web3.eth.personal.signRingSignature(_this.form.temp_address, _this.form.temp_address_password, _this.form.main_address);
            _this.isSuccess_tx = 4;
          }(this)
        },
        createRegisterTx() {
          // 发送环签名验证交易，在发送交易时将isSuccess_tx置为5，验证成功后将isSuccess_tx置为6
          void async function(_this) {
            const accounts = await web3.eth.getAccounts();
            // console.log('中间地址：' + accounts[0])
            // const sign = await web3.eth.personal.signRingSignature(accounts[0], '123', accounts[1]);
            console.log('Get ring signature ' + _this.sign);

            const ethAddress= await ringVerifier.options.address;
            console.log(ethAddress)

            _this.isSuccess_tx = 5;

            ringVerifier.methods.verify(_this.sign).send({
              from: accounts[0],
              gas: 3000000
            }, (error, transactionHash) => {
              if (error) {
                console.log(error);
              } else{
                console.log(transactionHash);
                // 创建合约监听事件
                ringVerifier.once("Verify", {
                  filter:{},
                  fromBlock: 0
                }, function(error, event){
                  console.log(event);
                  console.log(event.returnValues.ok);
                  if (event.returnValues.ok) {
                    _this.isSuccess_tx = 6;
                  }else {
                    _this.isSuccess_tx = 7;
                  }
                  // console.log(_this.isSuccess_tx);
                })
              }
            }); //zkpVerifier

          }(this)
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
        finished() {
          window.location = "http://www.picochain.com/#/PersonalCenter";
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
    z-ind: 1;
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
    text-align: center;
    display: inline-block;
  }

  .signature {
    width: 40%;
    text-align: center;
    display: inline-block;
  }

</style>
