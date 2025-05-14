<template>
  <div class="container my-4">
    <h2 class="mb-4 text-center text-dark fw-bold">🏁 Resultados del Gran Premio</h2>

    <div v-if="results.length">
      <h4 class="text-center mb-4 text-danger fw-semibold">
        {{ raceName }}
      </h4>

      <div class="table-responsive rounded-4 shadow-sm overflow-hidden border">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-secondary text-center">
            <tr>
              <th><i class="bi bi-hash"></i> Posición</th>
              <th><i class="bi bi-person-fill"></i> Piloto</th>
              <th><i class="bi bi-gear-fill"></i> Equipo</th>
              <th><i class="bi bi-speedometer2"></i> Vueltas</th>
              <th><i class="bi bi-clock-fill"></i> Tiempo</th>
              <th><i class="bi bi-flag-fill"></i> Estado</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="result in results" :key="result.Driver.driverId">
              <td>{{ result.position }}</td>
              <td>{{ result.Driver.givenName }} {{ result.Driver.familyName }}</td>
              <td>{{ result.Constructor.name }}</td>
              <td>{{ result.laps }}</td>
              <td>{{ result.Time?.time || 'N/A' }}</td>
              <td>
                <span :class="getStatusClass(result.status)">
                  {{ result.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <div class="spinner-border text-secondary" role="status"></div>
      <p class="mt-3 text-muted">Cargando resultados...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ClasificacionCarrera',
  setup() {
    const route = useRoute()
    const results = ref([])
    const raceName = ref('')

    onMounted(async () => {
      try {
        const round = route.params.round
        const response = await fetch(`https://ergast.com/api/f1/current/${round}/results.json`)
        const data = await response.json()
        const race = data.MRData.RaceTable.Races[0]

        if (race) {
          results.value = race.Results
          raceName.value = race.raceName
        } else {
          raceName.value = 'Carrera no encontrada'
        }
      } catch (error) {
        console.error('Error cargando clasificación de la carrera:', error)
      }
    })

    const getStatusClass = (status) => {
      if (status === 'Finished') return 'text-success fw-bold'
      if (status.includes('+')) return 'text-warning'
      return 'text-danger fw-semibold'
    }

    return {
      results,
      raceName,
      getStatusClass,
    }
  },
}
</script>
