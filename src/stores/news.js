import { defineStore } from 'pinia'
import api from '@/services/api'

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: JSON.parse(localStorage.getItem('news') || '[]'),
    actualNews: JSON.parse(localStorage.getItem('actualNews') || 'null'),
  }),
  actions: {
    viewAllNews() {
      return api.get('/news').then((resp) => {
        this.news = resp.data.data
        localStorage.setItem('news', JSON.stringify(this.news))
        return this.news
      })
    },
    viewNews(slug) {
  return api
    .post('/news/view', { slug })
    .then((resp) => {

      const news = resp.data.data

      if (news) {


        this.actualNews = news
        localStorage.setItem('actualNews', JSON.stringify(this.actualNews))
      }
    })
    
}
,
    /*checkDate(date) {
      return api.post(`/news/last-date/${date}`).then((resp) => {
        console.log(resp)
      })
    },*/
  },
})
