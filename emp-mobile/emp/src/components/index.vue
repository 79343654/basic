<style lang="less">
  @import "index";
</style>
<template>
  <div class="index-wrapper">
    <div class="table-list">
      <tab v-model="itemIndex" bar-active-color="#668599" :line-width="1" :animate="false">
        <tab-item  @on-item-click="onItemClick" active-class="info">信息</tab-item>
        <tab-item @on-item-click="onItemClick" active-class="datas">数据</tab-item>
        <tab-item @on-item-click="onItemClick" active-class="chart">图表</tab-item>
        <tab-item @on-item-click="onItemClick" active-class="alarm">预警</tab-item>
        <tab-item @on-item-click="onItemClick" active-class="setup">设置</tab-item>
        <tab-item @on-item-click="onItemClick" active-class="trail">轨迹</tab-item>
      </tab>
    </div>
    <div class="table-wrapper">
      <info v-if="itemIndex==0" :basic="basic"></info>
      <datas v-if="itemIndex==1" :basic="basic"></datas>
      <chart v-if="itemIndex==2" :basic="basic"></chart>
      <alarm v-if="itemIndex==3" :basic="basic"></alarm>
      <setup v-if="itemIndex==4&&basic.permissions!=3" :basic="basic"></setup>
      <trail v-if="itemIndex==5" :basic="basic"></trail>
    </div>
  </div>
</template>
<script>
  import { Tab, TabItem ,XButton} from 'vux';
  import Info from "./items/info.vue";
  import Datas from "./items/datas.vue";
  import Chart from "./items/chart.vue";
  import Setup from "./items/setup.vue";
  import Trail from "./items/trail.vue";
  import Alarm from "./items/alarm";
  export default{
   name:'indexWrapper',
    components:{
      Alarm,
      XButton,
      Tab,
      TabItem,
      Info,
      Datas,
      Chart,
      Setup,
      Trail
    },
    data(){
     return {
       itemIndex:0,
       basic:{
         userId:1,
         loginType:2,
         sn:'',
         accessToken:'',
         permissions:2,
       }
     }
    },
    beforeMount(){
        this.getBasicInfo();

    },
    methods:{
      getUrl(para,url){
        var paraArr = url.split('?')[1].replace("#/",'').split('&');
        for(var i = 0;i < paraArr.length;i++){
          if(para == paraArr[i].split('=')[0]){
            return paraArr[i].split('=')[1];
          }
        }
        return '';
      },
     getBasicInfo(){
        let url = window.location.href;
        // let url = 'http://120.79.239.247:8080/monitoring/phone/index.html#/?userId=1&loginType=2&accessToken=671a3d42d6f94274883166ccdc02016f&permissions=2&sn=C00711223301#/'
         this.basic = {
             userId:this.getUrl('userId',url)*1,
             loginType:this.getUrl('loginType',url)*1,
             sn:this.getUrl('sn',url),
             accessToken:this.getUrl('accessToken',url),
             permissions:this.getUrl('permissions',url)*1
         }
         // console.log(this.basic)
         // alert(JSON.stringify(this.basic))
     },
      onItemClick(){
        console.log(this.itemIndex)
      }
    }
  }
</script>
