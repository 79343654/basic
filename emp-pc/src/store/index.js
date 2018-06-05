import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import {
  allForCn,
  allForEn
} from './language'
Vue.use(Vuex);

const state  ={
    lang:allForCn
}
const store = new Vuex.Store({
    state,
    mutations: {
        /*中英文切换*/
      TOLANG(state,value) {
        if(value=='allForCn'){
          state.lang = allForCn;
        }else if(value=='allForEn'){
          state.lang = allForEn;
        }
      }
    },
    actions: {
      changeLanguage({commit},value) {
        commit("TOLANG",value);
      }
    },
    modules: {
        app,
        user
    }
});

export default store;
