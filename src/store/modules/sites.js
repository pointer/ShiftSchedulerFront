import * as types from '@/store/mutation-types'
import api from '@/services/api/sites'
import { handleError } from '@/utils/utils.js'

const getters = {
  allSites: state => state.allSites
}

const actions = {
  getAllSites({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getAllSites()
        .then(response => {
          if (response.status === 200) {
            const array = response.data
            const sites = []
            array.forEach(element => {
              sites.push(element.siteName)
            })
            commit(types.FILL_ALL_SITES, sites)
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
  [types.FILL_ALL_SITES](state, allSites) {
    state.allSites = allSites
  }
}

const state = {
  allSites: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
