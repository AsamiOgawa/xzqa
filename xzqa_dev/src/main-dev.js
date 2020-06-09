import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI)

// Axios
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// QS(QueryString)
import qs from 'qs'
Vue.prototype.qs = qs

// moment(JavaScript格式化事件)
import moment from 'moment'
Vue.prototype.moment = moment

// md5(加密)
import md5 from 'md5'
Vue.prototype.md5 = md5

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
