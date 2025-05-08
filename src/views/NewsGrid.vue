<template>
  <div id="layoutSidenav_content">
    <main>
      <div class="container-fluid px-4 mt-4">
        <h2 class="mb-4 text-primary text-center">Últimas Noticias</h2>

        <div class="row mb-4">
          <div class="col-md-6">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="Buscar por título o autor..."
            />
          </div>
          <div class="col-md-6">
            <select v-model="sortOrder" class="form-select">
              <option value="desc">Ordenar por más recientes</option>
              <option value="asc">Ordenar por más antiguos</option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="alert alert-info text-center">
          <div class="spinner-border text-info me-2" role="status"></div>
          Cargando noticias...
        </div>

        <div v-else-if="filteredNews.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col" v-for="(n, index) in filteredNews" :key="index">
            <LittleNews :news="n" />
          </div>
        </div>

        <div v-else class="alert alert-warning text-center">No hay noticias disponibles.</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useNewsStore } from '@/stores/news'
import LittleNews from '@/components/LittleNewsComponent.vue'

const newsStore = useNewsStore()
const loading = ref(false)
const error = ref('')
let newsList = ref([])

const searchQuery = ref('')
const sortOrder = ref('desc')
const newsS = ref(newsStore)

onMounted(() => {
  loading.value = true
  error.value = ''

  if (newsS.value) {
    let newsLastDate = newsS.value.news[0].created
    newsStore
      .checkDate(newsLastDate)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        error.value = e.response?.status === 401 ? 'error' : 'Error de conexión'
        console.error(error.value)
      })
    newsList.value = newsS.value.news
    loading.value = false
    return
  }
  newsStore
    .viewAllNews()
    .then((res) => {
      newsList.value = res
    })
    .catch((e) => {
      error.value =
        e.response?.status === 401 ? 'Usuario o contraseña incorrectos' : 'Error de conexión'
      console.error(error.value)
    })
    .finally(() => {
      loading.value = false
    })
})

const filteredNews = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  let filtered = newsList.value.filter(
    (n) => n.title.toLowerCase().includes(query) || n.user?.name?.toLowerCase().includes(query),
  )

  return filtered.sort((a, b) => {
    return sortOrder.value === 'asc' ? a.id - b.id : b.id - a.id
  })
})
</script>
