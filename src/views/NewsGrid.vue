<template>
  <div v-if="newsList.length">
    <LittleNews v-for="(n, index) in newsList" :key="index" :news="n" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'
import LittleNews from '@/components/LittleNewsComponent.vue'

const newsStore = useNewsStore()
const loading = ref(false)
const error = ref('')
let newsList = ref([])

onMounted(() => {
  console.log('Mounted')
  loading.value = true
  error.value = ''

  newsStore
    .viewAllNews()
    .then((res) => {
      console.log('Response from viewAllNews:', res) // Asegúrate de que se imprima la respuesta
      newsList.value = res // Asignamos la respuesta a newsList
    })
    .catch((e) => {
      error.value =
        e.response?.status === 401 ? 'Usuario o contraseña incorrectos' : 'Error de conexión'
      console.error(error.value)
    })
    .finally(() => {
      loading.value = false
    })
})
</script>
