import _ from 'lodash'
import axios from 'axios'

export default {
  namespaced: true,

  state: {
    all: [
    ]
  },

  getters: {
    active: state => state.all.filter(task => !task.complete),
    complete: state => state.all.filter(task => task.complete)
  },

  mutations: {
    enableEdit (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].editable = true
    },

    disableEdit (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].editable = false
    },

    updateContent (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      const task = Object.assign({}, state.all[index])
      task.content = payload.content
      commitToBackend(task, state.all[index])
    },

    setComplete (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].editable = false
      state.all[index].complete = true
    },

    setIncomplete (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].complete = false
    },

    addTask (state) {
      state.all.push({
        id: state.all.length + 1,
        content: '',
        complete: false,
        editable: true
      })
    },

    loadTask(state, payload) {
      state.all.push(payload)
    }
  },

  actions: {
    loadInitialTasks (context) {
      axios.get('http://localhost:4567/api/task')
        .then(res => {
          res.data.forEach(task => { context.commit('loadTask', task) })
        })
        .catch(err => {
          console.log(err)
        })
    },

    newTask (context) {
      axios.post('http://localhost:4567/api/task', {content: ''})
        .then(res => {
          var task = res.data
          task.editable = true
          context.commit('loadTask', task)
        })
        .catch(err => {
          console.log(err)
        })
    },

    saveTask (context, task) {
      var newTask = Object.assign({}, task)
      newTask.editable = false
      axios.put('http://localhost:4567/api/task/' + newTask.id, newTask)
        .then(res => {
          context.commit('updateContent', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
