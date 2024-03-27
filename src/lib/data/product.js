import { api } from '../axios.interceptors'

export async function getProducts() {
  try {
    const { data } = await api.get(`/api/all-products`)

    return data
  } catch (error) {
    console.log(error)
  }
}
