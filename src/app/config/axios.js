import axios from 'axios'
import store from '../store'

export const baseURL = process.env.REACT_APP_API_URL

export const Axios = axios.create({
  baseURL: baseURL,
  timeout: 20000,
})

Axios.interceptors.request.use(axiosConfig => {
  const state = store.getState()

  if (state.auth.token) {
    axiosConfig.headers['Authorization'] = state.auth.token
  }

  return axiosConfig
})