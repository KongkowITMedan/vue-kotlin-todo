import _ from 'lodash'
import axios from 'axios'

function commitToBackend (task, state) {
  axios.put('http://localhost:4567/api/task/' + task.id, task, {headers: {'Content-Type': 'text/json'}})
    .then(res => {
      Object.assign(state, res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

function addToBackend(task, state) {
  axios.post('http://localhost:4567/api/task', task, {headers: {'Content-Type': 'text/json'}})
    .then(res => {
      Object.assign(state, res.data)
      state.editable = true
    })
    .catch(err => {
      console.log(err)
    })
}

export default {
  namespaced: true,

  state: {
    all: [
/*      {
        id: 1,
        content: 'Update readme',
        complete: false,
        editable : false
      },
      {
        id: 2,
        content: 'fix bug#2',
        complete: true,
        editable: false
      },
      {
        id: 3,
        content: 'drink water',
        complete: false,
        editable: false
      }, */
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
      const task = {content: '', editable: true}
      state.all.push(task)
      addToBackend({}, task)
    },

    loadInitialTasks(state, tasks) {
      tasks.forEach((task) => { state.all.push(task) })
    }
  }
}
