import Vue from 'vue';
import axios from 'axios';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  name: 'CoinTop',
  router,
  store,
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `,
}).$mount('#app');
