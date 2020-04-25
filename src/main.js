import Vue from 'vue'
import '@/plugins/axios'
// import '@/plugins/vuetify'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import './plugins/vuetify'
import '@/plugins/veevalidate'
import '@/plugins/common'
import '@/plugins/googleAnalytics'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import Vuetify from 'vuetify'

Vue.config.productionTip = false

Vue.use(Vuetify)
const opts = {
  theme: {
    dark: true,
    themes: {
      light: {},
      dark: {}
    }
  }
}

export const app = new Vue({
  router,
  store,
  i18n,
  vuetify: new Vuetify(opts),
  render: h => h(App),
  created() {
    store.dispatch('setLocale', store.getters.locale)
    if (store.getters.isTokenSet) {
      store.dispatch('autoLogin')
    }
  }
}).$mount('#app')

if (window.Cypress) {
  // Only available during E2E tests
  window.app = app
}
