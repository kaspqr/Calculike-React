import axios from "axios"

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3500' : 'https://calculike-api.onrender.com'

export default axios.create({
  baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
