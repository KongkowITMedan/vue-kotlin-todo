import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    this.$store.dispatch('task/loadInitialTasks')
  }
})
