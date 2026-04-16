<script setup>
import { useUsers } from '../composables/useUsers'
import ModalWindow from '../components/ModalWindow.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { users, currentUser, isAdmin, deleteUser, logoutUser } = useUsers()
const isModalOpen = ref(false)
const modalText = ref('')

function exitAccount() {
  logoutUser()
  router.push('/login')
}

function removeUser(id) {
  if (!isAdmin.value) {
    modalText.value = 'Удалять пользователей может только администратор.'
    isModalOpen.value = true
    return
  }

  const result = deleteUser(id)
  modalText.value = result ? 'Пользователь удалён.' : 'Удаление недоступно для выбранной записи.'
  isModalOpen.value = true
}
</script>

<template>
  <section class="card users-box">
    <h1 class="section-title">Список пользователей</h1>
    <p class="section-text">Раздел доступен только администратору. Обычные пользователи список всех аккаунтов не видят.</p>

    <div class="users-list">
      <div class="users-toolbar">
        <button class="button-second" @click="exitAccount">Выйти из аккаунта</button>
      </div>

      <article v-for="user in users" :key="user.id" class="card user-row">
        <div>
          <div class="user-name">{{ user.login }}</div>
          <div class="section-text">Email: {{ user.email }}</div>
          <div class="section-text">Телефон: {{ user.phone || 'не указан' }}</div>
          <div class="section-text">Город: {{ user.city || 'не указан' }}</div>
          <div class="section-text">Автомобиль: {{ user.car || 'не указан' }}</div>
          <div class="section-text">Роль: {{ user.role }}</div>
        </div>

        <div class="user-actions">
          <div v-if="currentUser && currentUser.id === user.id" class="current-user-note">Это вы</div>
          <button v-if="isAdmin && user.role !== 'admin'" class="button-danger" @click="removeUser(user.id)">Удалить</button>
        </div>
      </article>
    </div>
  </section>

  <ModalWindow
    v-if="isModalOpen"
    title="Работа с пользователями"
    :text="modalText"
    @close="isModalOpen = false"
  />
</template>

<style scoped>
.users-box {
  padding: 24px;
}

.users-list {
  display: grid;
  gap: 12px;
}

.users-toolbar {
  display: flex;
  justify-content: flex-end;
}

.user-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
}

.user-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.user-actions {
  display: grid;
  gap: 10px;
  align-content: start;
}

.current-user-note {
  color: var(--accent);
}

@media (max-width: 700px) {
  .user-row {
    flex-direction: column;
  }
}
</style>
