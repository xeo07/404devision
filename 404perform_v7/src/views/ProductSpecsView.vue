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
    <h2>Характеристики</h2>
    <ul class="list-clean specs-list">
      <li><strong>Бренд:</strong> {{ good.specs.brand }}</li>
      <li><strong>Тип:</strong> {{ good.specs.type }}</li>
      <li><strong>Совместимость:</strong> {{ good.specs.compatibility }}</li>
      <li><strong>Результат:</strong> {{ good.specs.result }}</li>
    </ul>
  </div>
</template>

<style scoped>
.specs-list {
  display: grid;
  gap: 12px;
  color: var(--text-soft);
}
</style>
