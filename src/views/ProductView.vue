<script setup>
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useGoods } from '../composables/useGoods'
import { useUsers } from '../composables/useUsers'
import { useCart } from '../composables/useCart'

const route = useRoute()
const { getGoodById } = useGoods()
const { isAdmin } = useUsers()
const { addToCart } = useCart()

const good = computed(() => getGoodById(route.params.id))
const addedText = ref('')

function addCurrentGood() {
  if (!good.value) {
    return
  }

  addToCart(good.value.id)
  addedText.value = 'Услуга добавлена в корзину.'

  setTimeout(() => {
    addedText.value = ''
  }, 1200)
}
</script>

<template>
  <section v-if="good" class="product-page">
    <div class="product-top card">
      <img :src="good.image" :alt="good.title" class="product-top__image">
      <div class="product-top__body">
        <div class="product-top__category">{{ good.category }}</div>
        <h1 class="section-title">{{ good.title }}</h1>
        <p class="section-text">{{ good.shortDescription }}</p>
        <div class="product-top__meta">
          <div><strong>Цена:</strong> {{ good.price }} ₽</div>
          <div><strong>Срок:</strong> {{ good.installationTime }}</div>
          <div><strong>Гарантия:</strong> {{ good.warranty }}</div>
        </div>
        <div class="product-top__actions">
          <button class="button-main" @click="addCurrentGood">В корзину</button>
          <RouterLink to="/request" class="button-second button-link">Оставить заявку</RouterLink>
          <RouterLink v-if="isAdmin" :to="`/admin/edit/${good.id}`" class="button-second button-link">Редактировать</RouterLink>
        </div>
        <div class="product-top__message">{{ addedText }}</div>
      </div>
    </div>

    <div class="product-tabs card">
      <RouterLink :to="`/goods/${good.id}/description`">Описание</RouterLink>
      <RouterLink :to="`/goods/${good.id}/specs`">Характеристики</RouterLink>
      <RouterLink :to="`/goods/${good.id}/reviews`">Отзывы</RouterLink>
    </div>

    <div class="product-child card">
      <RouterView />
    </div>
  </section>

  <section v-else class="card empty-box">
    <h1 class="section-title">Услуга не найдена</h1>
    <p class="section-text">Проверьте ссылку или вернитесь к общему списку услуг.</p>
    <RouterLink to="/goods" class="button-main button-link">К списку услуг</RouterLink>
  </section>
</template>

<style scoped>
.product-page {
  display: grid;
  gap: 18px;
}

.product-top {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 22px;
  overflow: hidden;
}

.product-top__image {
  width: 100%;
  height: 100%;
  min-height: 330px;
  object-fit: cover;
}

.product-top__body {
  padding: 22px 22px 22px 0;
  display: grid;
  gap: 14px;
}

.product-top__category {
  color: var(--accent);
  font-weight: 700;
}

.product-top__meta {
  display: grid;
  gap: 10px;
  color: var(--text-soft);
}

.product-top__actions,
.product-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.product-top__message {
  min-height: 18px;
  color: var(--success);
  font-size: 14px;
}

.product-tabs,
.product-child,
.empty-box {
  padding: 18px;
}

.product-tabs a {
  color: var(--text-soft);
}

.product-tabs a.router-link-active,
.product-tabs a:hover {
  color: var(--accent);
}

@media (max-width: 900px) {
  .product-top {
    grid-template-columns: 1fr;
  }

  .product-top__body {
    padding: 0 18px 18px;
  }
}
</style>
