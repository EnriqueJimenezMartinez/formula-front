<template>
  <div
    class="container my-5 p-4 rounded-4 shadow-sm"
    style="min-height: 100vh; background-color: var(--bg-main); color: var(--text-main)"
  >
    <h2 class="text-center mb-4 fw-bold display-6 text-muted">
      🏁 Calendario F1 - Temporada 2025
    </h2>

    <div class="row mb-4">
      <div class="col-md-6 mx-auto">
        <input
          type="text"
          v-model="search"
          class="form-control shadow-sm border-secondary"
          placeholder="🔎 Buscar Gran Premio..."
        />
      </div>
    </div>

    <div v-if="paginatedRaces.length">
      <CarreraF1
        v-for="race in paginatedRaces"
        :key="race.round"
        :race="race"
        class="mb-4"
      />
    </div>

    <div v-else class="alert alert-warning text-center mt-4">
      ⚠️ No se encontraron carreras.
    </div>

    <nav v-if="totalPages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link border-secondary"
            @click="currentPage--"
            :disabled="currentPage === 1"
          >
            <i class="bi bi-chevron-left"></i> Anterior
          </button>
        </li>
        <li class="page-item disabled">
          <span class="page-link fw-semibold border-secondary">
            Página {{ currentPage }} de {{ totalPages }}
          </span>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link border-secondary"
            @click="currentPage++"
            :disabled="currentPage === totalPages"
          >
            Siguiente <i class="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import CarreraF1 from '@/components/Race.vue'

export default {
  name: 'CalendarioF1',
  components: {
    CarreraF1
  },
  setup() {
    const races = ref([])
    const currentPage = ref(1)
    const itemsPerPage = 5
    const search = ref('')

    const filteredRaces = computed(() =>
      races.value.filter((r) =>
        r.raceName.toLowerCase().includes(search.value.toLowerCase())
      )
    )

    const totalPages = computed(() =>
      Math.ceil(filteredRaces.value.length / itemsPerPage)
    )

    const paginatedRaces = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      return filteredRaces.value.slice(start, start + itemsPerPage)
    })

    watch(search, () => {
      currentPage.value = 1
    })

    // ✅ Usando la API de apijolca
    onMounted(async () => {
      try {
        const response = await fetch('https://api.jolpi.ca/ergast/f1/current.json')
        const data = await response.json()
        races.value = data.MRData.RaceTable.Races
      } catch (error) {
        console.error('Error cargando el calendario:', error)
      }
    })

    return {
      races,
      search,
      currentPage,
      totalPages,
      paginatedRaces
    }
  }
}
</script>

<style scoped>
:root {
  --bg-main: #ffffff;
  --text-main: #212529;
  --input-bg: #ffffff;
  --border-color: #6c757d;
  --page-hover: #343a40;
  --page-disabled-bg: #e9ecef;
  --page-disabled-text: #6c757d;
}

body.dark-mode {
  --bg-main: #121212;
  --text-main: #f1f1f1;
  --input-bg: #1f1f1f;
  --border-color: #444;
  --page-hover: #495057;
  --page-disabled-bg: #2c2c2c;
  --page-disabled-text: #999;
}

.form-control {
  background-color: var(--input-bg);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.form-control:focus {
  border-color: var(--text-main);
  box-shadow: 0 0 10px rgba(33, 37, 41, 0.4);
  outline: none;
}

.pagination .page-link {
  background-color: var(--input-bg);
  color: var(--text-main);
  border-radius: 12px;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;
}

.pagination .page-link:hover {
  background-color: var(--page-hover);
  color: #ffffff;
}

.page-item.disabled .page-link {
  background-color: var(--page-disabled-bg);
  color: var(--page-disabled-text);
  border-color: var(--border-color);
}
</style>
