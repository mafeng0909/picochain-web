<template>
  <div class="home">
    <h1 class="title">作品列表</h1>
    <div class="main">
      <div class="pics">
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in items" :key="item.id">
            <el-card :body-style="{ padding: '0px' }" style="margin-top: 20px">
              <img :src="'http://172.31.100.210:8080/ipfs/'+item.ipfs"  style="width: 200px; height: 150px">
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <div class="bottom clearfix">
                  <span class="time">{{item.author}}</span>
                  <el-button type="text" class="button" @click="jumpToPic(item.pid)">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data () {
    return {
      user: '',
      items: []
    }
  },
  methods: {
    // 获取作品列表数据
    getData () {
      this.$http.get("share/getData")
        .then(resp => {
          this.items = resp.data;
          // window.alert("test success!!!")
        })
    },
    jumpToPic (pid) {
      this.$router.push({ path: 'pic', query: { pid: pid } })
    }
  },

  //在创建vue对象时，当html渲染之前就触发；但是注意，全局vue.js不强制刷新或者重启时只创建一次，也就是说，created()只会触发一次；
  created () {
    // console.log(window.userA)
    // this.user = window.userA
    this.getData()
  }
}
</script>
<style scoped>
.main {
  width: 100%;
  .title {
    background-color: #E8FFE8;
  }
  .pics {
    overflow: auto;
    padding: 24px 24px;
    .item-container {
      margin-bottom: 25px;
      overflow: auto;
      height: 100%;
      border-radius: 5%;
      background-color: rgb(255, 255, 255);
      .author {
        padding: 10px 10px;
        background-color: #fff;
        color: black;
      }
      .pic-title {
        font-size: 1rem;
      }
    }
  }
  .end {
    height: 7rem;
  }
}

.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  padding: 0;
  float: right;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>
