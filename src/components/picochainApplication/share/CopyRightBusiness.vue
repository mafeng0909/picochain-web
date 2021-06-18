<template>
<div>
     <div class="title"><h1>版权交易编辑</h1></div>
    <div class="copyright-business">
         <el-alert
            style="margin-bottom:20px;"
            title="版权交易编辑"
            type="success"
            :closable="false"
            description="">
        </el-alert>
        <el-form label-width="100px" :label-position="labelPosition"  :model="formLabelAlign">
            <el-form-item label="作品名">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="作品预览">
                <img src="../assets/img1.png" />
            </el-form-item>
            <el-form-item label="版权拥有者">
                <el-input v-model="formLabelAlign.owner"></el-input>
            </el-form-item>
            <el-form-item label="版权ID">
                <el-input v-model="formLabelAlign.id"></el-input>
            </el-form-item>
              <el-form-item label="版权登记时间">
                   <el-date-picker
                    v-model="formLabelAlign.time"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                    </el-date-picker>
            </el-form-item>
              <el-form-item label="设置价格">
                <el-input v-model="formLabelAlign.price"></el-input>
            </el-form-item>
              <el-form-item label="设置代理方">
                <el-input v-model="formLabelAlign.proxy"></el-input>
            </el-form-item>
              <el-form-item>
                <el-button type="primary">编辑</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>
<script>
export default {
  name: 'copryrightbusiness',
  data () {
    return {
      formLabelAlign: {
        name: '',
        owner: '',
        id: '',
        time: '',
        price: '',
        proxy: ''
      },
      labelPosition: 'right'
    }
  }
}
</script>
<style lang="less" scoped>
.copyright-business{
  margin-top:30px;
  width:550px;
  height: auto;
  margin-left:30px;
  border: 1px solid rgb(243 243 243);
  .el-form{
    padding: 0 20px;
    .el-date-editor{
        width:100%;
    }
    img{
        width:100%;
    }
  }
}
</style>
