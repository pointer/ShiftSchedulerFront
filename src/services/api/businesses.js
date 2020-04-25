import axios from 'axios'

export default {
  getAllBusinesses() {
    return axios.get('/businesses/all')
  }
}
