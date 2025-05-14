<template>
  <div class="card shadow-sm my-3 border-0 rounded-4">
    <div class="card-body">
      <h5 class="card-title text-danger fw-bold">
        🏎️ {{ race.raceName }}
      </h5>
      <h6 class="card-subtitle mb-2 text-muted">
        <i class="bi bi-geo-alt-fill me-1"></i>
        {{ race.Circuit.circuitName }} - {{ race.date }}
      </h6>
      <p class="card-text text-secondary">
        <i class="bi bi-flag-fill me-1"></i>
        {{ race.Circuit.Location.locality }}, {{ race.Circuit.Location.country }}
      </p>
      <router-link
        :to="`/clasificacion-carrera/${race.round}`"
        class="btn btn-outline-dark btn-sm mt-2 rounded-pill"
      >
        <i class="bi bi-bar-chart-fill me-1"></i> Ver Resultados
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarreraF1',
  props: {
    race: {
      type: Object,
      required: true
    }
  }
}
</script>
