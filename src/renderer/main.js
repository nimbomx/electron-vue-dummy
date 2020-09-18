import Vue from 'vue'
window._ = require('lodash');


//AXIOS
import axios from 'axios'
const axiosConfig = {
  baseURL: 'https://...',
  timeout: 30000,
};
if(process.env.NODE_ENV === 'development'){
  axiosConfig.baseURL = 'https://...'
}
window.config = {
  apiPath: axiosConfig.baseURL,
}
Vue.axios = Vue.prototype.$axios = axios.create(axiosConfig)

//BOOTSTRAP
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//MOMENT
const moment = require('moment')
require('moment/locale/es')
Vue.use(require('vue-moment'), {
    moment
})

//FUSE
import VueFuse from 'vue-fuse'
Vue.use(VueFuse)


//////
import App from './App'
import router from './router'
import store from './store'

import Bus from './plugins/Bus'
Vue.use(Bus)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.filter('folio', n => String(n).padStart(4, '0'))
Vue.directive('focus', {
  // Cuando el elemento enlazado se inserta en el DOM...
  inserted: function (el) {
    // Enfoca el elemento
    el.focus()
  }
})


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
