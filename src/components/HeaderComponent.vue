<template>
  <header>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand ps-3" href="#">Mi Blog</a>
      <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
        <i class="fas fa-bars"></i>
      </button>
      <div class="ms-auto me-3 d-flex gap-3 align-items-center">
        <RouterLink to="/" class="text-white text-decoration-none">Home</RouterLink>
        <RouterLink to="/News" class="text-white text-decoration-none">News</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* Si necesitas ajustar algo aquí visualmente */
</style>

