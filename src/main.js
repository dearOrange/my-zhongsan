// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView);

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Vue.prototype.ajax = axios
Vue.prototype.apiUrl = 'http://192.168.0.162:8051'
window.apiUrl = 'http://192.168.0.162:8051'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
