<template>
  <div>
    <h1>作品查看</h1>
    <el-image
      style="width: 400px; height: 300px"
      :src="'http://127.0.0.1:8080/ipfs/'+ipfsHash"
      fit="contain" v-if="ipfsHash!==''">
    </el-image>
    <el-card class="box-card box">
      <span>作品名称:{{name}}</span>
      <el-divider></el-divider>
      <span>作者:{{author}}</span>
      <el-divider></el-divider>
      <span>作者地址:{{address}}</span>
      <el-divider></el-divider>
      <span>存证ID:{{pid}}</span>
      <el-divider></el-divider>
      <div>作品简介：{{desc}}</div>
      <el-divider></el-divider>
      <span>获赞数:{{likeCount}}</span>
      <el-divider></el-divider>
      <span>上传时间：{{time}}</span>
      <el-divider></el-divider>
      <el-button type="primary" icon="el-icon-star-off" @click="like(pid)">点赞</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="inputComment=1">评论</el-button>
    </el-card>
    <el-input type="textarea" v-model="content"  v-if="inputComment===1" placeholder="请输入评论内容" class="width50"></el-input>
    <el-button type="primary" @click="comment" v-if="inputComment===1" style="dsiplay:block">提交评论</el-button>
    <el-card class="box-card box" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <h2>评论内容</h2>
      </div>
      <div v-if ="comments.length===0">
        暂无评论内容
      </div>
      <div v-else>
        <div v-for="(item,index) in comments" :key="index">
          <div>{{item.user_name}}:</div>
          <div>{{item.content}}</div>
          <div>{{new Date(item.time * 1000)}}</div>
          <el-divider></el-divider>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import initWeb3 from '../utils/initWeb3'
// import sha256 from 'crypto-js/sha256'
export default {
  data () {
    return {
      id: '',
      name: '',
      desc: '',
      address: '',
      pid: '',
      author: '',
      ipfsHash: '',
      time: '',
      likeCount: '',
      inputComment: 0,
      comments: [],
      content: '',
      userName: ''
    }
  },
  methods: {
    like (pid) {
      const that = this
      // 调用合约点赞接口
      window.Contract.methods.like(pid).send({ from: window.userA }).then(function (result) {
        that.$alert('点赞成功', '提示', {
          confirmButtonText: '确定'
        })
        console.log(result)
        that.initData()
      })
    },
    initData () {
      const that = this
      // 调用存证查询接口
      window.Contract.methods.getProofBypid(this.pid).call().then(function (result) {
        that.address = result[0]
        that.ipfsHash = result[1]
        that.likeCount = result[2]
        that.time = new Date(result[3] * 1000)
        that.desc = result[4]
        that.pid = result[5]
        that.name = result[6]
        that.getComment()
      })
    },
    comment () {
      const that = this
      if (!this.global.userName) {
        that.$alert('请先登录', '未登录', {
          confirmButtonText: '确定'
        })
        this.$router.push('/login')
      } else {
        // 发布评论
        fetch('http://localhost:3000/comment', {
          method: 'POST',
          body: JSON.stringify({
            workId: that.id,
            userName: that.userName,
            content: that.content
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(response => response.json()).then(() => {
          that.$alert('评论成功', '提示', {
            confirmButtonText: '确定'
          })
          that.getComment()
        })
      }
    },
    getComment () { // 获取评论列表
      const that = this
      fetch('http://localhost:3000/getcomment', {
        method: 'POST',
        body: JSON.stringify({
          workId: that.id
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json()).then(json => {
        console.log(json)
        that.comments = json
        console.log(that.conments)
      })
    }
    // getData () {
    //   const that = this
    //   fetch('http://localhost:3000/data')
    //     .then(function (response) {
    //       return response.json()
    //     })
    //     .then(function (myJson) {
    //       console.log(myJson)
    //       const item = myJson.find(item => {
    //         return item.pid + '' === that.pid
    //       })
    //       //修改区域：
    //       // that.id = item.id
    //       // that.name = item.name
    //       // that.desc = item.work_desc
    //       // that.author = item.author
    //       // that.address = item.address
    //       // that.ipfsHash = item.ipfs
    //       that.getComment()
    //     })
    // }
  },
  created () {
    this.pid = location.href.split('?')[1].split('=')[1]
    if (!window.Contract) {
      initWeb3(this.initData)
    } else {
      this.initData()
    }
    if (!this.global.userName) {
      this.$alert('请先登录', '未登录', {
        confirmButtonText: '确定'
      })
      this.$router.push('/login')
    } else {
      this.userName = this.global.userName
    }
    // this.getData()
  }
}

</script>
<style lang="less" scoped>
.pre-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    width:auto;
    height:auto;
    max-width:100%;
    max-height:100%;
  }
}
.box {
  text-align: left;
  width: 600px;
  margin: 0 auto;
  position: relative;
}
.width50{
  width: 480px;
  margin: 10px;
}
</style>
