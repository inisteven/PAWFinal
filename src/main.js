import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugin/vuetify'
import router from './router'
// import VueResource from 'vue-resource'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios';


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Vue.component('pagination', require('laravel-vue-pagination')); //ges install ini dulu ya-> npm install laravel-vue-pagination

Vue.component('pagination',require('./components/PaginationComponent.vue').default);
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';
Vue.prototype.$url = 'http://127.0.0.1:8000/';

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD-jOAG594kcYrD3ZQGrGShEFvTrur07CY'
  },
  installComponents: true
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
