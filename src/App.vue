<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
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
  color: #e0e0e0;
}

body.dark-mode .navbar {
  background-color: #1a1a1a !important;
  border-color: #333 !important;
}

body.dark-mode .btn-outline-dark {
  border-color: #ccc;
  color: #ccc;
}

body.dark-mode .btn-outline-dark:hover {
  background-color: #333;
}

body.dark-mode .card {
  background-color: #1e1e1e;
  color: #fff;
}

</style>
