import * as types from '@/store/mutation-types'
import api from '@/services/api/calendarItems'
import { handleError } from '@/utils/utils.js'

const getters = {
  calendarItems: state => state.calendarItems
}

const actions = {
  getCalendarItems({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getCalendarItems(payload)
        .then(response => {
          if (response.status === 200) {
            // console.log(response.data)
            commit(types.CALENDAR_ITEMS, response.data)
            commit(types.TOTAL_CALENDAR_ITEMS, response.data.totalDocs)
            resolve(response.data)
          }
        })
        .catch(error => {
          console.log(error)
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.CALENDAR_ITEMS](state, value) {
    state.calendarItems = value
  },
  [types.TOTAL_CALENDAR_ITEMS](state, value) {
    state.totalCalendarItems = value
  }
}

const state = {
  calendarItems: [],
  totalCalendarItems: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
