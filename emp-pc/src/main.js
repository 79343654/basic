import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import echarts from 'echarts'
import axios from "axios";
import 'iview/dist/styles/iview.css';
import Cookies from 'js-cookie';

Vue.use(iView);
Vue.prototype.$echarts = echarts;
Vue.prototype.$cookie = Cookies;
Vue.prototype.$http =function(options,successFn,erroFn){
  axios(options).then((res)=>{
    /*登陆超时*/
    if(res.data.code==103||res.data.code==104||res.data.code==117){
      this.$Message.error(res.data.msg);
      this.$router.replace({name:"login"})
      return
    }
    successFn(res);
  }).catch((erro)=>{
    erroFn(erro);
  })
};

/*
  let userId = this.$cookie.get('userId');
  let accessToken = this.$cookie.get('accessToken');
  let permissions = this.$cookie.get('permissions');
  let data = {
    userId:userId,
    loginType:2,
    accessToken:accessToken,
    permissions:permissions
  };
  this.$http({
      method:'post',
      url:this.$util.ajaxUrl+"/user/logout",
      data
    },(res)=>{
    console.log(res);
      let result = res.data;
       if(result.code==0){

          }else{
            this.$Message.error(res.data.msg)
        }

   },(erro)=>{
    console.log(erro);
   })
*
* */
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted () {
        this.$store.commit('updateMenulist');
    }
});
