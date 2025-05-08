<template>
  <div v-if="newsStore.actualNews">
    <h1>{{ newsStore.actualNews.title }}</h1>
    <p>{{ newsStore.actualNews.body }}</p>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/news'

const route = useRoute()
const slug = route.params.slug
const newsStore = useNewsStore()

onMounted(() => {
  console.log('Se está llamando a viewNews con el slug:', slug)
  newsStore.viewNews(slug)
    .then(() => {
      console.log('Noticia cargada:', newsStore.actualNews)
    })
    .catch((e) => {
      console.error('Error al cargar la noticia:', e)
    })
})
</script>





