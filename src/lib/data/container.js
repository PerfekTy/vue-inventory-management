import { api } from '../axios.interceptors'

export async function getContainers() {
  try {
    const { data } = await api.get(`/api/all-containers`)

    return data
  } catch (error) {
    console.log(error)
  }
}
