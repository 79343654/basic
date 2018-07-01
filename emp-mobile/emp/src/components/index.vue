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
      <info v-show="itemIndex==0"></info>
      <datas v-show="itemIndex==1"></datas>
      <chart v-show="itemIndex==2"></chart>
      <alarm v-show="itemIndex==3"></alarm>
      <setup v-show="itemIndex==4"></setup>
      <trail v-show="itemIndex==5"></trail>
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
       itemIndex:0
     }
    },
    methods:{
      onItemClick(){
        console.log(this.itemIndex)
      }
    }
  }
</script>
