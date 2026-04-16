<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCart } from '../composables/useCart'

const props = defineProps({
  good: Object,
  showAdminButton: Boolean
})

const { addToCart } = useCart()
const addedText = ref('')

function addCurrentGood() {
  addToCart(props.good.id)
  addedText.value = 'Услуга добавлена в корзину.'

  setTimeout(() => {
    addedText.value = ''
  }, 1200)
}
</script>

<template>
  <article class="good-card card">
    <img :src="props.good.image" :alt="props.good.title" class="good-card__image">
    <div class="good-card__body">
      <div class="good-card__top">
        <div class="good-card__category">{{ props.good.category }}</div>
        <div class="good-card__price">{{ props.good.price }} ₽</div>
      </div>
      <h3 class="good-card__title">{{ props.good.title }}</h3>
      <p class="good-card__text">{{ props.good.shortDescription }}</p>
      <div class="good-card__actions">
        <RouterLink :to="`/goods/${props.good.id}`" class="button-main button-link">Открыть</RouterLink>
        <button class="button-second" @click="addCurrentGood">В корзину</button>
        <RouterLink v-if="props.showAdminButton" :to="`/admin/edit/${props.good.id}`" class="button-second button-link">Редактировать</RouterLink>
      </div>
      <div class="good-card__message">{{ addedText }}</div>
    </div>
  </article>
</template>

<style scoped>
.good-card {
  overflow: hidden;
  display: grid;
}

.good-card__image {
  height: 220px;
  width: 100%;
  object-fit: cover;
  border-bottom: 1px solid var(--border);
}

.good-card__body {
  padding: 18px;
  display: grid;
  gap: 12px;
}

.good-card__top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--text-soft);
}

.good-card__title {
  margin: 0;
}

.good-card__text {
  margin: 0;
  color: var(--text-soft);
  line-height: 1.5;
}

.good-card__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.good-card__message {
  min-height: 18px;
  color: var(--success);
  font-size: 14px;
}
</style>
