import Vue from 'vue';
import Vuex from 'vuex';
import { getItem, setItem } from '@/utils/storage';

Vue.use(Vuex);
const TOKEN_TEXT = 'TT_TOKEN';

export default new Vuex.Store({
  state: {
    token: getItem(TOKEN_TEXT)
    // token: window.localStorage.getItem('token')
    //   ? JSON.parse(window.localStorage.getItem('token'))
    //   : ''
  },
  mutations: {
    setToken(state, token_param) {
      state.token = token_param;
      setItem(TOKEN_TEXT, token_param);
      // window.localStorage.setItem('token', JSON.stringify(token_param));
    }
  },
  actions: {},
  modules: {}
});
