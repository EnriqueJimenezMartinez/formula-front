<template>
  <header>
    <nav
      class="navbar navbar-expand-lg shadow-sm py-3 px-4 rounded-bottom-4 border-bottom border-secondary"
      style="background-color: #f8f9fa"
    >
      <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-2">
        <img :src="logoSrc" alt="Logo" style="height: 60px; width: auto" />
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
              @click="toggleDarkMode"
              class="btn btn-outline-dark btn-sm"
              data-bs-toggle="tooltip"
              :title="isDarkMode ? 'Modo claro' : 'Modo oscuro'"
            >
              <i :class="isDarkMode ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill'"></i>
            </button>
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
import { onMounted, ref, computed } from 'vue'
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
  if (window.innerWidth < 992 && bsCollapse && isNavCollapsed.value) {
    bsCollapse.hide()
    isNavCollapsed.value = false
  }
}

const isDarkMode = ref(false)

function applyTheme() {
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  document.documentElement.style.backgroundColor = isDarkMode.value ? '#121212' : '#ffffff'
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
  applyTheme()
}

const logoSrc = computed(() =>
  isDarkMode.value ? '/DaleFormula-dark.png' : '/DaleFormula.png'
)

onMounted(() => {
  bsCollapse = new bootstrap.Collapse(navbarContent.value, { toggle: false })

  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    isDarkMode.value = savedMode === 'true'
    applyTheme()
  }

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el, { trigger: 'hover' }))
})
</script>

<style scoped>
.btn {
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
}
</style>
