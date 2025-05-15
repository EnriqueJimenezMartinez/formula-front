<template>
  <div class="container-fluid px-4 mt-4">
    <div class="bg-white text-dark p-5 rounded-3 shadow-sm text-center">
      <h1 class="display-4 mb-3 fw-bold">
        ¡Bienvenido a DaleFormula!
        <i class="bi bi-flag-checkered ms-2" data-bs-toggle="tooltip" title="Inicio del sitio"></i>
      </h1>

      <p class="lead mb-3">
        El blog donde la velocidad, la estrategia y la emoción de la Fórmula 1 se encuentran.
      </p>

      <hr class="my-4 border-light" />

      <p class="fs-5">
        Consulta <span class="text-muted">clasificaciones</span>,
        <span class="text-muted">noticias</span>, <span class="text-muted">pilotos</span> y mucho
        más sobre la temporada <strong>2025</strong>.
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

<script setup></script>

<style scoped>
.btn {
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}
</style>
