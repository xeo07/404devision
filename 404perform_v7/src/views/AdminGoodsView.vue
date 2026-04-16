<script setup>
import { ref } from 'vue'
import { useGoods } from '../composables/useGoods'
import GoodsCard from '../components/GoodsCard.vue'
import ModalWindow from '../components/ModalWindow.vue'

const { goods, deleteGood } = useGoods()
const isModalOpen = ref(false)
const modalText = ref('')

function removeGood(id) {
  deleteGood(id)
  modalText.value = 'Услуга удалена из списка.'
  isModalOpen.value = true
}
</script>

<template>
  <div class="admin-goods">
    <h2>Управление услугами</h2>
    <div class="three-columns">
      <div v-for="good in goods" :key="good.id" class="admin-good-wrap">
        <GoodsCard :good="good" :show-admin-button="true" />
        <button class="button-danger admin-good-delete" @click="removeGood(good.id)">Удалить услугу</button>
      </div>
    </div>
  </div>

  <ModalWindow
    v-if="isModalOpen"
    title="Панель администратора"
    :text="modalText"
    @close="isModalOpen = false"
  />
</template>

<style scoped>
.admin-goods {
  display: grid;
  gap: 18px;
}

.admin-good-wrap {
  display: grid;
  gap: 10px;
}

.admin-good-delete {
  width: 100%;
}
</style>
