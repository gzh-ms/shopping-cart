import Vue from 'vue'
import router from './router'
import App from './app'

import './reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
