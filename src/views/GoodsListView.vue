<script setup>
import { computed, ref } from 'vue'
import { useGoods } from '../composables/useGoods'
import { useUsers } from '../composables/useUsers'
import GoodsCard from '../components/GoodsCard.vue'

const { goods } = useGoods()
const { isAdmin } = useUsers()

const category = ref('Все')
const sortType = ref('default')

const categories = computed(() => {
  const list = ['Все']

  goods.value.forEach((good) => {
    if (!list.includes(good.category)) {
      list.push(good.category)
    }
  })

  return list
})

const filteredGoods = computed(() => {
  let result = goods.value

  if (category.value !== 'Все') {
    result = result.filter((good) => good.category === category.value)
  }

  const copiedResult = [...result]

  if (sortType.value === 'price-asc') {
    copiedResult.sort((a, b) => a.price - b.price)
  }

  if (sortType.value === 'price-desc') {
    copiedResult.sort((a, b) => b.price - a.price)
  }

  if (sortType.value === 'title-asc') {
    copiedResult.sort((a, b) => a.title.localeCompare(b.title, 'ru'))
  }

  return copiedResult
})
</script>

<template>
  <section class="page-block">
    <div class="card filter-box">
      <h1 class="section-title">Каталог услуг</h1>
      <p class="section-text">Список готовых услуг тюнинг-ателье. Новые услуги автоматически появляются в общем списке.</p>

      <div class="filter-row">
        <span>Категория:</span>
        <button
          v-for="item in categories"
          :key="item"
          class="button-second"
          :class="{ 'filter-active': category === item }"
          @click="category = item"
        >
          {{ item }}
        </button>
      </div>

      <div class="sort-row field">
        <label for="sortType">Сортировка</label>
        <select id="sortType" v-model="sortType">
          <option value="default">Без сортировки</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
          <option value="title-asc">По названию</option>
        </select>
      </div>
    </div>

    <div class="three-columns">
      <GoodsCard
        v-for="good in filteredGoods"
        :key="good.id"
        :good="good"
        :show-admin-button="isAdmin"
      />
    </div>
  </section>
</template>

<style scoped>
.page-block {
  display: grid;
  gap: 20px;
}

.filter-box {
  padding: 16px;
}

.filter-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;
}

.filter-active {
  border-color: var(--accent);
  color: var(--accent);
}

.sort-row {
  max-width: 320px;
}
</style>
