import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Alert,AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

Vue.component('alert', Alert);
const FastClick = require('fastclick');
FastClick.attach(document.body);
import axios from "axios";
import echarts from 'echarts'
Vue.prototype.echarts = echarts;
// Vue.prototype.ajaxUrl  = 'http://yun.huahanw.com/'
// Vue.prototype.ajaxUrl = 'http://120.79.239.247:8080/monitoring';
Vue.prototype.ajaxUrl = '../';

Vue.prototype.$http =function(options,successFn,erroFn){
  axios(options).then((res)=>{
    /*登陆超时*/
    if(res.data.code==103||res.data.code==104||res.data.code==117){
      this.$vux.alert.show({
        title: '提示',
        content: res.data.msg,
        onShow () {
          console.log('comfirm')
        },
        onHide () {
          console.log('cancel')
        }
      })
      return
    };
    successFn(res);
  }).catch((erro)=>{
    erroFn(erro);
  })
};
import Router from 'vue-router';
Vue.use(Router);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
/*
*
*
  let data = {
     ...this.basic
  };
  this.$http({
      method:'post',
      url:this.ajaxUrl+"/user/logout",
      data
    },(res)=>{
      let result = res.data;
       if(result.code==0){

         }else{

        }

   },(erro)=>{
    console.log(erro);
   })

   */
