<template>
  <div id="layoutSidenav_content" class="my-5 mx-5 rounded-4" style="min-height: 100vh">
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

        <div v-else-if="filteredNews.length">
          <draggable
            v-model="sortedNews"
            item-key="id"
            class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
          >
            <template #item="{ element: n }">
              <div v-if="matchesFilter(n)" class="col">
                <div class="card shadow border-0 rounded-4 h-100 news-card">
                  <img
                    v-if="n.image_url"
                    :src="n.image_url"
                    alt="Imagen de la noticia"
                    class="news-img"
                  />
                  <div class="card-body">
                    <header>
                      <h5 class="card-title fw-bold d-flex align-items-center mb-3">
                        {{ n.title }}
                        <i
                          class="bi bi-info-circle ms-2 text-primary"
                          data-bs-toggle="tooltip"
                          :title="`Haz clic para ver la noticia completa de ${n.title}`"
                        ></i>
                      </h5>
                    </header>
                    <section>
                      <p class="card-text">{{ n.body.substring(0, 150) }}...</p>
                    </section>
                    <footer class="d-flex">
                      <a :href="'/news/' + n.slug" class="btn btn-sm btn-outline-light fw-semibold">
                        Leer más
                      </a>
                      <button
                        class="btn btn-outline-light btn-sm ms-2"
                        data-bs-toggle="modal"
                        :data-bs-target="'#modalNoticia' + n.id"
                      >
                        Vista previa
                      </button>
                    </footer>
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
              </div>
            </template>
          </draggable>
        </div>

        <div v-else class="alert alert-warning text-center mt-4">
          ⚠️ No hay noticias disponibles.
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useNewsStore } from '@/stores/news'
import draggable from 'vuedraggable'

const newsStore = useNewsStore()
const loading = ref(false)
const newsList = ref([])
const searchQuery = ref('')
const sortOrder = ref('desc')
const sortedNews = ref([])

onMounted(() => {
  loading.value = true
  newsStore
    .viewAllNews()
    .then((res) => {
      newsList.value = res
      sortedNews.value = [...res]
      sortSortedNews()
    })
    .catch((e) => {
      console.error(e)
    })
    .finally(() => {
      loading.value = false
    })
})

// Ordenar
function sortSortedNews() {
  sortedNews.value.sort((a, b) => (sortOrder.value === 'asc' ? a.id - b.id : b.id - a.id))
}

// Actualizar orden cuando cambia el selector
watch(sortOrder, () => {
  sortSortedNews()
})

const filteredNews = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return sortedNews.value.filter(
    n =>
      n.title.toLowerCase().includes(query) ||
      n.user?.name?.toLowerCase().includes(query)
  )
})

function matchesFilter(n) {
  const query = searchQuery.value.trim().toLowerCase()
  if (query === '') return true
  return (
    n.title.toLowerCase().includes(query) ||
    n.user?.name?.toLowerCase().includes(query)
  )
}
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
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: var(--bg-card);
  color: var(--text-main);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.15);
}

.news-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid var(--border-color);
}

.card-body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 1.5rem;
  gap: 1rem;
}

.card-title i {
  margin-left: 0.5rem;
  vertical-align: middle;
}

.card-body .d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
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

.drag-ghost {
  opacity: 0.3;
}

.drag-chosen {
  box-shadow: 0 0 0 3px #0d6efd55;
  transform: rotate(1deg);
}
.news-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.news-card {
  background-color: #f8f9fa;
  transition: transform 0.2s;
}

.news-card:hover {
  transform: translateY(-5px);
}
</style>
