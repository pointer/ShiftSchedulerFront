<template>
  <v-footer color="dark" padless>
    <v-row justify="center" no-gutters>
      <v-col cols="12" class="text-lg-right">
        <v-btn text @click="userLogout">
          <v-icon left>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </v-col>
      <v-col cols="12" class="text-center">
        &copy; {{ new Date().getFullYear() }} — <strong>Miradata</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<!--
<template>
  <v-footer height="60" class="mt-5 justify-center text-xs-center d-block">
    <div class="mt-2">
      v{{ appVersion }} {{ $t('footer.MADE_WITH') }}
      <v-icon small class="red--text mx-0 px-0"></v-icon>
      &nbsp;{{ $t('footer.BY') }}
    <v-btn
      text
      v-if="isTokenSet"
      @click="userLogout"
      class="hidden-sm-and-down btnLogout"
    >
      <v-icon left>mdi-exit-to-app</v-icon>
      {{ $t('menuItems.LOGOUT') }}
    </v-btn>
    </div>
    <div>
      <a href=""></a>
    </div>

  </v-footer>
</template>
-->
<script>
import { mapGetters } from 'vuex'
import LocaleChanger from '@/components/core/LocaleChanger'
import ResizeText from 'vue-resize-text'

export default {
  name: 'Footer',
  data: () => ({
    links: ['Logout', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us']
  }),
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    }
  },
  methods: {
    userLogout() {
      this.$store.dispatch('userLogout')
    }
  }
}
</script>
