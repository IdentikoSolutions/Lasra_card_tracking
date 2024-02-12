import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY
console.log(apiKey, 'Api key')
const options = {
  baseURL: '/cartrackerapi/api/',
  headers: {
    accept: 'text/plain',
    'Content-Type': 'application/json',
    "XApikey": apiKey
    // "XApikey":"pgH7QzFHJx4w46fI~5Uzi4RvtTwlEXp"
  }
}
export const Axios = axios.create(options)
