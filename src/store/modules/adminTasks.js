import * as types from '@/store/mutation-types'
import api from '@/services/api/adminTasks'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  tasks: state => state.tasks,
  totalTasks: state => state.totalTasks
}

const actions = {
  getTasks({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getTasks(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.TASKS, response.data.docs)
            commit(types.TOTAL_TASKS, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editTask({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        name: payload.name
      }
      api
        .editTask(payload._id, data)
        .then(response => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
              },
              commit,
              resolve
            )
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  saveTask({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveTask(payload)
        .then(response => {
          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
              },
              commit,
              resolve
            )
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  deleteTask({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteTask(payload)
        .then(response => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.DELETED_SUCCESSFULLY'
              },
              commit,
              resolve
            )
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.TASKS](state, tasks) {
    state.tasks = tasks
  },
  [types.TOTAL_TASKS](state, value) {
    state.totalTasks = value
  }
}

const state = {
  tasks: [],
  totalTasks: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
