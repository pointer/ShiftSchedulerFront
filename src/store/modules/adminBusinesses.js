import * as types from '@/store/mutation-types'
import api from '@/services/api/adminBusinesses'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  businesses: state => state.businesses,
  totalBusinesses: state => state.totalBusinesses
}

const actions = {
  getBusinesses({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getBusinesses(payload)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data.docs)
            commit(types.BUSINESS, response.data.docs)
            commit(types.TOTAL_BUSINESS, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editBusiness({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        // context: payload.context,
        type: payload.type,
        name: payload.name,
        streetaddress: payload.streetaddress,
        addresslocality: payload.addresslocality,
        addressregion: payload.addressregion,
        postalcode: payload.postalcode,
        telephone: payload.telephone,
        email: payload.email,
        uri: payload.uri,
        contactName: payload.contactName,
        contactJobtitle: payload.contactJobtitle,
        contactPhone: payload.contactPhone,
        contactEmail: payload.contactEmail
      }
      api
        .editBusiness(payload._id, data)
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
  saveBusiness({ commit }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .saveBusiness(payload)
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
  deleteBusiness({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteBusiness(payload)
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
  [types.BUSINESS](state, businesses) {
    state.businesses = businesses
  },
  [types.TOTAL_BUSINESS](state, value) {
    state.totalBusinesses = value
  }
}

const state = {
  businesses: [],
  totalBusinesses: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
