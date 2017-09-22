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
    var self = this
    axios.get('http://localhost:4567/api/task')
      .then((res) => {
        self.$store.commit('task/loadInitialTasks', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
