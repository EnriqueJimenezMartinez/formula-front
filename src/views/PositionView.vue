<template>
  <div class="container my-4">
    <h2 class="mb-4 text-center fw-bold">
      🏁 Clasificación de Pilotos - Temporada 2025
    </h2>
    <div v-if="standings.length">
      <h4 class="text-center mb-4 fw-semibold text-danger">
        Clasificación General
      </h4>

      <!-- Quitamos overflow-hidden y dejamos solo table-responsive -->
      <div class="table-responsive rounded-4 shadow-sm border">
        <table class="table table-hover align-middle mb-0">
          <thead class="text-center table-header">
            <tr>
              <th><i class="bi bi-hash"></i> Posición</th>
              <th><i class="bi bi-person-fill"></i> Piloto</th>
              <th><i class="bi bi-gear-fill"></i> Equipo</th>
              <th><i class="bi bi-cup-straw"></i> Puntos</th>
              <th><i class="bi bi-trophy"></i> Victorias</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="driver in standings" :key="driver.Driver.driverId">
              <td>{{ driver.position }}</td>
              <td>
                <a :href="driver.Driver.url" class="text-decoration-none" target="_blank">
                  {{ driver.Driver.givenName }} {{ driver.Driver.familyName }}
                </a>
              </td>
              <td>{{ driver.Constructors[0].name }}</td>
              <td>{{ driver.points }}</td>
              <td>{{ driver.wins }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <div class="spinner-border" role="status"></div>
      <p class="mt-3 text-muted">Cargando clasificación...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'DriverStandings',
  setup() {
    const standings = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('https://api.jolpi.ca/ergast/f1/current/driverstandings.json');
        const data = await response.json();
        standings.value = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      } catch (error) {
        console.error('Error al obtener los datos de la clasificación:', error);
      }
    });

    return {
      standings,
    };
  },
};
</script>

<style scoped>
body.dark-mode {
  --bg-main: #121212;
  --text-main: #e0e0e0;
  --header-bg: #2d2d2d;
  --header-text: #ffffff;
  --row-hover: #2a2a2a;
  --table-border: #444;
  --link-color: #9ecbff;
}
.table td,
.table th {
  background-color: var(--bg-main) !important;
  color: var(--text-main) !important;
  border-color: var(--table-border) !important;
}

.table-hover tbody tr:hover {
  background-color: var(--row-hover) !important;
}

.border {
  border-color: var(--table-border) !important;
}

.spinner-border {
  border-color: var(--text-main);
  border-right-color: transparent;
}

.table-responsive {
  overflow-x: auto;
}

.table-responsive table {
  min-width: 600px; 
}
</style>
