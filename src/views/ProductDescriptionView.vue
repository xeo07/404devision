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
    <h2>Описание</h2>
    <p class="section-text">{{ good.description }}</p>
  </div>
</template>
