<script setup>
import { ref, watch, onMounted } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const isDarkMode = ref(false)

watch(isDarkMode, (val) => {
  if (val) document.body.classList.add('dark-mode')
  else document.body.classList.remove('dark-mode')
})

onMounted(() => {
  // Si quieres modo oscuro por defecto, cambia a true
  isDarkMode.value = false
})
</script>

<template>
  <HeaderComponent />
  <div class="container mt-3 text-end">
    <button class="btn btn-outline-dark" @click="isDarkMode = !isDarkMode">
      {{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}
    </button>
  </div>
  <RouterView />
  <FooterComponent />
</template>

<style>
html {
  overflow-y: scroll;
}

body.dark-mode {
  background-color: #121212 !important;
  color: #e0e0e0 !important;
}

body.dark-mode .bg-white {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

body.dark-mode .text-dark {
  color: #e0e0e0 !important;
}

body.dark-mode .border {
  border-color: #444 !important;
}

body.dark-mode .btn-outline-dark {
  border-color: #ccc !important;
  color: #ccc !important;
}
body.dark-mode .btn-outline-dark:hover {
  background-color: #333 !important;
  color: #fff !important;
}

body.dark-mode table.table {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}
body.dark-mode thead.table-secondary {
  background-color: #2c2c2c !important;
  color: #e0e0e0 !important;
}

body.dark-mode a.text-decoration-none.text-dark {
  color: #82aaff !important;
}
body.dark-mode a.text-decoration-none.text-dark:hover {
  color: #aabfff !important;
}
</style>
