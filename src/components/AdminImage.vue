<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm12 md4 mt-3 pl-4>
        <v-toolbar-title>{{ $t('users.TITLE') }}</v-toolbar-title>
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
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <image-input v-model="editedItem.avatar">
                      <div slot="activator">
                        <v-avatar
                          size="100px"
                          v-ripple
                          v-if="!editedItem.avatar"
                          class="grey lighten-3 mb-3"
                          color="teal"
                        >
                          <span>Click to add avatar</span>
                        </v-avatar>
                        <v-avatar
                          size="75px"
                          v-ripple
                          v-else
                          class="mb-3"
                          color="teal"
                        >
                          <v-img
                            :src="editedItem.avatar.imageURL"
                            alt="avatar"
                          />
                        </v-avatar>
                      </div>
                    </image-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      id="username"
                      name="username"
                      v-model="editedItem.username"
                      :label="$t('users.headers.USER_NAME')"
                      :data-vv-as="$t('users.headers.USER_NAME')"
                      :error="errors.has('username')"
                      :error-messages="errors.collect('username')"
                      v-validate.disable="'required'"
                      autocomplete="off"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
                @click="saveItem"
                class="btnSave"
                >{{ $t('dataTable.SAVE') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
        <template>
          <v-row justify="center">
            <v-dialog v-model="confirm" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">{{
                  $t('common.WARNING')
                }}</v-card-title>
                <v-card-text>{{
                  $t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM')
                }}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="confirm = false">{{
                    $t('common.CANCEL')
                  }}</v-btn>
                  <v-btn color="green darken-1" text @click="doDeleteItem()">{{
                    $t('common.DELETE')
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
      </v-flex>
    </v-layout>
    <v-data-table
      must-sort
      :loading="dataTableLoading"
      :no-data-text="$t('dataTable.NO_DATA')"
      :no-results-text="$t('dataTable.NO_RESULTS')"
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template v-slot:item._id="props">
        <v-layout class="justify-center">
          <v-tooltip top>
            <!-- <template #activator="data"> -->
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
      <template v-slot:pageText="props">
        {{ props.pageStart }} - {{ props.pageStop }} {{ $t('dataTable.OF') }}
        {{ props.itemsLength }}
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
import ImageInput from './ImageInput.vue'
import BSON from 'bson'
// import { bus } from '../main'
export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('users.TITLE')} - %s`
    }
  },
  data() {
    return {
      searchInput: '',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      confirm: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      item2Delete: {},
      fieldsToSearch: ['username', 'email', 'role', 'city', 'phone'],
      avatar: null,
      saving: false,
      saved: false
    }
  },
  components: {
    ImageInput
    // binData,
    // serialize,
    // deserialize
  },
  computed: {
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
          text: this.$i18n.t('users.headers.USER_AVATAR'),
          align: 'left',
          sortable: true,
          value: 'avatar'
        },
        {
          text: this.$i18n.t('users.headers.USER_NAME'),
          align: 'left',
          sortable: true,
          value: 'username'
        }
      ]
    },
    items() {
      // console.log(this.$store.state.adminUsers.users)
      return this.$store.state.adminUsers.users
    },
    totalItems() {
      return this.$store.state.adminUsers.totalUsers
    }
    // confirm: {
    //   get() {
    //     return this.visible
    //   },
    //   set(value) {
    //     if (!value) {
    //       this.$emit('close')
    //     }
    //   }
    // }
  },
  watch: {
    dialog(value) {
      return value ? true : this.close()
    },
    search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    },
    avatar: {
      handler() {
        this.saved = false
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['getAllImages', 'editImage', 'saveImage', 'deleteImage']),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
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
        await this.getUsers(
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
    async deleteItem($event, item) {
      try {
        this.item2Delete = Object.assign({}, item)
        this.confirm = true
        // const response = this.doDeleteItem(item)
        // if (response) {
        //   this.dataTableLoading = false
        // }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.log(error)
        this.dataTableLoading = false
      }
    },
    async doDeleteItem() {
      this.dataTableLoading = true
      this.confirm = false
      await this.deleteUser(this.item2Delete._id)
      await this.getUsers(
        buildPayloadPagination(this.pagination, this.buildSearch())
      )
      this.dataTableLoading = false
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    saveItem() {
      // const Binary = BSON.Binary
      // const BinData = new Binary(5, this.editedItem.avatar.imageURL)
      // const data = BSON.serialize(BinData)
      // console.log('avatar:', this.editedItem.avatar)
      this.save()
    },
    async save() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          this.dataTableLoading = true
          // Updating item
          if (this.editedItem._id) {
            await this.editImage(this.editedItem)
            await this.getImages(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveUser({
              label: this.editedItem.username,
              path: this.editedItem.path
            })
            await this.getUsers(
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
    },
    uploadImage() {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
    },
    savedAvatar() {
      this.saving = false
      this.saved = true
    }
  },
  async mounted() {
    await this.getAllCities()
    try {
      this.dataTableLoading = true
      await this.getUsers(
        buildPayloadPagination(this.pagination, this.buildSearch())
      )
      this.dataTableLoading = false
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      this.dataTableLoading = false
    }
  },
  props: ['visible']
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
