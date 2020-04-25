import * as types from '@/store/mutation-types'
import api from '@/services/api/adminEquipment'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  equipments: state => state.equipments,
  totalEquipment: state => state.totalEquipment
}

const actions = {
  getEquipments({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getEquipments(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.EQUIPMENTS, response.data.docs)
            commit(types.TOTAL_EQUIPMENTS, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editEquipment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        name: payload.equipmentName
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
  saveEquipment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveEquipment(payload)
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
  deleteEquipment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteEquipment(payload)
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
  [types.EQUIPMENTS](state, equipments) {
    state.equipments = equipments
  },
  [types.TOTAL_EQUIPMENTS](state, value) {
    state.totalEquipment = value
  }
}

const state = {
  equipments: [],
  totalEquipment: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
