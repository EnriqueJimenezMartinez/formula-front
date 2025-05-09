<template>
  <div class="container my-5">
    <div v-if="newsStore.actualNews">
      <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div class="bg-light p-5 text-center">
          <h1 class="card-title display-5 fw-bold mb-2 text-primary">
            {{ newsStore.actualNews.title }}
          </h1>
          <p class="text-muted fst-italic mb-0">
            Publicado por <strong>{{ newsStore.actualNews.user.name }}</strong> el
            {{ formatDate(newsStore.actualNews.created) }}
          </p>
        </div>

        <div class="card-body p-5">
          <div class="mb-4">
            <span
              v-for="(tag, index) in newsStore.actualNews.tags"
              :key="index"
              class="badge me-2 px-3 py-2 rounded-pill tag-hover"
              :class="tagClass(tag.name)"
            >
              {{ tag.name }}
            </span>
          </div>
          <p class="card-text fs-5 lh-lg text-body">
            {{ newsStore.actualNews.body }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 fs-5 text-muted">Cargando noticia...</p>
    </div>
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

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function tagClass(tag) {
  const tagMap = {
    tag1: 'bg-secondary text-white',
    tag2: 'bg-primary text-white',
    tag3: 'bg-success text-white',
    tag4: 'bg-info text-dark',
    tag5: 'bg-warning text-dark',
    tag6: 'bg-danger text-white',
  }
  return tagMap[tag] || 'bg-light text-dark border'
}
</script>

<style scoped>
.tag-hover {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.tag-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>






