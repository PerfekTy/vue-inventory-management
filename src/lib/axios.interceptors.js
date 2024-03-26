import axios from 'axios'
import cookies from 'vue-cookies'

export const api = axios.create({
  baseURL: 'http://localhost:8080'
})

api.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    const authToken = cookies.get('token')
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      console.error('Response Error Status Code:', error.response.status)
      console.error('Response Error Data:', error.response.data)
    } else if (error.request) {
      console.error('Request Error:', error.request)
    } else {
      console.error('Error Message:', error.message)
    }
    return Promise.reject(error)
  }
)
