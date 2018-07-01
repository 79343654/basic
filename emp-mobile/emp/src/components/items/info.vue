<style lang="less">
  .the-info{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    .table-wrapper{
      width: 100%;
      height: auto;
    }
  }
</style>

<template>
  <div class="the-info">
     <div class="table-wrapper">
       <x-table :cell-bordered="false" style="background-color:#fff;">
         <tbody>
         <tr>
           <td>电量：</td><td>1</td>
         </tr>
         <tr>
           <td>设备名称：</td><td>x 08</td>
         </tr>
         <tr>
           <td>设备SN号：</td><td colspan="2">1</td>
         </tr>
         <tr>
           <td>温度预警范围：</td><td colspan="2">1</td>
         </tr>
         <tr>
           <td>上报间隔（分钟）：</td><td colspan="2">1</td>
         </tr>
         <tr>
           <td>记录间隔：</td><td colspan="2">1</td>
         </tr>
         <tr>
           <td>所属区域：</td><td colspan="2">深圳南山区微微信微信信</td>
         </tr>
         <tr>
           <td>断电报警：</td><td>1</td>
         </tr>
         <tr>
           <td>短信通知：</td><td colspan="2">1</td>
         </tr>
         <tr>
           <td>邮件通知：</td><td colspan="2">1</td>
         </tr>
         <tr>
           <td>状态：</td><td colspan="2">1</td>
         </tr>
         <tr>
           <td>续电器一：</td><td colspan="2">1</td>
         </tr>
         <tr>
           <td>续电器二：</td><td colspan="2">1</td>
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
    }
  }
</script>
