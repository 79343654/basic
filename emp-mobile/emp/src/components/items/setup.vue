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
          line-height: 30px;
          display: flex;
          .the-left{
            width: 120px;
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
              padding: 0!important;
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
            <span class="the-right">123124</span>
          </li>
          <li>
            <span class="the-left">设备名称：</span>
            <span class="the-right">1241241</span>
          </li>
          <li>
            <!--<span class="the-left">设备所在时区：</span>-->
            <span class="the-right">
              <popup-picker title="设备所在时区：" :data="list" v-model="value" value-text-align="right"></popup-picker>
            </span>
          </li>
          <li>
            <span class="the-left">温度预警范围：</span>
            <span class="the-right">
              <span class="input-txt">
                <x-input  placeholder="输入" novalidate  :show-clear="false"  placeholder-align="right"></x-input>
              </span>
              <span  class="input-txt">-</span>
               <span class="input-txt">
                  <x-input  placeholder="输入" novalidate  :show-clear="false"  placeholder-align="right"></x-input>
              </span>
            </span>

          </li>
          <li>
            <span class="the-left">湿度预警范围：</span>
            <span class="the-right">
              <span class="input-txt">
                <x-input  placeholder="输入" novalidate  :show-clear="false"  placeholder-align="right"></x-input>
              </span>
              <span  class="input-txt">-</span>
               <span class="input-txt">
                  <x-input  placeholder="输入" novalidate  :show-clear="false"  placeholder-align="right"></x-input>
              </span>
            </span>
          </li>
          <li>
            <!--<span class="the-left">上报时间间隔：</span>-->
            <span class="the-right">
              <popup-picker title="上报时间间隔：" :data="list" v-model="value" value-text-align="right"></popup-picker>
            </span>
          </li>
          <li>
            <!--<span class="the-left">记录时间间隔：</span>-->
            <span class="the-right">
              <popup-picker title="记录时间间隔：" :data="list" v-model="value" value-text-align="right"></popup-picker>
            </span>
          </li>
          <li>
            <span class="the-right">
             <x-switch title="断电报警：" sie></x-switch>
            </span>
          </li>
        </ul>
        <div class="the-btn">
          <x-button type="primary" >保存</x-button>
        </div>
      </div>
  </div>
</template>

<script>
  import { XInput, Selector, PopupPicker, XSwitch,XButton } from 'vux'
  export default{
    name:'theSetup',
    data(){
      return {
        value:[],
        stringValue:'0',
        list: [['A', 'B', 'C']]
      }
    },
    components:{
      PopupPicker,
      XInput,
      XSwitch,
      XButton
    }
  }
</script>
