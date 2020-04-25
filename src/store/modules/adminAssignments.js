import * as types from '@/store/mutation-types'
import api from '@/services/api/adminAssignments'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  assignments: state => state.assignments,
  totaAssignments: state => state.totalAssignments
}

const actions = {
  getAssignments({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getAssignments(payload)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data.docs)
            commit(types.ASSIGNMENTS, response.data.docs)
            commit(types.TOTAL_ASSIGNMENTS, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editAssignment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        agent: payload.agent
      }
      api
        .editAssignment(payload._id, data)
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
  saveAssignment({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .saveAssignment(payload)
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
  deleteAssignment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteAssignment(payload)
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
  [types.ASSIGNMENTS](state, assignments) {
    state.assignments = assignments
  },
  [types.TOTAL_ASSIGNMENTS](state, value) {
    state.totalAssignments = value
  }
}

const state = {
  assignments: [],
  totalAssignments: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
