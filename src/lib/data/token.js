import axios from 'axios'
import * as jwt from 'jose'
import cookies from 'vue-cookies'
import { serverString } from '../utils'

export function getToken() {
  const token = cookies.get('token')
  if (!token) {
    return null
  }

  return token
}

export async function startTokenRefresh() {
  const token = getToken()
  if (!token) {
    return
  }

  const currentTime = Math.floor(Date.now() / 1000)
  const expirationTime = jwt.decodeJwt(token).exp

  if (expirationTime - currentTime < 60) {
    const newToken = await getNewRefreshedToken()
    cookies.set('token', newToken.token)
  }
}

export async function getNewRefreshedToken() {
  const refreshToken = cookies.get('refreshToken')
  if (!refreshToken) {
    return
  }

  const { data } = await axios.post(
    `${serverString}/api/refresh-token`,
    {},
    { headers: { Authorization: `Bearer ${refreshToken}` } }
  )

  return data
}
