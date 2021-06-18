<template>
  <div>
    <h1>作品发布</h1>
    <div style="text-align: left" class="status">
      <el-steps :active="active" finish-status="success">
        <el-step title="选择文件"></el-step>
        <el-step title="填写信息"></el-step>
        <el-step title="发布结果"></el-step>
      </el-steps>
    </div>
    <el-upload
      v-if="active === 0"
      class="upload-demo"
      :on-preview="handlePreview"
      :auto-upload="false"
      drag
      action=""
      :limit="1"
      :on-change="handleChange"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="pre-view" v-if="active === 1">
      <div>
        <el-image
        style="width: 400px; height: 300px"
        :src="imgUrl"
        fit="contain">
        </el-image>
        <el-form ref="form"  label-width="80px">
          <el-form-item label="作品名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="作品描述">
            <el-input type="textarea" v-model="desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="start">立即发布</el-button>
            <el-button @click="active=0">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="active===3">
        <el-image
          style="width: 400px; height: 300px"
          :src="imgUrl"
          fit="contain">
        </el-image>
      <div v-if="pid!=''">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>存证ID：{{pid}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="jumpToPic(pid)">查看作品详情页面</el-button>
          </div>
          <span>作品ipfs地址：{{ipfsHash}}</span>
          <el-divider class="remar"></el-divider>
          <span>作者地址：{{result.from}}</span>
          <el-divider class="remar"></el-divider>
          <span>合约地址：{{result.to}}</span>
          <el-divider class="remar"></el-divider>
          <span>交易哈希：{{result.transactionHash}}</span>
          <el-divider class="remar"></el-divider>
          <span>区块编号：{{result.blockNumber}}</span>
          <el-divider class="remar"></el-divider>
          <span>区块哈希：{{result.blockHash}}</span>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>




import ipfsApi from 'ipfs-api'

// 链接IPFS节点
//const ipfs = ipfsApi({ host: '47.107.181.44', port: '5001', protocol: 'http' })
const ipfs = ipfsApi({ host: 'localhost', port: '5001', protocol: 'http' })



export default {
  data () {
    return {
       ipfsHashed: [],
       flag:true,
      pid: '',
      name: '',
      desc: '',
      userName: '',
      active: 0,
      result: '',
      ipfsHash: '',
      blockHash: '',
      ipfsUrl: '',
      img: null,
      imgUrl: '',
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg'
      },
      
    }
  },
  methods: {
    start () {
      console.log("1111")
      console.log(this.img)
      const reader = new FileReader()
      //var hash = new String()
      reader.readAsArrayBuffer(this.img)
      reader.onload = () => {
        this.saveToIpfs(reader).then((hash) => {
          console.log("122")
          console.log(hash)
          console.log("hash:"+typeof(hash));
           console.log("1xxx")
          this.ipfsHash = hash
          console.log("70")
          //this.ipfsUrl = 'http://47.107.181.44:8080/ipfs/' + hash
          this.ipfsUrl = 'http://127.0.0.1:8080/ipfs/' + hash
          console.log("6")
          console.log(hash)
          console.log(this.name)
          console.log(this.desc)
           

           //var flag =true
            //var ipfsHashed = new Array()
          for(var j=0; j<this.ipfsHashed.length; j++){
           if(this.ipfsHashed[j].ipfs==hash){
             this.$alert('作品已存在', '上传失败 ', {
            confirmButtonText: '确定'

            
          })
           this.flag =  false
          console.log('作品已经存在')
             break
          }
          console.log(this.ipfsHashed[j].ipfs)
          console.log(typeof(this.ipfsHashed))
          }
          
          if(this.flag == true){
            console.log('此时，flag=')
            console.log(this.flag)
            this.toBlock(hash)
        }
           
           
         // this.toBlock(hash)
          console.log("000")
        })
      }
      this.next()
      console.log(active)
       console.log("110")
    },
    
   
   
   saveToIpfs (reader) { // 上传文件到IPFS
      return new Promise(function (resolve, reject) {
        const buffer = Buffer.from(reader.result)
        console.log(buffer)
        ipfs.add(buffer).then((response) => {
          console.log(buffer)
          console.log(response)
          console.log(response[0])
          console.log(response[0].Hash)
          resolve(response[0].Hash)
        }).catch((err) => {
          console.error(err)
          reject(err)
        })
      })
    },
   
   

    toBlock (hash) { // 上链

      const that = this
      window.Contract.methods.proof(hash,that.name,that.desc).send({ from: window.userA }).then(function (result) {
      //window.Contract.methods.proof(hash).send({ from: window.userA }).then(function (result) {
        that.$alert('发布成功', '提示', {
          confirmButtonText: '确定'
        })
        that.result = result
        console.log(result)
        //监听事件
        that.pid = result.events.sendResult.returnValues.pid
        console.log(result.events.sendResult)
         console.log(result.events.sendResult.returnValues)
        that.saveToServe({
          pid: that.pid,
          name: that.name,
          author: that.userName,
          ipfsHash: hash,
          desc: that.desc,
          address: window.userA
        })
      })
    },
    
    
    
    saveToServe (bodyData) { // 服务端备份
      fetch('http://localhost:3000/new', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json()).then(json => console.log(json))
      this.next()
    },

    getipfsHash () {
       const that = this
      fetch('http://localhost:3000/ipfsHashed')
        .then(function (response) {
          
         return response.json()
          
        })
        .then(function (myJson) {
          that.ipfsHashed = myJson
          console.log(myJson)
          console.log(that.ipfsHashed)
       //   console.log(response.json())
        })
    },



    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleChange (file, fileList) {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        this.imgUrl = reader.result
      }
      this.img = file.raw
      this.next()
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    jumpToPic (pid) {
      this.$router.push({ path: 'pic', query: { pid: pid } })
    }
  },
 
 
 
 created () {
   

    if (!this.global.userName) {
      this.$alert('请先登录', '未登录', {
        confirmButtonText: '确定'
      })
      this.$router.push('/login')
    } else {
      this.userName = this.global.userName
      console.log(window.userA)
    }
this.getipfsHash()
   console.log(this.ipfsHashed[0])



  }
}
</script>
<style lang="less" scoped>
.status {
  width: 80%;
  margin: 0 auto;
}
.pre-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.result-block {
  margin: 0 auto;
  padding: 10px 20px;
  background-color: rgba(245, 240, 240, 0.877);
  text-align: left;
  .remar {
    margin: 5px 0;
  }
}
.re {
  margin: 0 0;
}
.result {
  width: 500px;
  margin: 0 0;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 600px;
    margin: 0 auto;
    text-align: left;
  }
</style>
