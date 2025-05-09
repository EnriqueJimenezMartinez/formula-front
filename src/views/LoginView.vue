<template>
  <section class="gradient-custom py-5">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">
              <form @submit.prevent="onSubmit" class="mb-md-5 mt-md-4 pb-3">

                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>

                <div class="form-outline form-white mb-4">
                  <input v-model="email" type="email" id="typeEmailX" class="form-control form-control-lg" required />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg" required />
                  <label class="form-label" for="typePasswordX">Contraseña</label>
                </div>

                <p class="small mb-3 text-danger" v-if="error">{{ error }}</p>

                <button class="btn btn-outline-light btn-lg px-5" :disabled="loading" type="submit">
                  {{ loading ? 'Entrando...' : 'Entrar' }}
                </button>

                <div class="d-flex justify-content-center text-center mt-4 pt-1">
                  <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                  <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                  <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const auth = useAuthStore()

async function onSubmit() {
  loading.value = true
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    router.push({ name: 'Home' })
  } catch (e) {
    error.value =
      e.response?.status === 401
        ? 'Usuario o contraseña incorrectos'
        : 'Error de conexión'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.gradient-custom {
  background: #6a11cb;
  background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
}
</style>

