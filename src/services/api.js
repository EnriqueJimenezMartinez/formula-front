import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Base de tu API 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8765/api',
  headers: { 'Content-Type': 'application/json' }
})

// Interceptor para inyectar el token en todas las peticiones
api.interceptors.request.use(config => {
  const { token } = useAuthStore()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
