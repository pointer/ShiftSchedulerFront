import * as types from '@/store/mutation-types'
import api from '@/services/api/equipment'
import { handleError } from '@/utils/utils.js'

const getters = {
  allEquipments: state => state.allEquipments
}

const actions = {
  getAllEquipments({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getAllEquipments()
        .then(response => {
          if (response.status === 200) {
            // const array = response.data
            // const equipments = []
            // array.forEach(element => {
            //   equipments.push(element.equipmentName)
            // })
            // console.log(equipments)
            commit(types.FILL_ALL_EQUIPMENTS, response.data)
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
  [types.FILL_ALL_EQUIPMENTS](state, value) {
    state.allEquipments = value
  }
}

const state = {
  allEquipments: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
