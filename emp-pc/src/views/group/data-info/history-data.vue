<style lang="less">
    .device-table{
        width: 100%;
        height: 100%;
        min-height: 320px;
        padding: 20px 0;
        box-sizing: border-box;
    }
    .pages-wrapper {
        .device-table{
            padding: 10px 0;
            box-sizing: border-box;
        }
        padding: 20px 0;
        box-sizing: border-box;
        text-align: right;
     }
    #history-line{
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div class="historyData">
        <Tabs v-model="tabName" >
            <TabPane :label="lang.title[0]" name="name1">
                <data-search :special="special" v-if="tabName=='name1'" @initPage="initPage" :tableListPage="tableListPage" :tabName="tabName" @getList = 'getList'></data-search>
                <div class="device-table">
                    <Table :highlight-row="true" @on-row-click="specialSelect" border :columns="columns" :data="accountListTable"></Table>
                    <div class="pages-wrapper">
                        <Page :total="totalPage"  :page-size = "15" :current="tableListPage+1" @on-change="changePage"></Page>
                    </div>
                </div>
            </TabPane>
            <TabPane :label="lang.title[1]" name="name2">
                <data-search  v-if="tabName=='name2'"  @initPage="initPage" :tableListPage="tableListPage" :tabName="tabName" @getList = 'getList'></data-search>
                <div class="device-table">
                    <div id="history-line"></div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import dataSearch from "../components/data-search-wrapper"
export default {
      name: 'history_data',
      components:{
        dataSearch
      },
      computed: {
        lang(){
          if(this.$store.state.lang.is=='cn'){
            this.columns = this.columns1
          }else{
            this.columns = this.columns2
          }
          return this.$store.state.lang.historyData
        }
      },
      data(){
        return {
          tabName:'name1',
          totalPage:0,
          tableListPage:0,
          special:{},
          columns:[],
            columns1: [
              {title: '设备名称', key: 'deviceName'},
              {title: '设备SN', key: 'sn'},
              {title: '设备温度', key: 'temperature'},
              {title: '设备湿度', key: 'humidity'},
              {title: '记录时间', key: 'date'},
            ],
          columns2:[
            {title: '设备名称', key: 'deviceName'},
            {title: '设备SN', key: 'sn'},
            {title: '设备温度', key: 'temperature'},
            {title: '设备湿度', key: 'humidity'},
            {title: '记录时间', key: 'date'},
            {title: '记录时间', key: 'writeTime'}
          ],
          accountListTable: [],
          accountListChart:[]
      }
  },
  mounted(){

  },
  methods:{
    specialSelect(it){
     this.special = it;
     console.log(it)
    },
    initPage(it){
      this.tableListPage = it
    },
    /*切换页码*/
    changePage(it){
      this.tableListPage = it-1
    },
    /*搜索*/
    getList(it){
      if(this.tabName=='name1'){
        this.accountListTable = it.dataList;
        this.totalPage = it.count
      }else{
        this.accountListChart = it;
        this.drawChart()
      }
    },
    drawChart(){
      let chart = this.$echarts.init(document.getElementById("history-line"))
      let options = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['温度','湿度']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              type:'png',
              name:'历史数据曲线图'
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.accountListChart.dateList
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'温度',
            type:'line',
            smooth: true,
            data:this.accountListChart.humidityList
          },
          {
            name:'湿度',
            type:'line',
            smooth: true,
            data:this.accountListChart.temperatureList
          },
        ]
      };
      chart.setOption(options);
    }
  }
};
</script>