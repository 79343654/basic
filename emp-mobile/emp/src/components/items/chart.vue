<style lang="less" scoped>
  .the-chart{
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
      .chart-wrapper{
        margin-top: 30px;
        #chartsFor{
          width: 100%;
          height: 300px;
        }
      }
    }
  }
</style>

<template>
  <div class="the-chart">
    <div class="content-wrapper">
      <div class="time-choose">
        <div class="the-time">
          <group title="请选择查询时间段">
            <datetime v-model="limitHourValue" format="YYYY-MM-DD HH:mm" @on-change="change" title="开始时间"></datetime>
            <datetime v-model="limitHourValue" format="YYYY-MM-DD HH:mm" @on-change="change" title="结束时间"></datetime>
          </group>
        </div>
        <div class="the-btn">
          <x-button type="primary"  @click.native="change">搜索</x-button>
        </div>
      </div>
      <div class="chart-wrapper">
          <div id="chartsFor"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Datetime,Group,XButton } from 'vux';
  export default{
    name:'theChart',
    components:{
      Datetime,
      Group,
      XButton
    },
    data(){
      return{
        limitHourValue:''
      }
    },
    methods:{
      change(value){
        let option = {
          legend: {
            data:['最高气温','最低气温']
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [
            {
              name:'最高气温',
              type:'line',
              data:[11, 11, 15, 13, 12, 13, 10]
            },
            {
              name:'最低气温',
              type:'line',
              data:[1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [
                  {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
              }
            }
          ]
        };
        const  myChart = this.echarts.init(document.getElementById('chartsFor'));
        myChart.setOption(option);
      }
    }
  }
</script>

