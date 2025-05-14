<template>
  <header>
    <nav
      class="navbar navbar-expand-lg shadow-sm py-3 px-4 rounded-bottom-4 border-bottom border-secondary"
      style="background-color: #f8f9fa"
    >
      <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-2">
        <img
          src="/DaleFormula.png"
          alt="Logo"
          style="height: 60px; width: auto"
        />
        <span class="fw-bold fs-4 text-dark d-none d-md-inline">DaleFormula</span>
      </RouterLink>

      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
        <ul class="navbar-nav d-flex align-items-center gap-3">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link nav-link-hover text-dark fw-semibold">
              <i class="bi bi-house-door me-1"></i>Inicio
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/News" class="nav-link nav-link-hover text-dark fw-semibold">
              <i class="bi bi-newspaper me-1"></i>Noticias
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/Ranking" class="nav-link nav-link-hover text-dark fw-semibold">
              <i class="bi bi-bar-chart-line me-1"></i>Clasificación
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/Calendario" class="nav-link nav-link-hover text-dark fw-semibold">
              <i class="bi bi-calendar-event me-1"></i>Calendario
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/Login"
              class="btn btn-outline-secondary btn-sm fw-semibold"
              title="Cerrar sesión"
            >
              <i class="bi bi-box-arrow-right me-1"></i>Cerrar Sesión
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar-brand span {
  transition: color 0.2s;
}


.nav-link-hover {
  transition: all 0.2s ease-in-out;
}

.nav-link-hover:hover {
  text-decoration: underline;
}

.btn-outline-secondary {
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
}


</style>
