import axios from 'axios'

export default {
  getTasks(params) {
    return axios.get('/tasks', {
      params
    })
  },
  editTask(id, payload) {
    return axios.patch(`/tasks/${id}`, payload)
  },
  saveTask(payload) {
    // console.log(payload)
    return axios.post('/tasks/', payload)
  },
  deleteTask(id) {
    return axios.delete(`/tasks/${id}`)
  }
}
