import axios from 'axios'

const options = {
  baseURL: '/cartrackerapi/api/',
  headers: {
    accept: 'text/plain',
    'Content-Type': 'application/json',
    // 'Authorization':
  },
}
console.log(options.baseURL, "baseUsrl")
export const Axios = axios.create(options)
