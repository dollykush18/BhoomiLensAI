import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://demo-api.bhoomilens.ai/api',
  timeout: 15000,
})

export default api
