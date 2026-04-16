<script setup>
import { reactive, watch, ref } from 'vue'
import { useUsers } from '../composables/useUsers'
import ModalWindow from '../components/ModalWindow.vue'

const { currentUser, updateCurrentUser } = useUsers()

const form = reactive({
  login: '',
  password: '',
  email: '',
  phone: '',
  city: '',
  car: ''
})

const errors = reactive({
  login: '',
  password: '',
  email: '',
  phone: ''
})

const isModalOpen = ref(false)

watch(
  currentUser,
  (newValue) => {
    if (!newValue) {
      return
    }

    form.login = newValue.login
    form.password = newValue.password
    form.email = newValue.email
    form.phone = newValue.phone
    form.city = newValue.city
    form.car = newValue.car
  },
  { immediate: true }
)

const loginReg = /^[A-Za-z0-9_]{3,}$/
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneReg = /^$|^\+?[0-9]{11,12}$/

function validate() {
  errors.login = loginReg.test(form.login) ? '' : 'Логин должен содержать минимум 3 символа.'
  errors.password = form.password.length >= 6 ? '' : 'Пароль должен содержать минимум 6 символов.'
  errors.email = emailReg.test(form.email) ? '' : 'Введите корректную почту.'
  errors.phone = phoneReg.test(form.phone) ? '' : 'Телефон должен содержать 11–12 цифр.'

  return !errors.login && !errors.password && !errors.email && !errors.phone
}

function saveProfile() {
  if (!validate()) {
    return
  }

  updateCurrentUser({ ...form })
  isModalOpen.value = true
}
</script>

<template>
  <section class="card profile-box" v-if="currentUser">
    <h1 class="section-title">Личный кабинет</h1>
    <p class="section-text">Здесь можно просмотреть и отредактировать данные авторизованного пользователя.</p>

    <form class="form-grid" @submit.prevent="saveProfile">
      <div class="two-columns">
        <div class="field">
          <label>Логин</label>
          <input v-model="form.login" type="text" @input="errors.login = ''">
          <div class="error-text">{{ errors.login }}</div>
        </div>

        <div class="field">
          <label>Пароль</label>
          <input v-model="form.password" type="password" @input="errors.password = ''">
          <div class="error-text">{{ errors.password }}</div>
        </div>
      </div>

      <div class="two-columns">
        <div class="field">
          <label>Email</label>
          <input v-model="form.email" type="text" @input="errors.email = ''">
          <div class="error-text">{{ errors.email }}</div>
        </div>

        <div class="field">
          <label>Телефон</label>
          <input v-model="form.phone" type="text" @input="errors.phone = ''">
          <div class="error-text">{{ errors.phone }}</div>
        </div>
      </div>

      <div class="two-columns">
        <div class="field">
          <label>Город</label>
          <input v-model="form.city" type="text">
        </div>

        <div class="field">
          <label>Автомобиль</label>
          <input v-model="form.car" type="text">
        </div>
      </div>

      <div>
        <button class="button-main" type="submit">Сохранить изменения</button>
      </div>
    </form>
  </section>

  <ModalWindow
    v-if="isModalOpen"
    title="Личный кабинет"
    text="Данные пользователя сохранены."
    @close="isModalOpen = false"
  />
</template>

<style scoped>
.profile-box {
  padding: 24px;
}
</style>
