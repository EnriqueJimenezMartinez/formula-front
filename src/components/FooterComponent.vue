<template>
  <footer class="py-4 bg-light mt-auto">
    <div class="container-fluid px-4">
      <div class="d-flex align-items-center justify-content-between small">
        <div class="text-muted">
          Copyright &copy; Sistema de Blog de EnriqueJimenezMartinez {{ currentYear }}
        </div>
        <div>
          <a href="#">Privacy Policy</a>
          &middot;
          <a href="#">Terms &amp; Conditions</a>
          &middot;
          <a
            class="btn btn-sm btn-dark ms-2"
            href="https://github.com/EnriqueJimenezMartinez"
            target="_blank"
          >
            <i class="bi bi-github me-1"></i>
            Mi GitHub
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

