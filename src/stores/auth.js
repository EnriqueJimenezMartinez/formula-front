import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || '',
  }),
  actions: {
    login(email, password) {
      return api.post('/users/login', { email, password }).then((resp) => {
        console.log(resp)
        this.token = resp.data.data.token
        this.user = resp.data.data.user
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', this.token)
      })
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
