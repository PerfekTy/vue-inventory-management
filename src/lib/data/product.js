import { api } from '../axios.interceptors'

export async function getProducts(container_id) {
  try {
    const { data } = await api.get(`/api/all-products/${container_id}`)

    return data
  } catch (error) {
    console.log(error)
  }
}
