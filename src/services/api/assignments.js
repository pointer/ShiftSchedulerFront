import axios from 'axios'

export default {
  getAllAssignments() {
    return axios.get('/assignments/all')
  }
}
