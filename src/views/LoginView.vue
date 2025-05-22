<template>
  <section class="bg-white py-5">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-light text-dark" style="border-radius: 1rem; border: 1px solid #ddd;">
            <div class="card-body p-5 text-center">
              <form @submit.prevent="onSubmit" class="mb-md-5 mt-md-4 pb-3">

                <h2 class="fw-bold mb-4 text-uppercase">Inicio de Sesión</h2>
                <div class="form-outline mb-4">
                  <input
                    v-model="email"
                    type="email"
                    id="typeEmailX"
                    class="form-control form-control-lg"
                    required
                    style="background-color: #fff; color: #000; border: 1px solid #ccc;"
                  />
                  <label class="form-label text-secondary" for="typeEmailX">Email</label>
                </div>
                <div class="form-outline mb-4 position-relative">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    id="typePasswordX"
                    class="form-control form-control-lg pe-5"
                    required
                    style="background-color: #fff; color: #000; border: 1px solid #ccc; height: 58px;"
                  />
                  <label class="form-label text-secondary" for="typePasswordX">Contraseña</label>

                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    :title="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                    style="
                      position: absolute;
                      top: 50%;
                      right: 18px;
                      transform: translateY(-110%);
                      background: none;
                      border: none;
                      color: #666;
                      cursor: pointer;
                      line-height: 1;
                    "
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" style="font-size: 1.25rem;"></i>
                  </button>
                </div>
                <p class="small mb-3 text-danger" v-if="error">{{ error }}</p>
                <button
                  class="btn btn-outline-dark btn-lg px-5 custom-btn"
                  :disabled="loading"
                  type="submit"
                >
                  {{ loading ? 'Entrando...' : 'Entrar' }}
                </button>

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
const showPassword = ref(false)
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
</style>
