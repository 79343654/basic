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
          padding: 0 10px;
          box-sizing: border-box;
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
            <datetime v-model="startTime" format="YYYY-MM-DD HH:mm" @on-change="changeStartTime" title="开始时间"></datetime>
            <datetime v-model="endTime" format="YYYY-MM-DD HH:mm" @on-change="changeEndTime" title="结束时间"></datetime>
          </group>
        </div>
        <div class="the-btn">
          <x-button type="primary"  @click.native="getInfo">搜索</x-button>
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
        endTime:'',
        startTime:'',
        dataInfo:{}
      }
    },
    props:['basic'],
    mounted(){
      this.getInfo()
    },
    methods:{
      changeStartTime(value){
        this.startTime = value
      },
      changeEndTime(value){
        this.endTime = value
      },
      getInfo(){
        let data = {
          endTime:this.endTime,
          startTime:this.startTime,
          deviceName:'',
          ...this.basic
        };
        this.$http({
          method:'post',
          url:this.ajaxUrl+"/historical/historyCurveData",
          data
        },(res)=>{
          let result = res.data;
          if(result.code==0){
            this.dataInfo = result.data;
            if(this.dataInfo.length==0){
              this.$vux.alert.show({
                title: '提示',
                content: "没有记录",
                onShow () {
                  console.log('comfirm')
                },
                onHide () {
                  console.log('cancel')
                }
              })
            }else{
              this.change()
            }
          }else{

          }

        },(erro)=>{
          console.log(erro);
        })
      },
      change(value){
        let option = {
          legend: {
            data:['温度','湿度']
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: this.dataInfo.dateList
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name:'湿度',
              type:'line',
              data:this.dataInfo.humidityList
            },
            {
              name:'温度',
              type:'line',
              data:this.dataInfo.temperatureList
              // markPoint: {
              //   data: [
              //     {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
              //   ]
              // }
            }
          ]
        };
        const  myChart = this.echarts.init(document.getElementById('chartsFor'));
        myChart.setOption(option);
      }
    }
  }
</script>

