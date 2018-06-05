<style lang="less">
    .device-table{
        width: 100%;
        height: 100%;
        padding: 20px 0;
        box-sizing: border-box;
    }
    .pages-wrapper{.device-table{
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
        <Tabs value="name1">
            <TabPane label="表格显示" name="name1">
                <data-search></data-search>
                <div class="device-table">
                    <Table border :columns="columns1" :data="data1"></Table>
                </div>
                <div class="pages-wrapper">
                    <Page :total="40" size="small" show-elevator show-sizer></Page>
                </div>
            </TabPane>
            <TabPane label="曲线图显示" name="name2">
                <data-search></data-search>
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
      data(){
      return {
        columns1: [
          {
            title: '设备名称',
            key: 'deviceName'
          },
          {
            title: '报警内容',
            key: 'warningContent'
          },
          {
            title: '短信通知',
            key: 'shortNote'
          },
          {
            title: '邮件通知',
            key: 'emailNotification'
          },
          {
            title: '记录时间',
            key: 'writeTime'
          }
        ],
          data1: [
          {
            deviceName: 'John Brown',
            warningContent: 18,
            shortNote: 'N1243142k',
            emailNotification: '1234124',
            writeTime:'201094'
          },
            {
              deviceName: 'Jo124hn Brown',
              warningContent: 12418,
              shortNote: '1245143142k',
              emailNotification: '437474',
              writeTime:'152524'
            },
        ]
      }
  },
  mounted(){
      this.drawChart()
  },
  methods:{
    drawChart(){
      let chart = this.$echarts.init(document.getElementById("history-line"))
      let options = {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      chart.setOption(options);
    }
  }
};
</script>