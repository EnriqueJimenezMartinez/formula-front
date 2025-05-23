<template>
  <div
    id="layoutSidenav_content"
    class="my-5 mx-5 rounded-4"
    style="min-height: 100vh"
  >
    <main>
      <div class="container-fluid px-4 py-4">
        <h2 class="mb-4 text-center fw-bold display-6 text-muted">📰 Últimas Noticias</h2>

        <div class="row mb-4">
          <div class="col-md-6 mb-2 mb-md-0">
            <div class="input-group shadow-sm">
              <span class="input-group-text border-secondary bg-card">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control border-secondary bg-card text-main"
                placeholder="Buscar por título o autor..."
              />
            </div>
          </div>
          <div class="col-md-6">
            <select
              v-model="sortOrder"
              class="form-select shadow-sm border-secondary bg-card text-main"
            >
              <option value="desc">Más recientes</option>
              <option value="asc">Más antiguos</option>
            </select>
          </div>
        </div>

        <div
          v-if="loading"
          class="alert alert-info text-center d-flex justify-content-center align-items-center"
        >
          <div class="spinner-border me-2" role="status"></div>
          Cargando noticias...
        </div>

        <div v-else-if="filteredNews.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col" v-for="(n, index) in filteredNews" :key="index">
            <div class="card shadow border-0 rounded-4 h-100 news-card">
              <div class="card-body p-4">
                <div v-if="n.image_url" class="mb-3">
                  <img
                    :src="n.image_url"
                    alt="Imagen de la noticia"
                    class="img-fluid rounded-3 shadow-sm"
                    style="max-height: 200px; width: 100%; object-fit: cover"
                  />
                </div>

                <h5 class="card-title fw-bold d-flex align-items-center mb-3">
                  {{ n.title }}
                  <i
                    class="bi bi-info-circle ms-2 text-primary"
                    data-bs-toggle="tooltip"
                    :title="`Haz clic para ver la noticia completa de ${n.title}`"
                  ></i>
                </h5>
                <p class="card-text mb-4">{{ n.body.substring(0, 150) }}...</p>

                <div class="d-flex justify-content-start align-items-center mt-3">
                  <a :href="'/news/' + n.slug" class="btn btn-sm btn-outline-light fw-semibold">
                    Leer más
                  </a>
                  <button
                    class="btn btn-outline-light btn-sm"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modalNoticia' + n.id"
                  >
                    Vista previa
                  </button>
                </div>
              </div>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              :id="'modalNoticia' + n.id"
              tabindex="-1"
              aria-labelledby="modalTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content modal-content-custom">
                  <div class="modal-header border-secondary">
                    <h5 class="modal-title" id="modalTitle">{{ n.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div class="modal-body">
                    <p>{{ n.body }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Fin modal -->
          </div>
        </div>

        <div v-else class="alert alert-warning text-center mt-4">
          ⚠️ No hay noticias disponibles.
        </div>
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

onMounted(() => {
  loading.value = true
  error.value = ''

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
    (n) =>
      n.title.toLowerCase().includes(query) ||
      n.user?.name?.toLowerCase().includes(query),
  )

  return filtered.sort((a, b) => {
    return sortOrder.value === 'asc' ? a.id - b.id : b.id - a.id
  })
})
</script>

<style scoped>
:root {
  --bg-main: #ffffff;
  --bg-card: #ffffff;
  --text-main: #212529;
  --border-color: #ced4da;
}

body.dark-mode {
  --bg-main: #121212;
  --bg-card: #1f1f1f;
  --text-main: #f1f1f1;
  --border-color: #444;
}

#layoutSidenav_content {
  background-color: var(--bg-main);
  color: var(--text-main);
}

.news-card {
  background-color: var(--bg-card);
  color: var(--text-main);
  border-radius: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 12px;
}

input.form-control,
select.form-select,
.input-group-text {
  background-color: var(--bg-card) !important;
  border-radius: 12px;
  color: var(--text-main);
  border-color: var(--border-color);
}

.btn-outline-light {
  border-radius: 12px;
  border-color: var(--text-main);
  color: var(--text-main);
  background-color: transparent;
  transition: all 0.2s ease-in-out;
}

.btn-outline-light:hover {
  background-color: var(--text-main) !important;
  color: var(--bg-main) !important;
}

.card-body .d-flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: auto;
  gap: 1rem;
}

.card-body .d-flex .btn-sm:last-child {
  margin-left: auto;
}

.card-title i {
  vertical-align: middle;
  margin-left: 0.5rem;
}

.modal-content-custom {
  background-color: #fff !important;
  color: #212529 !important;
  border-radius: 1rem;
}

body.dark-mode .modal-content-custom {
  background-color: #1f1f1f !important;
  color: #f1f1f1 !important;
}

.spinner-border {
  width: 2rem;
  height: 2rem;
  border-color: var(--text-main);
  border-right-color: transparent;
}
</style>
