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
              class="form-control shadow-sm"
              placeholder="Buscar por título o autor..."
            />
          </div>
          <div class="col-md-6">
            <select v-model="sortOrder" class="form-select shadow-sm">
              <option value="desc">Ordenar por más recientes</option>
              <option value="asc">Ordenar por más antiguos</option>
            </select>
          </div>
        </div>
        <div
          v-if="loading"
          class="alert alert-info text-center d-flex justify-content-center align-items-center"
        >
          <div class="spinner-border text-info me-2" role="status"></div>
          Cargando noticias...
        </div>

        <div v-else-if="filteredNews.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col" v-for="(n, index) in filteredNews" :key="index">
            <div class="card shadow-sm border-0 rounded-4 h-100 news-card">
              <div class="card-body p-4">
                <h5 class="card-title text-primary fw-bold">{{ n.title }}</h5>
                <p class="card-text text-muted">{{ n.body.substring(0, 150) }}...</p>
                <a :href="'/news/' + n.slug" class="stretched-link text-decoration-none"
                  >Leer más</a
                >
              </div>
            </div>
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

<style scoped>
.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.news-card .card-title {
  color: #007bff;
}

.news-card .card-text {
  color: #6c757d;
}

.alert-info {
  font-size: 1.2rem;
  padding: 1rem 2rem;
}

.spinner-border {
  width: 2.5rem;
  height: 2.5rem;
}

input.form-control,
select.form-select {
  border-radius: 10px;
  border: 1px solid #ccc;
}

input.form-control:focus,
select.form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
