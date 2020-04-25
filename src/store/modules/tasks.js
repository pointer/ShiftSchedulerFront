import * as types from '@/store/mutation-types'
import api from '@/services/api/tasks'
import { handleError } from '@/utils/utils.js'

const getters = {
  allTasks: state => state.allTasks
}

const actions = {
  getAllTasks({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getAllTasks()
        .then(response => {
          if (response.status === 200) {
            const array = response.data
            const tasks = []
            array.forEach(element => {
              tasks.push(element.taskName)
            })
            commit(types.FILL_ALL_TASKS, response.data)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.FILL_ALL_TASKS](state, value) {
    state.allTasks = value
  }
}

const state = {
  allTasks: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
