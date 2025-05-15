<template>
  <header>
    <nav
      class="navbar navbar-expand-lg shadow-sm py-3 px-4 rounded-bottom-4 border-bottom border-secondary"
      style="background-color: #f8f9fa"
    >
      <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-2">
        <img src="/DaleFormula.png" alt="Logo" style="height: 60px; width: auto" />
        <span class="fw-bold fs-4 text-dark d-none d-md-inline">DaleFormula</span>
      </RouterLink>

      <button
        class="navbar-toggler border-0"
        type="button"
        @click="toggleNavbar"
        aria-controls="navbarContent"
        :aria-expanded="isNavCollapsed ? 'true' : 'false'"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        ref="navbarContent"
        class="collapse navbar-collapse justify-content-end"
        id="navbarContent"
      >
        <ul class="navbar-nav d-flex align-items-center gap-3">
          <li class="nav-item">
            <RouterLink
              to="/"
              class="btn btn-outline-dark btn-sm"
              title="Inicio"
              data-bs-toggle="tooltip"
              @click="closeNavbar"
            >
              <i class="bi bi-house-door"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/News"
              class="btn btn-outline-dark btn-sm"
              data-bs-toggle="tooltip"
              title="Noticias"
              @click="closeNavbar"
            >
              <i class="bi bi-newspaper"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/Ranking"
              class="btn btn-outline-dark btn-sm"
              data-bs-toggle="tooltip"
              title="Clasificación"
              @click="closeNavbar"
            >
              <i class="bi bi-bar-chart-line"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/Calendario"
              class="btn btn-outline-dark btn-sm"
              data-bs-toggle="tooltip"
              title="Calendario"
              @click="closeNavbar"
            >
              <i class="bi bi-calendar-event"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <button
              @click="handleLogout"
              class="btn btn-outline-secondary btn-sm"
              data-bs-toggle="tooltip"
              title="Cerrar sesión"
            >
              <i class="bi bi-box-arrow-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import * as bootstrap from 'bootstrap'

const auth = useAuthStore()
const router = useRouter()

const navbarContent = ref(null)
let bsCollapse = null
const isNavCollapsed = ref(false)

function handleLogout() {
  auth.logout()
  router.push({ name: 'Login' })
}

function toggleNavbar() {
  if (bsCollapse) {
    bsCollapse.toggle()
    isNavCollapsed.value = !isNavCollapsed.value
  }
}

function closeNavbar() {
  // Solo cierra si está abierto y es móvil
  if (window.innerWidth < 992 && bsCollapse && isNavCollapsed.value) {
    bsCollapse.hide()
    isNavCollapsed.value = false
  }
}

onMounted(() => {
  bsCollapse = new bootstrap.Collapse(navbarContent.value, { toggle: false })

  // Tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl, {
      trigger: 'hover',
    })
  })
})
</script>

<style scoped>
.btn {
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
}
</style>
