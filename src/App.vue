<script setup>
import { ref, watch, onMounted } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const STORAGE_KEY = 'darkModePreference'
const isDarkMode = ref(false)

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved !== null) {
    isDarkMode.value = saved === 'true'
  } else {
    isDarkMode.value = false
  }
})

watch(isDarkMode, (val) => {
  if (val) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
  localStorage.setItem(STORAGE_KEY, val.toString())
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

body.dark-mode .btn-outline-dark {
  border-color: #ccc !important;
  color: #ccc !important;
}

body.dark-mode .btn-outline-dark:hover {
  background-color: #333 !important;
  color: #fff !important;
}

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

body.dark-mode .bg-white,
body.dark-mode .bg-light {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

body.dark-mode .text-dark,
body.dark-mode .text-muted {
  color: #e0e0e0 !important;
}

body.dark-mode .btn-outline-dark {
  color: #e0e0e0 !important;
  border-color: #888 !important;
}

body.dark-mode .btn-outline-dark:hover {
  background-color: #333 !important;
  color: #fff !important;
}

body.dark-mode footer {
  background-color: #1a1a1a !important;
  color: #e0e0e0 !important;
  border-color: #333 !important;
}

body.dark-mode hr {
  border-color: #444 !important;
}

body.dark-mode .table {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

body.dark-mode .table-hover tbody tr:hover {
  background-color: #2a2a2a;
}

body.dark-mode .table-secondary {
  background-color: #333 !important;
  color: #fff !important;
}

body.dark-mode a {
  color: #9ecbff;
}

body.dark-mode .border {
  border-color: #444 !important;
}

body.dark-mode .spinner-border {
  border-color: #aaa;
  border-right-color: transparent;
}
</style>
