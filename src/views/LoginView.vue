<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'

const router = useRouter()
const route = useRoute()
const { loginUser } = useUsers()

const form = reactive({
  login: '',
  password: ''
})

const errors = reactive({
  login: '',
  password: '',
  common: ''
})

const successText = ref('')

function validate() {
  errors.login = form.login.trim() ? '' : 'Введите логин.'
  errors.password = form.password.trim() ? '' : 'Введите пароль.'
  return !errors.login && !errors.password
}

function submitLogin() {
  errors.common = ''
  successText.value = ''

  if (!validate()) {
    return
  }

  const result = loginUser(form.login, form.password)
  if (!result.success) {
    errors.common = result.message
    return
  }

  successText.value = result.message
  const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/profile'
  router.push(redirectPath)
}
</script>

<template>
  <section class="auth-box card">
    <h1 class="section-title">Авторизация</h1>
    <p class="section-text">Введите логин и пароль для входа.</p>

    <form class="form-grid" @submit.prevent="submitLogin">
      <div class="field">
        <label for="login">Логин</label>
        <input id="login" v-model="form.login" type="text" @input="errors.login = ''; errors.common = ''">
        <div class="error-text">{{ errors.login }}</div>
      </div>

      <div class="field">
        <label for="password">Пароль</label>
        <input id="password" v-model="form.password" type="password" @input="errors.password = ''; errors.common = ''">
        <div class="error-text">{{ errors.password }}</div>
      </div>

      <div class="error-text">{{ errors.common }}</div>
      <div class="success-text">{{ successText }}</div>

      <div>
        <button class="button-main" type="submit">Войти</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.auth-box {
  max-width: 560px;
  margin: 0 auto;
  padding: 26px;
}
</style>
