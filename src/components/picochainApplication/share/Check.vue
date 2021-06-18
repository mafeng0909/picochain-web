<template>
  <div>
    <h1>存证查询</h1>
    <div>
      <div v-if="!result">
        <el-input v-model="input" placeholder="请输入作品的存证ID" class="serch-input"></el-input>
        <el-button @click="check">查询</el-button>
      </div>
      <div v-else>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>查询结果</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="jumpToPic(input)">前往作品详情页面</el-button>
          </div>

          <span>作品名：{{result.name}}</span>
          <el-divider class="remar"></el-divider>
           <span>作品id：{{result.pid}}</span>
          <el-divider class="remar"></el-divider>
          <span>作品ipfs地址：{{result.ipfsAddress}}</span>
          <el-divider class="remar"></el-divider>
          <span>作者地址：{{result.author}}</span>
          <el-divider class="remar"></el-divider>
          <span>存证合约地址：{{ctAddress}}</span>
          <el-divider class="remar"></el-divider>
          <span>存证时间：{{result.time}}</span>
           <el-divider class="remar"></el-divider>
          <span>当前获赞数：{{result.likeCount}}</span>
          
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
// import sha256 from 'crypto-js/sha256'
export default {
  
  data () {
    return {
      ctAddress: window.Caddress,
      input: '',
      result: null
    }
  },

  
  methods: {
    check () {
      const that = this
      // 调用合约存证查询接口
      window.Contract.methods.getProofBypid(this.input).call().then(function (result) {
        console.log(result)
        if (result[1] === '') {
          that.$alert('存证不存在', '查询失败', {
            confirmButtonText: '确定'
          })
        } else {
          // that.result = {}
          // that.result.author = result[0]
          // that.result.ipfsAddress = result[1]
          // that.result.likeCount = result[2]
          // that.result.time = new Date(result[3] * 1000)
        
        //修改部分：
         that.result = {}
          that.result.author = result[0]
          that.result.ipfsAddress = result[1]
          that.result.likeCount = result[2]
          that.result.time = new Date(result[3] * 1000)
           that.result.pid = result[5]
          that.result.name = result[6]
           
        
        
        }
      })
    },
    jumpToPic (pid) {
      this.$router.push({ path: 'pic', query: { pid: pid } })
    }
  }
}
</script>
<style lang="less" scoped>
.serch-input {
  width: 80%;
  margin: 10px;
}
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
