import * as types from '@/store/mutation-types'
import api from '@/services/api/businesses'
import { handleError } from '@/utils/utils.js'

const getters = {
  allBusinesses: state => state.allBusinesses
}

const actions = {
  getAllBusinesses({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getAllBusinesses()
        .then(response => {
          if (response.status === 200) {
            const businesses = []
            const array = response.data
            array.forEach(element => {
              businesses.push(element.name)
            })
            commit(types.FILL_ALL_BUSINESSES, businesses)
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
  [types.FILL_ALL_BUSINESSES](state, businesses) {
    state.allBusinesses = businesses
  }
}

const state = {
  allBusinesses: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
