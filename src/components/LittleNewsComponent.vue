<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body">
      <h5 class="card-title text-primary">
        <router-link :to="'/news/' + news.slug">{{ news.title }}</router-link>
      </h5>
      <p class="card-text">{{ news.body }}</p>
    </div>

    <div class="card-footer">
      <div class="d-flex justify-content-between align-items-center small text-muted">
        <span>Publicado por: {{ news.user.name }}</span>
        <span>{{news.created}}</span>
      </div>
      <div class="mt-2">
        <span
          v-for="(tag, index) in news.tags"
          :key="index"
          class="badge me-1"
          :class="tagClass(tag.name)"
        >
          {{ tag.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  news: {
    type: Object,
    required: true
  }
})

const tagClass = (tag) => {
  const tagMap = {
    tag1: 'bg-secondary',
    tag2: 'bg-primary',
    tag3: 'bg-success',
    tag4: 'bg-info',
    tag5: 'bg-warning text-dark',
    tag6: 'bg-danger',
  }
  return tagMap[tag] || 'bg-light text-dark'
}
</script>

