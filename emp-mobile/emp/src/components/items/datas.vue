<style lang="less">
  .the-datas{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    .content-wrapper{
      width: 100%;
      height: auto;
      .time-choose{
        .the-btn{
          margin-top: 10px;
        }
      }
      .table-wrapper{
        margin-top: 10px;
      }
    }
  }
</style>

<template>
  <div class="the-datas">
    <div class="content-wrapper">
      <div class="time-choose">
        <div class="the-time">
          <group title="请选择查询时间段">
            <datetime v-model="limitHourValue" format="YYYY-MM-DD HH:mm" @on-change="change" title="开始时间"></datetime>
            <datetime v-model="limitHourValue" format="YYYY-MM-DD HH:mm" @on-change="change" title="结束时间"></datetime>
          </group>
        </div>
        <div class="the-btn">
          <x-button type="primary"  @click.native="visibility = true">搜索</x-button>
        </div>
      </div>
      <div class="table-wrapper">
          <x-table :cell-bordered="false" >
            <thead>
            <tr>
              <th>温度（℃）</th>
              <th>湿度（%RH）</th>
              <th>记录时间</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Apple</td>
              <td>$1.25</td>
              <td>$1.25</td>
            </tr>
            <tr>
              <td>Banana</td>
              <td>$1.20</td>
              <td>$1.25</td>
            </tr>
            </tbody>
          </x-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { Datetime,Group,XButton,XTable } from 'vux'
  export default{
    name:'theDatas',
    components:{
      Datetime,
      Group,
      XButton,
      XTable
    },
    data(){
      return{
        limitHourValue:''
      }
    },
    methods:{
      change(value){
        console.log(value)
      }
    }
  }
</script>
