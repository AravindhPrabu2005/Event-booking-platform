import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://kootamx.aravindhprabu.me/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance
