import axios from 'axios'

export default {
  getCalendarItems(params) {
    const querystring = `?dateStart=${params.dateStart}&dateEnd=${params.dateEnd}`
    return axios.get(`/assignments${querystring}`)
  }
}
