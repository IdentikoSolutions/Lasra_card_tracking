import axios from 'axios'

const options = {
  baseURL: '/cartrackerapi/api/',
  headers: {
    accept: 'text/plain',
    'Content-Type': 'application/json',
    "XApikey":"pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp"
  },
}
console.log(options.baseURL, "baseUsrl")
export const Axios = axios.create(options)
