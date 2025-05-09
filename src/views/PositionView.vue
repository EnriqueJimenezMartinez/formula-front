<template>
  <div class="container my-4">
    <h2 class="text-center mb-4 text-primary">Clasificación de Pilotos - Temporada 2025</h2>
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th scope="col">Posición</th>
            <th scope="col">Piloto</th>
            <th scope="col">Equipo</th>
            <th scope="col">Puntos</th>
            <th scope="col">Victorias</th>
          </tr>
        </thead>
        <tbody>
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

