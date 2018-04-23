import Vue from 'vue'
import App from './App'
import router from './router'
import 'milligram/dist/milligram.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
