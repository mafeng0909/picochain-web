<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/share/home">作品浏览</el-menu-item>
      <el-menu-item index="/share/new">作品发布</el-menu-item>
      <el-menu-item index="/share/check">存证查询</el-menu-item>
      <el-menu-item index="/share/copyrightCheck">交易列表</el-menu-item>
      <el-menu-item index="/share/copyrightBusiness">版权交易</el-menu-item>
      <el-menu-item index="/share/copyrightBusiness">作品评分</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "share",
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style  scoped>
/*.footer-bar {*/
/*  position: fixed;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  width: 100%;*/
/*  height: 4rem;*/
/*  background-color: #fcfcfc;*/
/*  border-top: grey solid 0.03px;*/
/*  z-index: 999;*/
/*  text-align: center;*/
/*    ul {*/
/*      display: flex;*/
/*      justify-content: space-between;*/
/*      width: 100%;*/
/*      height: 4rem;*/
/*      margin: 0;*/
/*      padding: 0;*/
/*      font-size: 1rem;*/
/*      line-height: 4rem;*/
/*    }*/
/*    li {*/
/*      display: inline-block;*/
/*      width: 33%;*/
/*    }*/
/*}*/
.el-menu-demo {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
