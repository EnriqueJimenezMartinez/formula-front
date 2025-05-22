<script setup>
import { ref, watch, onMounted } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const isDarkMode = ref(false)

watch(isDarkMode, (val) => {
  if (val) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
})

onMounted(() => {
  isDarkMode.value = true
})
</script>

<template>
  <HeaderComponent />

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

body.dark-mode,
body.dark-mode * {
  color: #e0e0e0 !important;
}

body.dark-mode .navbar {
  background-color: #1a1a1a !important;
  border-color: #333 !important;
}

/* Botones outline oscuro */
body.dark-mode .btn-outline-dark {
  border-color: #ccc !important;
  color: #ccc !important;
}

body.dark-mode .btn-outline-dark:hover {
  background-color: #333 !important;
  color: #fff !important;
}

/* Tarjetas con fondo y texto claros */
body.dark-mode .card {
  background-color: #1e1e1e !important;
  color: #fff !important;
}

body.dark-mode input.form-control,
body.dark-mode select.form-select,
body.dark-mode textarea.form-control {
  background-color: #2c2c2c !important;
  border: 1px solid #555 !important;
  color: #fff !important;
}

body.dark-mode input::placeholder,
body.dark-mode textarea::placeholder {
  color: #999 !important;
}

body.dark-mode a {
  color: #82aaff !important;
}

body.dark-mode a:hover {
  color: #aabfff !important;
}

.toggle-dark-mode {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
}
</style>
