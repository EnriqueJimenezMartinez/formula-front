<template>
  <div
    class="container my-5 p-4 rounded-4 shadow-sm"
    style="background-color: #ffffff; min-height: 100vh"
  >
    <h2 class="text-center text-muted mb-4 fw-bold display-6">
      🏁 Calendario F1 - Temporada 2025
    </h2>

    <div class="row mb-4">
      <div class="col-md-6 mx-auto">
        <input
          type="text"
          v-model="search"
          class="form-control shadow-sm bg-white text-dark border-secondary"
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
            class="page-link bg-light text-dark border-secondary"
            @click="currentPage--"
            :disabled="currentPage === 1"
          >
            <i class="bi bi-chevron-left"></i> Anterior
          </button>
        </li>
        <li class="page-item disabled">
          <span class="page-link bg-white text-dark fw-semibold border-secondary">
            Página {{ currentPage }} de {{ totalPages }}
          </span>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link bg-light text-dark border-secondary"
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

    onMounted(async () => {
      try {
        const response = await fetch('https://ergast.com/api/f1/current.json')
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
.form-control {
  background-color: #ffffff;
  color: #000;
  border: 1px solid #6c757d;
  border-radius: 12px;
}

.form-control:focus {
  border-color: #212529;
  box-shadow: 0 0 10px rgba(33, 37, 41, 0.4);
  outline: none;
}

.pagination .page-link {
  border-radius: 12px;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;
}

.pagination .page-link:hover {
  background-color: #343a40;
  color: #ffffff;
}

.page-item.disabled .page-link {
  background-color: #e9ecef;
  color: #6c757d;
  border-color: #ced4da;
}
</style>
