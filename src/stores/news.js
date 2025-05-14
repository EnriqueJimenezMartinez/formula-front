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

          const news = resp.data.data

          if (news) {
            // Validamos si hay image_url y si es válida (opcional)
            if (
              news.image_url &&
              (news.image_url.endsWith('.jpg') ||
                news.image_url.endsWith('.png') ||
                news.image_url.endsWith('.webp'))
            ) {
              console.log('Imagen válida encontrada:', news.image_url)
            } else {
              console.log('No se encontró una imagen válida para esta noticia.')
            }

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
    /*checkDate(date) {
      return api.post(`/news/last-date/${date}`).then((resp) => {
        console.log(resp)
      })
    },*/
  }
})
