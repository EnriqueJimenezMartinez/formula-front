<template>
  <div
    id="layoutSidenav_content"
    class="my-5 mx-5 rounded-4"
    style="background-color: #ffffff; min-height: 100vh"
  >
    <main>
      <div class="container-fluid px-4 py-4">
        <h2 class="mb-4 text-center text-muted fw-bold display-6">📰 Últimas Noticias</h2>

        <div class="row mb-4">
          <div class="col-md-6 mb-2 mb-md-0">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control shadow-sm bg-white border-secondary"
              placeholder="🔎 Buscar por título o autor..."
            />
          </div>
          <div class="col-md-6">
            <select
              v-model="sortOrder"
              class="form-select shadow-sm bg-white text-black border-secondary custom-select"
            >
              <option value="desc">🕒 Más recientes</option>
              <option value="asc">📜 Más antiguos</option>
            </select>
          </div>
        </div>

        <div
          v-if="loading"
          class="alert alert-info text-center d-flex justify-content-center align-items-center"
        >
          <div class="spinner-border text-light me-2" role="status"></div>
          Cargando noticias...
        </div>

        <div v-else-if="filteredNews.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col" v-for="(n, index) in filteredNews" :key="index">
            <div class="card shadow border-0 rounded-4 h-100 news-card bg-white text-dark">
              <div class="card-body p-4">
                <!-- Imagen de la noticia (si existe) -->
                <div v-if="n.image_url" class="mb-3">
                  <img
                    :src="n.image_url"
                    alt="Imagen de la noticia"
                    class="img-fluid rounded-3 shadow-sm"
                    style="max-height: 200px; width: 100%; object-fit: cover"
                  />
                </div>

                <h5 class="card-title text-dark fw-bold d-flex align-items-center mb-3">
                  {{ n.title }}
                  <i
                    class="bi bi-info-circle ms-2 text-primary"
                    data-bs-toggle="tooltip"
                    :title="`Haz clic para ver la noticia completa de ${n.title}`"
                  ></i>
                </h5>
                <p class="card-text text-dark mb-4">{{ n.body.substring(0, 150) }}...</p>

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

            <div
              class="modal fade"
              :id="'modalNoticia' + n.id"
              tabindex="-1"
              aria-labelledby="modalTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content bg-white text-dark rounded-4">
                  <div class="modal-header border-secondary">
                    <h5 class="modal-title text-dark" id="modalTitle">{{ n.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div class="modal-body">
                    <p class="text-dark">{{ n.body }}</p>
                  </div>
                </div>
              </div>
            </div>
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
    (n) => n.title.toLowerCase().includes(query) || n.user?.name?.toLowerCase().includes(query),
  )

  return filtered.sort((a, b) => {
    return sortOrder.value === 'asc' ? a.id - b.id : b.id - a.id
  })
})
</script>

<style scoped>
.news-card {
  background-color: #ffffff;
  color: #212529;
  border-radius: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
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
select.form-select {
  background-color: #ffffff;
  border-radius: 12px;
  color: #000;
}

input.form-control:focus,
select.form-select:focus {
  border-color: #212529;
  box-shadow: 0 0 10px rgba(33, 37, 41, 0.4);
}

input.form-control:focus,
select.form-select:focus,
input.form-control {
  color: #000;
}

.btn-outline-light {
  border-radius: 12px;
  border-color: #212529;
  color: #212529;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
}

.btn-outline-light:hover {
  background-color: #343a40 !important;
  color: #ffffff;
  border-color: #212529;
  transition: 0.3s ease-in-out;
}

.card-body .d-flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: auto;
  gap: 1rem; 
}

.card-body .d-flex .btn-sm {
  font-size: 0.8rem;
  margin-left: 0;
}

.card-body .d-flex .btn-outline-light {
  margin-left: 0;
}

.card-body .d-flex .btn-outline-light:first-child {
  margin-right: auto;
}

.card-body .d-flex .btn-sm:last-child {
  margin-left: auto;
}

.card-title {
  margin-bottom: 0.5rem;
}

.card-title i {
  vertical-align: middle;
  margin-left: 0.5rem;
  margin-top: 0;
}

.card-body p {
  margin-bottom: 1.5rem;
}

.card-body .d-flex .btn-sm {
  font-size: 0.8rem;
}

.card-body .d-flex .btn-sm:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.card-title i {
  vertical-align: middle;
}

.modal-content {
  border-radius: 12px;
}

.spinner-border {
  width: 2rem;
  height: 2rem;
}

input.form-control {
  color: #000;
}

h5.card-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.card-body p {
  font-size: 1rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.row-cols-1,
.row-cols-md-2,
.row-cols-lg-3 {
  margin-bottom: 15px;
}
</style>
