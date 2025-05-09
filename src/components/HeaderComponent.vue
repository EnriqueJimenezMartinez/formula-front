<template>
  <header>
    <nav class="sb-topnav navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4 rounded-bottom">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img
          src="/DaleFormula.png"
          alt="Logo"
          style="height: 80px; width: auto; display: block;"
        />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
        <ul class="navbar-nav d-flex gap-3 align-items-center">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link text-dark fw-semibold">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/News" class="nav-link text-dark fw-semibold">News</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/Ranking" class="nav-link text-dark fw-semibold">Clasificación</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/Login" class="nav-link text-dark fw-semibold">Cerrar Sesión</RouterLink>
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
.nav-link:hover {
  color: #0d6efd;
  text-decoration: underline;
}
</style>

