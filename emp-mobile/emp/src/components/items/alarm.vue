<style lang="less">
  .the-alarm{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    .the-list{
      width: 100%;
      height: auto;
      .time-choose{
        .the-btn{
          margin-top: 10px;
        }
      }
      ul{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #d1daf9;
        li{
          width: 100%;
          height: 30px;
          display: flex;
          span{
            line-height: 30px;
          }
          span:first-child{

          }
          span:last-child{
            flex: 1;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="the-alarm">
    <div class="the-list">
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
      <ul v-for="(item,index) in dataInfo">
        <li>
          <span>设备名称：</span>
          <span>{{item.deviceName}}</span>
        </li>
        <li>
          <span>预警内容：</span>
          <span>{{item.content}}</span>
        </li>
        <li>
          <span>记录时间：</span>
          <span>{{item.date}}</span>
        </li>
      </ul>
      </ul>
    </div>

  </div>
</template>

<script>
  import { Datetime,Group,XButton } from 'vux';
  export default{
    name:'theAlarm',
    components:{
      Datetime,
      Group,
      XButton
    },
    data(){
      return{
        startTime:'',
        endTime:'',
        dataInfo:[]
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
          startTime:this.startTime,
          endTime:this.endTime,
          rows:200,
          page:0,
          ...this.basic
        };
        this.$http({
          method:'post',
          url:this.ajaxUrl+"/warning/selectWarningData",
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
