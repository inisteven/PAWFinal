import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugin/vuetify'
import router from './router'
// import VueResource from 'vue-resource'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueNumberInput from '@chenfengyuan/vue-number-input';
import axios from 'axios';


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//Vue.component('pagination', require('laravel-vue-pagination'));
// Vue.use(VueResource)
Vue.component('vue-number-input', VueNumberInput);
Vue.use(VueNumberInput);
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';
Vue.prototype.$url = 'http://127.0.0.1:8000/';

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
