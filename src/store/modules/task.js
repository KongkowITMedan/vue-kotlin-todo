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
      const task = state.all[index]
      task.editable = true
    },

    disableEdit (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      const task = state.all[index]
      task.editable = false
    },

    updateContent (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      const task = Object.assign({}, state.all[index])
      task.content = payload.content
      commitToBackend(task, state.all[index])
    },

    setComplete (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      const task = Object.assign({}, state.all[index])
      task.editable = false
      task.complete = true
      commitToBackend(task, state.all[index])
    },

    setIncomplete (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      const task = Object.assign({}, state.all[index])
      task.complete = false
      commitToBackend(task, state.all[index])
    },

    addTask (state) {
<<<<<<< HEAD
      const task = {content: '', editable: true}
      state.all.push(task)
      addToBackend({}, task)
    },

    loadInitialTasks(state, tasks) {
      tasks.forEach((task) => { state.all.push(task) })
=======
      state.all.push({
        id: state.all.length + 1,
        content: '',
        isComplete: false,
        isEditable: true
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
>>>>>>> load initial task from api backend
    }
  }
}
