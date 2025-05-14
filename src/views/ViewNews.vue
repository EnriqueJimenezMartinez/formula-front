<template>
  <div class="container my-5 p-4 bg-white rounded-4 shadow-lg">
    <div v-if="newsStore.actualNews">
      <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div class="bg-light p-5 text-center text-dark rounded-top-4">
          <h1 class="display-4 fw-bold mb-3">
            {{ newsStore.actualNews.title }}
          </h1>
          <p class="mb-0 fw-light">
            Publicado por <strong>{{ newsStore.actualNews.user.name }}</strong> el
            {{ formatDate(newsStore.actualNews.created) }}
          </p>
        </div>
        <div v-if="newsStore.actualNews.image_url" class="text-center">
          <img
            :src="newsStore.actualNews.image_url"
            alt="Imagen de la noticia"
            class="img-fluid rounded-4 my-4 shadow-sm"
            style="max-height: 500px; width: 100%; object-fit: contain;"
          />
        </div>
        <div class="card-body p-4 bg-white text-dark rounded-bottom-4">
          <div class="mb-4">
            <span
              v-for="(tag, index) in newsStore.actualNews.tags"
              :key="index"
              class="badge me-2 mb-2 px-3 py-2 fs-6 rounded-pill tag-hover"
              :class="tagClass(tag.name)"
            >
              <i class="bi bi-tag-fill me-1"></i>{{ tag.name }}
            </span>
          </div>
          <p class="fs-5 lh-lg">
            {{ newsStore.actualNews.body }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5 text-dark">
      <div class="spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
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
  newsStore.viewNews(slug).catch((e) => {
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
    tag1: 'bg-light text-dark',
    tag2: 'bg-light text-dark',
    tag3: 'bg-light text-dark',
    tag4: 'bg-light text-dark',
    tag5: 'bg-light text-dark',
    tag6: 'bg-light text-dark',
  }
  return tagMap[tag] || 'bg-light text-dark border'
}
</script>

<style scoped>
.container {
  background-color: #ffffff;
}

.card {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.card img {
  border-radius: 12px;
}

.bg-light {
  background-color: #f5f5f5;
}

.bg-white {
  background-color: #ffffff;
}

.text-dark {
  color: #212529;
}

.card-body {
  background-color: #ffffff;
}

.tag-hover {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
}
.tag-hover:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.badge {
  background-color: #e0e0e0;
  color: #212529;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.badge:hover {
  background-color: #c8c8c8;
}

.spinner-border {
  border-color: #e0e0e0;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

body {
  font-family: 'Arial', sans-serif;
  color: #212529;
}

.card img {
  transition: transform 0.3s ease;
}
.card img:hover {
  transform: scale(1.05);
}
</style>
