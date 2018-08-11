<style lang="less">
  .the-datas{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    .content-wrapper{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .time-choose{
        .the-btn{
          margin-top: 10px;
        }
      }
      .table-wrapper{
        height: 100%;
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
            <datetime v-model="startTime" format="YYYY-MM-DD HH:mm" @on-change="changeStartTime" title="开始时间"></datetime>
            <datetime v-model="endTime" format="YYYY-MM-DD HH:mm" @on-change="changeEndTime" title="结束时间"></datetime>
          </group>
        </div>
        <div class="the-btn">
          <x-button type="primary"  @click.native="search">搜索</x-button>
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
            <tr v-for="(item,index) in dataInfo" :key="index">
              <td>{{item.temperature}}</td>
              <td>{{item.humidity}}</td>
              <td>{{item.date}}</td>
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
    props:['basic'],
    mounted(){
      this.getInfo()
    },
    data(){
      return{
        dataInfo:[],
        startTime:'',
        endTime:''
      }
    },
    methods:{
      search(){
        this.getInfo()
      },
      changeStartTime(value){
       this.startTime = value
      },
      changeEndTime(value){
        this.endTime = value
      },
      getInfo(){
        let data = {
          startTime:this.startTime,
          endTime:this.endTime,
          rows:200,
          page:0,
          ...this.basic
        };
        this.$http({
          method:'post',
          url:this.ajaxUrl+"/historical/selectHistoryData",
          data
        },(res)=>{
          let result = res.data;
          if(result.code==0){
            this.dataInfo = result.data.dataList;
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
            }
          }else{

          }
        },(erro)=>{
          console.log(erro);
        })
      }
    }
  }
</script>
