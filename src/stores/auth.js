
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    async login(email, password) {
      const resp = await api.post('/users/login', { email, password })
      this.token = resp.data.data.token
      this.user = resp.data.data.user
      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(this.user)) 
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})

