// Vue develop tool
// Vue.config.devtools = true
import Vue from 'vue'
import App from './App'
import router from '@/router.js'
import store from '@/store.js'
import reset from 'reset-css' //reset.css
import mainCSS from '@/assets/sass/style.min.css' //default my CSS
import loader from '@/assets/sass/loader.min.css'
import './registerServiceWorker' // pwa

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  reset,
  mainCSS,
  loader,
  components: { App },
  template: '<App/>',
  render: (h) => h(App),
})
console.log(process.env.BASE_URL)