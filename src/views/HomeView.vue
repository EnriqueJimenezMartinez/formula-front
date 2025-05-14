<template>
  <div class="container-fluid px-4 mt-4">
    <div class="bg-white text-dark p-5 rounded-3 shadow-sm text-center">
      <h1 class="display-4 mb-3 fw-bold">
        ¡Bienvenido a DaleFormula!
        <i
          class="bi bi-flag-checkered ms-2"
          data-bs-toggle="tooltip"
          title="Inicio del sitio"
        ></i>
      </h1>

      <p class="lead mb-3">
        El blog donde la velocidad, la estrategia y la emoción de la Fórmula 1 se encuentran.
      </p>

      <hr class="my-4 border-light" />

      <p class="fs-5">
        Consulta <span class="text-muted">clasificaciones</span>, <span class="text-muted">noticias</span>, <span class="text-muted">pilotos</span> y mucho más sobre la temporada <strong>2025</strong>.
      </p>

      <div class="mt-4 d-flex justify-content-center gap-3 flex-wrap">
        <router-link to="/calendario" class="btn btn-outline-dark btn-lg">
          <i class="bi bi-calendar-event me-2"></i>Calendario
        </router-link>
        <router-link to="/pilots" class="btn btn-outline-dark btn-lg">
          <i class="bi bi-person-lines-fill me-2"></i>Pilotos
        </router-link>
        <router-link to="/news" class="btn btn-outline-dark btn-lg">
          <i class="bi bi-newspaper me-2"></i>Noticias
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as bootstrap from 'bootstrap'
import { onMounted } from 'vue'

onMounted(() => {
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  tooltips.forEach(el => new bootstrap.Tooltip(el))
})
</script>

<style scoped>
.bg-white {
  background-color: #ffffff;
}

.bg-dark {
  background: linear-gradient(145deg, #f5f5f5, #dcdcdc);
  transition: background 0.3s ease-in-out;
}

.bg-dark:hover {
  background: linear-gradient(145deg, #dcdcdc, #f5f5f5);
}

.text-dark {
  color: #212529;
}

.text-muted {
  color: #6c757d;
}

.btn-outline-dark {
  border-color: #212529;
  color: #212529;
  transition: all 0.2s ease-in-out;
}

.btn-outline-dark:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

hr.border-light {
  border-color: #e0e0e0;
}

.btn {
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}
</style>
