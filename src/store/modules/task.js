import _ from 'lodash'
import axios from 'axios'

export default {
  namespaced: true,

  state: {
    all: [
/*      {
        id: 1,
        content: 'Update readme',
        isComplete: false,
        isEditable: false
      },
      {
        id: 2,
        content: 'fix bug#2',
        isComplete: true,
        isEditable: false
      },
      {
        id: 3,
        content: 'drink water',
        isComplete: false,
        isEditable: false
      }, */
    ]
  },

  getters: {
    active: state => state.all.filter(task => !task.isComplete),
    complete: state => state.all.filter(task => task.isComplete)
  },

  mutations: {
    enableEdit (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].isEditable = true
    },

    disableEdit (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].isEditable = false
    },

    updateContent (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].content = payload.content
    },

    setComplete (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].isEditable = false
      state.all[index].isComplete = true
    },

    setIncomplete (state, payload) {
      const index = _.findIndex(state.all, ['id', payload.id])
      state.all[index].isComplete = false
    },

    addTask (state) {
      state.all.push({
        id: state.all.length + 1,
        content: '',
        isComplete: false,
        isEditable: true
      })
    },

    loadInitialTasks(state, tasks) {
      tasks.forEach((task) => { state.all.push(task) })
    }
  }
}
