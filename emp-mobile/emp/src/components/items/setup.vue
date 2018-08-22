<style lang="less">
  .the-setup{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    .the-content{
      width: 100%;
      height:100%;
      .the-btn{
        margin-top: 10px;
      }
      ul{
        li{
          line-height: 40px;
          display: flex;
          .the-left{
            width: 120px;
          }
          i{
            font-style: normal;
            display: inline-block;
            line-height: 52px;
            width: 32px;
            margin-left: 10px;
          }
          .status{
            color: #1AAD19;
          }
          .the-right{
            flex: 1;
            display: flex;
            .input-txt{
              flex:1;
              text-align: center;
            }
            .vux-cell-box{
              width: 100%;
            }
            .weui-cell{
              flex:1;
              padding: 0!important;
              .vux-x-input-placeholder-right{
                border-bottom: 1px solid #eadfdf;
                text-align: center!important;
              }
              .weui-cell__ft{
                .weui-switch{
                  top:10px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="the-setup">
      <div class="the-content">
        <ul>
          <li>
            <span class="the-left">设备SN号：</span>
            <span class="the-right">{{dataInfo.sn}}</span>
          </li>
          <li>
            <span class="the-left">设备名称：</span>
            <span class="the-right">{{dataInfo.deviceName}}</span>
          </li>
          <li>
            <span class="the-right">
              <popup-radio title="设备所在时区:" :options="timeCodeList" v-model="dataInfo.timeCodeListChoosed "></popup-radio>
               <!--<popup-picker title="设备所在时区：" @on-change="changeIt" :data="timeCodeList" v-model="dataInfo.timeCodeListChoosed " value-text-align="right"></popup-picker>-->
            </span>
          </li>
          <li>
            <span class="the-left">温度预警范围：</span>
            <span class="the-right">
              <span class="input-txt">
                <x-input  placeholder="输入" novalidate  :show-clear="false"  v-model="dataInfo.temperatureLow" placeholder-align="right"></x-input>
              </span>
              <span  class="input-txt">-</span>
               <span class="input-txt">
                  <x-input  placeholder="输入" novalidate  :show-clear="false"   v-model="dataInfo.temperatureHigh" placeholder-align="right"></x-input>
              </span>
            </span>
          </li>
          <li>
            <span class="the-left">湿度预警范围：</span>
            <span class="the-right">
              <span class="input-txt">
                <x-input  placeholder="输入" novalidate v-model="dataInfo.humidityLow" :show-clear="false"  placeholder-align="right"></x-input>
              </span>
              <span  class="input-txt">-</span>
               <span class="input-txt">
                  <x-input  placeholder="输入" novalidate v-model="dataInfo.humidityHigh" :show-clear="false"  placeholder-align="right"></x-input>
              </span>
            </span>
          </li>
          <li>
            <span class="the-left">历史上报时间：</span>
            <span class="the-right">
              <span class="input-txt">
                <x-input   placeholder="输入" novalidate v-model="dataInfo.historyReportTimeF" :show-clear="false"  placeholder-align="right"></x-input>
              </span>
              <span  class="input-txt">时</span>
               <span class="input-txt">
                  <x-input   placeholder="输入" novalidate v-model="dataInfo.historyReportTimeE" :show-clear="false"  placeholder-align="right"></x-input>
              </span>
               <span  class="input-txt">分</span>
            </span>
          </li>
          <li>
            <span class="the-left">历史上报间隔：</span>
            <span class="the-right">
                  <x-input  placeholder="输入" novalidate  :show-clear="false"   v-model="dataInfo.historyInterval" placeholder-align="right"></x-input>
              </span>
          </li>
          <li>
            <span class="the-left">温度缓冲值：</span>
            <span class="the-right">
              <x-input   placeholder="输入温度缓冲值"  v-model="dataInfo.temperatureBuffer" :show-clear="false"  placeholder-align="right"></x-input>
            </span>
          </li>
          <li>
            <span class="the-left">湿度缓冲值：</span>
            <span class="the-right">
              <x-input  placeholder="输入温度缓冲值"  v-model="dataInfo.humidityBuffer" :show-clear="false"  placeholder-align="right"></x-input>
            </span>
          </li>
          <li>
            <span class="the-left">记录时间间隔：</span>
            <span class="the-right">
               <x-input   placeholder="输入记录时间间隔"  v-model="dataInfo.recordInterval" :show-clear="false"  placeholder-align="right"></x-input>
                <i>分钟</i>
            </span>
          </li>
          <li>
            <span class="the-left">上报时间间隔：</span>
            <span class="the-right">
                <x-input  placeholder="输入上报时间间隔" novalidate v-model="dataInfo.reportingInterval" :show-clear="false"  placeholder-align="right"></x-input>
                <i>分钟</i>
              </span>
          </li>
          <li v-if="dataInfo.deviceType==1">
            <span class="the-right">
               <x-switch title="DO1类型：" v-model="dataInfo.do1TypeStatus"></x-switch>
               <i class="status">{{dataInfo.do1TypeStatus?'控制':'告警'}}</i>
              </span>
          </li>
          <li v-if="dataInfo.deviceType==1">
            <span class="the-right">
               <x-switch title="DO1初始状态：" v-model="dataInfo.do1StatusStatus"></x-switch>
              <i class="status">{{dataInfo.do1StatusStatus?'打开':'关闭'}}</i>
            </span>
          </li>
          <li v-if="dataInfo.deviceType==1">
            <span class="the-right">
                <x-switch title="DO2类型：" v-model="dataInfo.do2TypeStatus"></x-switch>
                <i class="status">{{dataInfo.do2TypeStatus?'控制':'告警'}}</i>
              </span>
          </li>
          <li v-if="dataInfo.deviceType==1">
            <span class="the-right">
             <x-switch title="DO2初始状态：" v-model="dataInfo.do2StatusStatus"></x-switch>
              <i class="status">{{dataInfo.do2StatusStatus?'打开':'关闭'}}</i>
            </span>
          </li>
          <li>
            <span class="the-right">
               <x-switch title="低电/断电告警：" v-model="dataInfo.isOutagesStatus"></x-switch>
                <i class="status">{{dataInfo.isOutagesStatus?'开启':'关闭'}}</i>
              </span>
          </li>
        </ul>
        <div class="the-btn">
          <x-button type="primary" @click.native="save">保存</x-button>
        </div>
      </div>
  </div>
</template>

<script>
  import { XInput, Selector, PopupPicker,PopupRadio , XSwitch,XButton } from 'vux'
  export default{
    name:'theSetup',
    data(){
      return {
        dataInfo:{},
        stringValue:'0',
        timeCodeList:[],
        timeCodeIndex:0
      }
    },
    components:{
      PopupPicker,
      XInput,
      XSwitch,
      XButton,
      PopupRadio
    },
    mounted(){
      this.getTimeCode()
    },
    props:['basic'],
    methods:{
      save(){
        this.dataInfo.timeCodeListChoosed == '中国标准时间 (北京)'?this.dataInfo.timeCode='01': this.dataInfo.timeCode='02';

        this.dataInfo.historyReportTime = this.dataInfo.historyReportTimeF+":"+this.dataInfo.historyReportTimeE;
        this.dataInfo.do1TypeStatus?this.dataInfo.do1Type=1:this.dataInfo.do1Type=0;
        this.dataInfo.do2TypeStatus?this.dataInfo.do2Type=1:this.dataInfo.do2Type=0;

        this.dataInfo.do1StatusStatus?this.dataInfo.do1Status=0:this.dataInfo.do1Status=1;
        this.dataInfo.do2StatusStatus?this.dataInfo.do2Status=0:this.dataInfo.do2Status=1;

        this.dataInfo.isOutagesStatus? this.dataInfo.isOutages ='0': this.dataInfo.isOutages ='1';


        this.dataInfo.humidityLow = this.dataInfo.humidityLow*1;
        this.dataInfo.humidityHigh = this.dataInfo.humidityHigh*1;
        this.dataInfo.humidityBuffer = this.dataInfo.humidityBuffer*1;
        this.dataInfo.temperatureLow = this.dataInfo.temperatureLow*1;
        this.dataInfo.temperatureHigh = this.dataInfo.temperatureHigh*1;
        this.dataInfo.temperatureBuffer = this.dataInfo.temperatureBuffer*1;

        this.dataInfo.historyInterval = this.dataInfo.historyInterval*1;

        this.dataInfo.recordInterval = this.dataInfo.recordInterval*1;
        this.dataInfo.reportingInterval = this.dataInfo.reportingInterval*1;
        this.updateDevice(this.dataInfo)
      },
      updateDevice(it){
        const _this =this;
        let data = {
          ...it,
          ...this.basic
        };
        this.$http({
          method:'post',
          url:this.ajaxUrl+"/warning/updateDevice",
          data
        },(res)=>{
          let result = res.data;
          if(result.code==0){
            this.$vux.alert.show({
              title: '提示',
              content: "保存成功！",
              onShow () {
                _this.getInfo();
                console.log('comfirm')
              },
              onHide () {
                console.log('cancel')
              }
            })
          }else{
          }

        },(erro)=>{
          console.log(erro);
        })
      },
      getTimeCode(){
        const _this = this;
        let data = {
          ...this.basic
        };
        this.$http({
          method:'post',
          url:this.ajaxUrl+"/public/getTimeCode",
          data
        },(res)=>{
          let result = res.data;
          if(result.code==0){
            result.data.forEach(function(val,index){
              _this.timeCodeList.push(val.timeCodeName)
            });
            this.getInfo()
          }else{

          }

        },(erro)=>{
          console.log(erro);
        })
      },
      getInfo(){
        let data = {
          rows:200,
          page:0,
          ...this.basic
        };
        this.$http({
          method:'post',
          url:this.ajaxUrl+"/warning/selectDevices",
          data
        },(res)=>{
          let result = res.data;
          if(result.code==0){
            this.dataInfo = result.data.dataList[0];
            this.dataInfo.timeCode == '01'?this.dataInfo.timeCodeListChoosed = '中国标准时间 (北京)':this.dataInfo.timeCodeListChoosed = '美国东部时间 (纽约)';

            this.dataInfo.historyReportTimeF = this.dataInfo.historyReportTime.split(':')[0];
            this.dataInfo.historyReportTimeE = this.dataInfo.historyReportTime.split(':')[1];
            this.dataInfo.do1TypeStatus = this.dataInfo.do1Type==1?true:false;
            this.dataInfo.do2TypeStatus = this.dataInfo.do2Type==1?true:false;

            this.dataInfo.do1StatusStatus = this.dataInfo.do1Status==0?true:false;
            this.dataInfo.do2StatusStatus = this.dataInfo.do2Status==0?true:false;

            this.dataInfo.isOutagesStatus = this.dataInfo.isOutages == '0'?true:false;
          }else{

          }

        },(erro)=>{
          console.log(erro);
        })
      }
    }
  }
</script>
