import axios from 'axios'

export default {
  getAllTasks() {
    return axios.get('/tasks/all')
  }
}
