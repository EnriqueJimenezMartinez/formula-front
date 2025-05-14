<template>
  <footer class="py-4 bg-light mt-auto border-top shadow-sm">
    <div class="container-fluid px-4">
      <div class="d-flex flex-column flex-md-row align-items-center justify-content-between small gap-2">
        <div class="text-muted text-center text-md-start">
          &copy; {{ currentYear }} Sistema de Blog de <strong>EnriqueJimenezMartinez</strong>
        </div>
        <div class="d-flex align-items-center gap-3 justify-content-center">
          <a href="#" class="text-decoration-none text-muted link-hover">Política de Privacidad</a>
          <span class="text-muted">|</span>
          <a href="#" class="text-decoration-none text-muted link-hover">Términos y Condiciones</a>
          <a
            class="btn btn-sm btn-dark d-flex align-items-center gap-1"
            href="https://github.com/EnriqueJimenezMartinez"
            target="_blank"
          >
            <i class="bi bi-github"></i> GitHub
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.link-hover:hover {
  color: #0d6efd;
  text-decoration: underline;
  transition: all 0.2s ease-in-out;
}

footer {
  font-size: 0.9rem;
}

.btn-dark:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
  transition: all 0.2s ease-in-out;
}
</style>


