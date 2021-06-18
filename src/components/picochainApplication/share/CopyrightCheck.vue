<template>
 <div>
     <h1>交易列表</h1>
     <div class="button-group" style="text-algin:left;width:300px" >
            <el-button  class="button" type="primary" >平台内交易</el-button>
            <el-button  class="button" type="primary" >第三方平台交易</el-button>
    </div>
     <div class="copyright-check">
           <el-card class="card" v-for="(item,index) in list" :key="index">
               <div class="card-padding">
                    <div :class="'image image-'+ (index+1)"></div>
                    <div style="padding: 14px;">
                        <div>作品名称：{{item.text}}</div>
                        <div>发布作者：{{item.author}}</div>
                        <div>发布时间：{{item.time || ''}}</div>
                    </div>
               </div>
                <div class="button-group">
                      <el-button  class="button" type="primary" size="small">购买</el-button>
                      <el-button  class="button" type="primary" size="small">查看</el-button>
                </div>
            </el-card>
     </div>
 </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      list: [{
        img: './assets/img1.png',
        text: '作品1',
        author: 'gxc',
        time: '2021-03-03 12:20:15'
      },
      {
        img: './assets/img2.png',
        text: '作品2',
        author: 'gxc',
        time: '2021-03-03 12:20:15'
      },
      {
        img: './assets/img3.png',
        text: '作品3',
        author: 'gxc',
        time: '2021-03-03 12:20:15'
      },
      {
        img: './assets/img4.png',
        text: '作品4',
        author: 'gxc',
        time: '2021-03-03 12:20:15'
      }]
    }
  }
}
</script>
<style lang='less' >
    .copyright-check{
        padding:0 40px;
        width:100%;
        text-align: left;
        display: flex;
        flex-wrap: wrap;
        .el-card__body{
            padding:0px !important;
        }
        .card{
            width:350px;
            height: 365px;
            display: inline-block;
            margin-left:50px;
            margin-top:50px;
            .card-padding{
                padding:20px 20px 5px 20px;
            }
            .button-group{
                width: 100%;
                height: 50px;
                background:rgb(248, 248, 248);
                border: 1px solid rgb(224, 224, 224);
                .button{
                    float: right;
                    margin-right:5px;
                    margin-top:5px;
                }
            }
        }
        .image{
            width:100%;
            height:200px;
        }
        .image-1{
            background:url('./assets/img1.png');
            background-size: 100%;
        }
        .image-2{
            background:url('./assets/img2.png');
            background-size: 100%;
        }
        .image-3{
            background:url('./assets/img3.png');
            background-size: 100%;
        }
        .image-4{
            background:url('./assets/img4.png');
            background-size: 100%;
        }
    }
</style>
