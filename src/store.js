import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import temoti from '@/store/temoti'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    temoti,
  },
})
