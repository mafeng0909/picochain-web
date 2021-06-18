<template>
  <div class="user">
    <h1>个人信息</h1>
    <el-card class="box-card box">
      <div>用户名: {{userName}}</div>
      <el-divider></el-divider>
      <div>已绑定钱包地址：{{address}}</div>
      <el-divider></el-divider>
      <div>个人简介：{{desc}}</div>
    </el-card>
    <div class="btns">
      <el-button @click="change=1">修改密码</el-button>
      <el-button type="primary" @click="change=2">修改个人简介</el-button>
      <el-button type="info" @click="$router.push('/login')">退出登录</el-button>
    </div>
    <div v-if="change===1">
      <el-input v-model="oldPsw" placeholder="旧密码" class="width80"></el-input>
      <el-input v-model="newPsw" placeholder="新密码" class="width80"></el-input>
      <el-button @click="pswChange">修改</el-button>
    </div>
    <div v-if="change===2">
      <el-input v-model="newDesc" placeholder="新个人描述" class="width80"></el-input>
      <el-button @click="descChange">修改</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      address: '',
      desc: '',
      userName: '',
      oldPsw: '',
      newPsw: '',
      change: '',
      newDesc: ''
    }
  },
  methods: {
    pswChange () { // 修改密码
      const that = this
      fetch('http://localhost:3000/changepsw', {
        method: 'POST',
        body: JSON.stringify({
          userName: that.userName,
          oldPsw: that.oldPsw,
          newPsw: that.newPsw
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
        .then(json => {
          console.log(json)
          that.$alert(json.ret_msg, '提示', {
            confirmButtonText: '确定'
          })
          that.$router.push('/login')
        })
    },
    descChange () { // 修改个人简介
      const that = this
      fetch('http://localhost:3000/changedesc', {
        method: 'POST',
        body: JSON.stringify({
          userName: that.userName,
          newDesc: that.newDesc
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
        .then(json => {
          console.log(json)
          that.$alert(json.ret_msg, '提示', {
            confirmButtonText: '确定'
          })
          this.getUserData()
        })
    },
    getUserData () { // 获取用户数据
      const that = this
      fetch('http://localhost:3000/getuserdata', {
        method: 'POST',
        body: JSON.stringify({
          userName: that.userName
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response => response.json())
        .then(json => {
          console.log(json)
          that.desc = json[0].user_desc
          that.address = json[0].address
        })
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
    }
    this.getUserData()
  }
}
</script>
<style lang="less" scoped>
.user {
  width: 100%;
}
.user-block{
  padding: 10px 20px;
  background-color: rgba(241, 241, 243, 0.877);
  text-align: left;
}
.box {
  text-align: left;
  width: 600px;
  margin: 0 auto;
  position: relative;
}
.btns {
  margin: 20px;
}
.width80{
  width: 300px;
  margin: 10px;
}
</style>
