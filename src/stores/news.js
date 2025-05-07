import { defineStore } from 'pinia'
import api from '@/services/api'

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: localStorage.getItem('news') || [],
    actualNews: localStorage.getItem('actualNews') || [],
  }),
  actions: {
    viewAllNews() {
      return api.get('/news').then((resp) => {
        console.log(resp.data)
        this.news = resp.data.data
        localStorage.setItem('news', JSON.stringify(this.news))
        return this.news
      })
    },
    viewNews(slug) {
      return api.get(`/news/${slug}`).then((resp) => {
        this.actualNews = resp.data.data.news
        localStorage.setItem('actualNews', this.actualNews)
      })
    },
  },
})
