import Vue from 'vue'
import App from './App.vue'
import router from './router'
const FastClick = require('fastclick');
FastClick.attach(document.body);

import echarts from 'echarts'
Vue.prototype.echarts = echarts;

import Router from 'vue-router';
Vue.use(Router);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
