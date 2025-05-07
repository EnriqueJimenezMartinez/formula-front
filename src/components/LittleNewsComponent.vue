<template>
  <div>{{ news.title }}</div>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  news: {
    type: Object,
    required: true,
  },
})
</script>
