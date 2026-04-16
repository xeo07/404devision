<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGoods } from '../composables/useGoods'

const route = useRoute()
const { getGoodById } = useGoods()
const good = computed(() => getGoodById(route.params.id))
</script>

<template>
  <div v-if="good">
    <h2>Отзывы</h2>
    <ul class="list-clean reviews-list">
      <li v-for="(review, index) in good.reviews" :key="index" class="card review-item">{{ review }}</li>
    </ul>
  </div>
</template>

<style scoped>
.reviews-list {
  display: grid;
  gap: 12px;
}

.review-item {
  padding: 14px;
  color: var(--text-soft);
}
</style>
