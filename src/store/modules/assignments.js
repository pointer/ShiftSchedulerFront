import * as types from '@/store/mutation-types'
import api from '@/services/api/assignments'
import { handleError } from '@/utils/utils.js'

const getters = {
  allAssignments: state => state.allAssignments
}

const actions = {
  getAllAssignments({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getAllAssignments()
        .then(response => {
          if (response.status === 200) {
            // const assignments = []
            // const array = response.data.docs
            // array.forEach(element => {
            // moment.defaultFormat = "YYYY-MM-DD HH:mm"
            // const start_ = moment(`${element.assignStartDate}`, moment.defaultFormat)
            // const end_ = moment(`${element.assignEndDate}`, moment.defaultFormat)
            // console.log('start', start_)
            // console.log('end_', end_)
            // assignments.push(element.name)
            // })
            // console.log(response.data.docs)
            commit(types.FILL_ALL_ASSIGNMENTS, response.data.docs)
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
  [types.FILL_ALL_ASSIGNMENTS](state, assignments) {
    state.allAssignments = assignments
  }
}

const state = {
  allAssignments: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
