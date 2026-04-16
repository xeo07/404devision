<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'

const router = useRouter()
const route = useRoute()
const { registerUser } = useUsers()

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
  phone: '',
  city: '',
  car: '',
  common: ''
})

const successText = ref('')

const loginReg = /^[A-Za-z0-9_]{3,}$/
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneReg = /^$|^\+?[0-9]{11,12}$/

function validate() {
  errors.login = loginReg.test(form.login) ? '' : 'Логин должен содержать минимум 3 символа без пробелов.'
  errors.password = form.password.length >= 6 ? '' : 'Пароль должен содержать минимум 6 символов.'
  errors.email = emailReg.test(form.email) ? '' : 'Введите корректную электронную почту.'
  errors.phone = phoneReg.test(form.phone) ? '' : 'Телефон должен содержать 11–12 цифр.'
  errors.city = ''
  errors.car = ''

  return !errors.login && !errors.password && !errors.email && !errors.phone
}

function submitRegister() {
  errors.common = ''
  successText.value = ''

  if (!validate()) {
    return
  }

  const result = registerUser({ ...form })

  if (!result.success) {
    errors.common = result.message
    return
  }

  successText.value = result.message
  form.login = ''
  form.password = ''
  form.email = ''
  form.phone = ''
  form.city = ''
  form.car = ''

  setTimeout(() => {
    const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/profile'
    router.push({ name: 'login', query: { redirect: redirectPath } })
  }, 1000)
}
</script>

<template>
  <section class="register-box card">
    <h1 class="section-title">Регистрация</h1>
    <p class="section-text">Создайте пользователя для доступа к личному кабинету.</p>

    <form class="form-grid" @submit.prevent="submitRegister">
      <div class="two-columns">
        <div class="field">
          <label for="login">Логин</label>
          <input id="login" v-model="form.login" type="text" @input="errors.login = ''; errors.common = ''">
          <div class="error-text">{{ errors.login }}</div>
        </div>

        <div class="field">
          <label for="password">Пароль</label>
          <input id="password" v-model="form.password" type="password" @input="errors.password = ''">
          <div class="error-text">{{ errors.password }}</div>
        </div>
      </div>

      <div class="two-columns">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="text" @input="errors.email = ''; errors.common = ''">
          <div class="error-text">{{ errors.email }}</div>
        </div>

        <div class="field">
          <label for="phone">Телефон</label>
          <input id="phone" v-model="form.phone" type="text" @input="errors.phone = ''">
          <div class="error-text">{{ errors.phone }}</div>
        </div>
      </div>

      <div class="two-columns">
        <div class="field">
          <label for="city">Город (необязательно)</label>
          <input id="city" v-model="form.city" type="text">
          <div class="error-text">{{ errors.city }}</div>
        </div>

        <div class="field">
          <label for="car">Автомобиль (необязательно)</label>
          <input id="car" v-model="form.car" type="text">
          <div class="error-text">{{ errors.car }}</div>
        </div>
      </div>

      <div class="error-text">{{ errors.common }}</div>
      <div class="success-text">{{ successText }}</div>

      <div>
        <button class="button-main" type="submit">Зарегистрироваться</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.register-box {
  padding: 26px;
}
</style>
