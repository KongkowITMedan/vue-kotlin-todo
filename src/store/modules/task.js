import _ from 'lodash'
import axios from 'axios'

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
      state.all[index].editable = true
    },

    disableEdit (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].editable = false
    },

    updateContent (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].content = payload.content
    },

    setComplete (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      const task = Object.assign({}, state.all[index])
      task.editable = false
      task.complete = true
      axios.put('http://localhost:4567/api/task/' + task.id, task, {headers: {'Content-Type': 'text/json'}})
        .then(res => {
          Object.assign(state.all[index], res.data)
        })
        .catch(err => {
          console.log(err)
        })
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

    loadInitialTasks(state, tasks) {
      tasks.forEach((task) => { state.all.push(task) })
    }
  }
}
