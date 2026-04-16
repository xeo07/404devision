<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useUsers } from '../composables/useUsers'
import ModalWindow from '../components/ModalWindow.vue'

const router = useRouter()
const { isAuth } = useUsers()
const {
  cartItems,
  increaseQty,
  decreaseQty,
  updateQty,
  removeFromCart,
  clearCart
} = useCart()

const isModalOpen = ref(false)
const modalTitle = ref('')
const modalText = ref('')

const isEmpty = computed(() => cartItems.value.length === 0)

function setQty(goodId, event) {
  updateQty(goodId, event.target.value)
}

function clearAll() {
  clearCart()
  modalTitle.value = 'Корзина'
  modalText.value = 'Корзина очищена. Вы можете заново выбрать услуги из каталога.'
  isModalOpen.value = true
}

function buyItem(item) {
  if (!isAuth.value) {
    router.push({ name: 'register', query: { redirect: '/cart' } })
    return
  }

  modalTitle.value = 'Оплата'
  modalText.value = `Оплата услуги «${item.good.title}» прошла успешно.`
  removeFromCart(item.goodId)
  isModalOpen.value = true
}
</script>

<template>
  <section class="cart-page">
    <div class="card cart-box">
      <div class="cart-box__header">
        <div>
          <h1 class="section-title">Корзина услуг</h1>
          <p class="section-text">Здесь собраны готовые услуги, которые можно заказать сразу.</p>
        </div>
        <button v-if="!isEmpty" class="button-danger" @click="clearAll">Очистить корзину</button>
      </div>

      <div v-if="isEmpty" class="empty-state">
        <h2>Корзина пока пуста</h2>
        <p class="section-text">Добавьте услугу из каталога или со страницы конкретной услуги.</p>
        <RouterLink to="/goods" class="button-main button-link">Перейти к услугам</RouterLink>
      </div>

      <div v-else class="cart-list">
        <article v-for="item in cartItems" :key="item.goodId" class="card cart-item">
          <img :src="item.good.image" :alt="item.good.title" class="cart-item__image">

          <div class="cart-item__body">
            <RouterLink :to="`/goods/${item.good.id}`" class="cart-item__title">{{ item.good.title }}</RouterLink>
            <div class="cart-item__category">{{ item.good.category }}</div>
            <p class="section-text">{{ item.good.shortDescription }}</p>
          </div>

          <div class="cart-item__controls">
            <div class="cart-item__price">{{ item.good.price }} ₽</div>
            <div class="qty-box">
              <button class="button-second" @click="decreaseQty(item.goodId)">-</button>
              <input :value="item.qty" type="number" min="1" @input="setQty(item.goodId, $event)">
              <button class="button-second" @click="increaseQty(item.goodId)">+</button>
            </div>
            <div class="cart-item__sum">Итого: {{ item.sum }} ₽</div>
            <button class="button-danger" @click="removeFromCart(item.goodId)">Удалить</button>
            <button class="button-main" @click="buyItem(item)">Купить</button>
          </div>
        </article>
      </div>
    </div>
  </section>

  <ModalWindow
    v-if="isModalOpen"
    :title="modalTitle"
    :text="modalText"
    @close="isModalOpen = false"
  />
</template>

<style scoped>
.cart-page {
  display: grid;
  gap: 20px;
}

.cart-box {
  padding: 24px;
}

.cart-box__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.empty-state {
  display: grid;
  gap: 12px;
}

.empty-state h2 {
  margin: 0;
}

.cart-list {
  display: grid;
  gap: 14px;
}

.cart-item {
  display: grid;
  grid-template-columns: 220px 1fr auto;
  gap: 18px;
  padding: 16px;
}

.cart-item__image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
}

.cart-item__body {
  display: grid;
  gap: 8px;
  align-content: start;
}

.cart-item__title {
  font-size: 22px;
  font-weight: 700;
}

.cart-item__title:hover {
  color: var(--accent);
}

.cart-item__category {
  color: var(--accent);
  font-weight: 700;
}

.cart-item__controls {
  display: grid;
  gap: 10px;
  min-width: 220px;
  align-content: start;
}

.cart-item__price,
.cart-item__sum {
  font-weight: 700;
}

.qty-box {
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  gap: 8px;
}

.qty-box input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #0b0d10;
  color: var(--text);
  text-align: center;
}

@media (max-width: 900px) {
  .cart-box__header,
  .cart-item {
    grid-template-columns: 1fr;
  }

  .cart-item__controls {
    min-width: 0;
  }
}
</style>
