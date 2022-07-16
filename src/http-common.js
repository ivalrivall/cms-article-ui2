import axios from 'axios'
export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem('allstar_token')
      ? 'Bearer ' + localStorage.getItem('allstar_token')
      : '',
  },
})
