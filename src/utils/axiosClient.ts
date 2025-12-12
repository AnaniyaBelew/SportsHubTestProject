import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'https://www.thesportsdb.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})