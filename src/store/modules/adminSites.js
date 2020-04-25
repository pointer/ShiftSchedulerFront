import * as types from '@/store/mutation-types'
import api from '@/services/api/adminSites'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  sites: state => state.sites,
  totalSites: state => state.totalSites,
  siteNames: state => state.siteNames
}

const actions = {
  getSites({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getSites(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.SITES, response.data.docs)
            commit(types.TOTAL_SITES, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editSite({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        // context: payload.context,
        siteName: payload.editedItem.siteName,
        siteEmail: payload.editedItem.siteEmail,
        siteType: payload.editedItem.siteType,
        sitePostalCode: payload.editedItem.sitePostalCode,
        sitePhone: payload.sitePhone,
        siteAddressLocality: payload.siteAddressLocality,
        siteAddressRegion: payload.iteAddressRegion,
        siteContact: payload.siteContact,
        sitecontactPhone: payload.sitecontactPhone,
        sitecontactEmail: payload.sitecontactEmail,
        jobTitle: payload.jobTitle,
        businessId: payload.businessId
      }
      api
        .editSite(payload._id, data)
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
  saveSite({ commit }, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      api
        .saveSite(payload)
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
  deleteSite({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteSite(payload)
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
  [types.SITES](state, sites) {
    state.sites = sites
  },
  [types.TOTAL_SITES](state, value) {
    state.totalSites = value
  },
  [types.SITE_NAMES](state, value) {
    state.siteNames = value
  }
}

const state = {
  sites: [],
  siteNames: [],
  totalSites: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
