<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm12 md4 mt-3 pl-4>
        <v-toolbar-title>{{ $t('site.TITLE') }}</v-toolbar-title>
      </v-flex>
      <v-flex xs12 sm6 md4 px-3>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('dataTable.SEARCH')"
          single-line
          hide-details
          clearable
          clear-icon="mdi-close"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
        <v-dialog
          v-model="dialog"
          max-width="800px"
          content-class="dlgNewEditItem"
        >
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" v-on="on" class="btnNewItem pr-4">
              <v-icon class="mr-2">mdi-plus</v-icon>
              {{ $t('dataTable.NEW_ITEM') }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <template v-if="editedItem._id">
                    <v-flex xs12 md4>
                      <label for="createdAt">{{ $t('common.CREATED') }}</label>
                      <div name="createdAt">
                        {{ getFormat(editedItem.createdAt) }}
                      </div>
                    </v-flex>
                    <v-flex xs12 md4>
                      <label for="updatedAt">{{ $t('common.UPDATED') }}</label>
                      <div name="updatedAt">
                        {{ getFormat(editedItem.updatedAt) }}
                      </div>
                    </v-flex>
                  </template>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="siteName"
                      name="siteName"
                      v-model="editedItem.siteName"
                      :label="$t('site.headers.SITE_NAME')"
                      :data-vv-as="$t('site.headers.SITE_NAME')"
                      :error="errors.has('siteName')"
                      :error-messages="errors.collect('siteName')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="siteEmail"
                      name="siteEmail"
                      type="siteEmail"
                      v-model="editedItem.siteEmail"
                      :label="$t('site.headers.SITE_EMAIL')"
                      :data-vv-as="$t('site.headers.SITE_EMAIL')"
                      :error="errors.has('siteEmail')"
                      :error-messages="errors.collect('siteEmail')"
                      v-validate.disable="'required|email'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="siteStreetAddress"
                      name="siteStreetAddress"
                      v-model="editedItem.siteStreetAddress"
                      :label="$t('site.headers.SITE_STREET_ADDRESS')"
                      :data-vv-as="$t('site.headers.SITE_STREET_ADDRESS')"
                      :error="errors.has('siteStreetAddress')"
                      :error-messages="errors.collect('siteStreetAddress')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-autocomplete
                      id="siteAddressLocality"
                      name="siteAddressLocality"
                      :label="$t('site.headers.SITE_ADDRESS_LOCALITY')"
                      :search-input.sync="searchInput"
                      v-model="editedItem.siteAddressLocality"
                      :items="allCities"
                      clearable
                      :data-vv-as="$t('site.headers.SITE_ADDRESS_LOCALITY')"
                      :error="errors.has('siteAddressLocality')"
                      :error-messages="errors.collect('siteAddressLocality')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                      class="inputCity"
                    />
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="siteAddressRegion"
                      name="siteAddressRegion"
                      v-model="editedItem.siteAddressRegion"
                      :label="$t('site.headers.SITE_ADDRESS_REGION')"
                      :data-vv-as="$t('site.headers.SITE_ADDRESS_REGION')"
                      :error="errors.has('siteAddressRegion')"
                      :error-messages="errors.collect('siteAddressRegion')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="sitePostalCode"
                      name="sitePostalCode"
                      v-model="editedItem.sitePostalCode"
                      :label="$t('site.headers.SITE_POSTAL_CODE')"
                      :data-vv-as="$t('site.headers.SITE_POSTAL_CODE')"
                      :error="errors.has('postalCode')"
                      :error-messages="errors.collect('sitePostalCode')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="sitePhone"
                      name="sitePhone"
                      type="tel"
                      v-model="editedItem.sitePhone"
                      :label="$t('site.headers.SITE_PHONE')"
                      :data-vv-as="$t('site.headers.SITE_PHONE')"
                      :error="errors.has('sitePhone')"
                      :error-messages="errors.collect('sitePhone')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="siteType"
                      name="siteType"
                      v-model="editedItem.siteType"
                      :label="$t('site.headers.SITE_TYPE')"
                      :data-vv-as="$t('site.headers.SITE_TYPE')"
                      :error="errors.has('siteType')"
                      :error-messages="errors.collect('siteType')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="siteContact"
                      name="siteContact"
                      v-model="editedItem.siteContact"
                      :label="$t('site.headers.SITE_CONTACT_NAME')"
                      :data-vv-as="$t('site.headers.SITE_CONTACT_NAME')"
                      :error="errors.has('siteContact')"
                      :error-messages="errors.collect('siteContact')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="jobTitle"
                      name="jobTitle"
                      v-model="editedItem.jobTitle"
                      :label="$t('site.headers.JOB_TITLE')"
                      :data-vv-as="$t('site.headers.JOB_TITLE')"
                      :error="errors.has('jobTitle')"
                      :error-messages="errors.collect('jobTitle')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="sitecontactPhone"
                      name="sitecontactPhone"
                      type="tel"
                      v-model="editedItem.sitecontactPhone"
                      :label="$t('site.headers.SITE_CONTACT_PHONE')"
                      :data-vv-as="$t('site.headers.SITE_CONTACT_PHONE')"
                      :error="errors.has('sitecontactPhone')"
                      :error-messages="errors.collect('sitecontactPhone')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="sitecontactEmail"
                      name="sitecontactEmail"
                      type="sitecontactEmail"
                      v-model="editedItem.sitecontactEmail"
                      :label="$t('site.headers.SITE_CONTACT_EMAIL')"
                      :data-vv-as="$t('site.headers.SITE_CONTACT_EMAIL')"
                      :error="errors.has('sitecontactEmail')"
                      :error-messages="errors.collect('sitecontactEmail')"
                      v-validate.disable="'required|email'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-autocomplete
                      id="businessId"
                      name="businessId"
                      :label="$t('site.headers.SITE_BUSINESS')"
                      :search-input.sync="searchInput"
                      v-model="editedItem.businessId"
                      :items="allBusinesses"
                      clearable
                      :data-vv-as="$t('site.headers.SITE_BUSINESS')"
                      :error="errors.has('businessId')"
                      :error-messages="errors.collect('businessId')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                      class="inputBusiness"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red lighten3"
                text
                @click="close"
                class="btnCancel"
                >{{ $t('dataTable.CANCEL') }}</v-btn
              >
              <v-btn
                color="yellow lighten3"
                text
                @click="save"
                class="btnSave"
                >{{ $t('dataTable.SAVE') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      item-key="username"
      :search="search"
      :server-items-length="totalItems"
      class="elevation-1"
      @page-count="pageCount = $event"
      @pagination="doSomething"
    >
      <template v-slot:item._id="props">
        <v-layout class="justify-center">
          <v-tooltip top>
            <template #activator="on">
              <v-btn v-on="on" @click="editItem(props.item)" icon class="mx-0">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('dataTable.EDIT') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="on">
              <v-btn
                icon
                color="orange darken-1"
                class="mx-0"
                v-on="on"
                @click="deleteItem($event, props.item)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('dataTable.DELETE') }}</span>
          </v-tooltip>
        </v-layout>
      </template>
      <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
      <template v-slot:no-results>{{ $t('dataTable.NO_RESULTS') }}</template>
    </v-data-table>
    <ErrorMessage />
    <SuccessMessage />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('site.TITLE')} - %s`
    }
  },
  data() {
    return {
      searchInput: '',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: [
        'siteName',
        'siteEmail',
        'siteAddressLocality',
        'siteContact',
        'sitePhone'
      ]
    }
  },
  computed: {
    roles() {
      return [
        { name: this.$t('roles.ADMIN'), value: 'admin' },
        { name: this.$t('roles.USER'), value: 'user' }
      ]
    },
    allCities() {
      return this.$store.state.cities.allCities
    },
    allBusinesses() {
      return this.$store.state.businesses.allBusinesses
    },
    formTitle() {
      return this.editedItem._id
        ? this.$t('dataTable.EDIT_ITEM')
        : this.$t('dataTable.NEW_ITEM')
    },
    headers() {
      return [
        {
          text: this.$i18n.t('dataTable.ACTIONS'),
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text: this.$i18n.t('site.headers.SITE_NAME'),
          align: 'left',
          sortable: true,
          value: 'siteName'
        },
        {
          text: this.$i18n.t('site.headers.SITE_PHONE'),
          align: 'left',
          sortable: true,
          value: 'sitePhone'
        },
        {
          text: this.$i18n.t('site.headers.SITE_EMAIL'),
          align: 'left',
          sortable: true,
          value: 'siteEmail'
        },
        {
          text: this.$i18n.t('site.headers.SITE_POSTAL_CODE'),
          align: 'left',
          sortable: true,
          value: 'sitePostalCode'
        },
        {
          text: this.$i18n.t('site.headers.SITE_ADDRESS_LOCALITY'),
          align: 'left',
          sortable: true,
          value: 'siteAddressLocality'
        },
        {
          text: this.$i18n.t('site.headers.SITE_CONTACT_NAME'),
          align: 'left',
          sortable: true,
          value: 'siteContact'
        },
        {
          text: this.$i18n.t('site.headers.JOB_TITLE'),
          align: 'left',
          sortable: true,
          value: 'jobTitle'
        },
        {
          text: this.$i18n.t('site.headers.SITE_CONTACT_PHONE'),
          align: 'left',
          sortable: true,
          value: 'sitecontactPhone'
        },
        {
          text: this.$i18n.t('site.headers.SITE_CONTACT_EMAIL'),
          align: 'left',
          sortable: true,
          value: 'sitecontactEmail'
        },
        {
          text: this.$i18n.t('common.CREATED'),
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text: this.$i18n.t('common.UPDATED'),
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return this.$store.state.adminSites.sites
    },
    totalItems() {
      return this.$store.state.adminSites.totalSites
    }
  },
  watch: {
    dialog(value) {
      return value ? true : this.close()
    },
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.getSites(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.dataTableLoading = false
        }
      },
      deep: true
    },
    search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    }
  },
  methods: {
    ...mapActions([
      'getAllBusinesses',
      'getAllCities',
      'getSites',
      'editSite',
      'saveSite',
      'deleteSite'
    ]),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    },
    doSomething(v) {
      // console.log('pagination', v)
      this.pagination = v
    },
    roleName(value) {
      return value === 'admin' ? this.$t('roles.ADMIN') : this.$t('roles.USER')
    },
    trueFalse(value) {
      return value
        ? '<i aria-hidden="true" class="v-icon mdi mdi-check green--text" style="font-size: 16px;"></i>'
        : '<i aria-hidden="true" class="v-icon mdi mdi-close red--text" style="font-size: 16px;"></i>'
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getSites(
          buildPayloadPagination(this.pagination, this.buildSearch())
        )
        this.dataTableLoading = false
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    buildSearch() {
      return this.search
        ? { query: this.search, fields: this.fieldsToSearch.join(',') }
        : {}
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem(item) {
      try {
        const response = await this.$confirm(
          this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),
          {
            title: this.$t('common.WARNING'),
            buttonTrueText: this.$t('common.DELETE'),
            buttonFalseText: this.$t('common.CANCEL'),
            buttonTrueColor: 'red lighten3',
            buttonFalseColor: 'yellow lighten3'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.deleteSite(item._id)
          await this.getSites(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async save() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          this.dataTableLoading = true
          // Updating item
          if (this.editedItem._id) {
            await this.editSite(this.editedItem)
            await this.getSites(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveSite({
              siteName: this.editedItem.siteName,
              siteEmail: this.editedItem.siteEmail,
              siteType: this.editedItem.siteType,
              sitePostalCode: this.editedItem.sitePostalCode,
              sitePhone: this.editedItem.sitePhone,
              siteAddressLocality: this.editedItem.siteAddressLocality,
              siteAddressRegion: this.editedItem.siteAddressRegion,
              siteContact: this.editedItem.siteContact,
              sitecontactPhone: this.editedItem.sitecontactPhone,
              sitecontactEmail: this.editedItem.sitecontactEmail,
              jobTitle: this.editedItem.jobTitle,
              businessId: this.editedItem.businessId
            })
            await this.getSites(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          }
          this.close()
          return
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
      }
    }
  },
  async mounted() {
    await this.getAllCities()
    await this.getAllBusinesses()
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
