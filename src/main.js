import Vue from 'vue';
import Vant from 'vant';
import './styles/index.less';
import 'vant/lib/index.css';
import 'amfe-flexible';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vant);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
