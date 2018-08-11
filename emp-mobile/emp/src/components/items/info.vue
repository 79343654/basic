<style lang="less">
  .the-info{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    .table-wrapper{
      width: 100%;
      height: auto;
      tr{
        td{
          width: 60px;
        }
      }
    }
  }
</style>

<template>
  <div class="the-info">
     <div class="table-wrapper">
       <x-table :cell-bordered="false" style="background-color:#fff;">
         <tbody>
         <tr>
           <td>电量：</td><td colspan="2">{{dataInfo.electricity}}</td>
         </tr>
         <tr>
           <td>设备名称：</td><td colspan="1">{{dataInfo.deviceName}}</td>
         </tr>
         <tr>
           <td>设备SN号：</td><td colspan="2">{{dataInfo.sn}}</td>
         </tr>
         <tr>
           <td>温度预警范围：</td><td colspan="2">{{dataInfo.temperatureLow}}-{{dataInfo.temperatureHigh}}°C</td>
         </tr>
         <tr>
           <td>湿度预警范围：</td><td colspan="2">{{dataInfo.humidityLow}}-{{dataInfo.humidityHigh}}%RH</td>
         </tr>
         <tr>
         <tr>
           <td>断电报警：</td><td colspan="2">{{dataInfo.isOutages=='0'?'开启':'关闭'}}</td>
         </tr>
         <tr>
           <td>续电器一：</td><td colspan="2">{{dataInfo.do1=='0'?'开':'关'}}</td>
         </tr>
         <tr>
           <td>续电器二：</td><td colspan="2">{{dataInfo.do2=='0'?'开':'关'}}</td>
         </tr>
         <tr>
           <td>数据上报时间：</td><td colspan="2">{{dataInfo.date}}</td>
         </tr>
         </tbody>
       </x-table>
     </div>
  </div>
</template>

<script>
  import { XTable } from 'vux'
  export default{
    name:'theInfo',
    components:{
      XTable
    },
    data(){
      return  {
        dataInfo:{}
      }
    },
    props:['basic'],
    mounted(){
      this.getInfo()
    },
    methods:{
      getInfo(){
        let data = {
          rows :1,
          page :0,
          ...this.basic
        };
        this.$http({
          method:'post',
          url:this.ajaxUrl+"/public/realTimeData",
          data
        },(res)=>{
          let result = res.data;
          if(result.code==0){
            this.dataInfo = result.data.dataList[0];
          }else{
            // this.$Message.error(res.data.msg)
          }
        },(erro)=>{
          console.log(erro);
        })
      }
    }
  }
</script>
