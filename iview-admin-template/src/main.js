import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import store from './store';
import App from './app.vue';
import echarts from 'echarts'
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.prototype.$echarts = echarts
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    mounted () {
        this.$store.commit('updateMenulist');
    }
});
