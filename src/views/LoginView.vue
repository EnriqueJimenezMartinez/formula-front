<template>
  <form @submit.prevent="onSubmit">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Contraseña" required />
    <button :disabled="loading">Entrar</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
  <button ></button>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const auth = useAuthStore()
const router = useRouter()

async function onSubmit() {
  loading.value = true
  error.value = ''
  auth
    .login(email.value, password.value)
    .then(() => {
      router.push({ name: 'Home' })
    })
    .catch((e) => {
      error.value =
        e.response?.status === 401 ? 'Usuario o contraseña incorrectos' : 'Error de conexión'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
