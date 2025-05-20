import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Base URL dinámica
const baseURL = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.MODE === 'production'
    ? 'https://gtdriveschool.com/api'
    : 'http://localhost:8765/api'

// Crear instancia de Axios
const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor de solicitud para incluir token dinámicamente
api.interceptors.request.use((config) => {
  const authStore = useAuthStore() // ✅ Llamado dentro del interceptor
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

export default api
