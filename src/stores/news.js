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
        console.log(resp.data)
        this.news = resp.data.data
        localStorage.setItem('news', JSON.stringify(this.news))
        return this.news
      })
    },
    viewNews(slug) {
      return api
        .get(`/news/view/${encodeURIComponent(slug)}`)
        .then((resp) => {
          console.log('Respuesta de la API:', resp.data)

          // Usar directamente la noticia si resp.data.data es un objeto
          const news = resp.data.data

          if (news) {
            this.actualNews = news
            localStorage.setItem('actualNews', JSON.stringify(this.actualNews))
          } else {
            console.error('No se encontró la noticia con el slug:', slug)
          }
        })
        .catch((e) => {
          console.error('Error al cargar la noticia:', e)
        })
    },
    checkDate(date){
      return api
        .post(`/news/last-date/${date}`)
        .then((resp) => {
          console.log(resp)
        })


    },
  },
})
