<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'
import { useCart } from '../composables/useCart'
import logo from '../assets/logo.png'

const router = useRouter()
const { currentUser, isAuth, isAdmin, logoutUser } = useUsers()
const { totalCount } = useCart()

const userLabel = computed(() => {
  if (!currentUser.value) {
    return 'Гость'
  }

  return `${currentUser.value.login} (${currentUser.value.role})`
})

function exitAccount() {
  logoutUser()
  router.push('/login')
}
</script>

<template>
  <header class="header card">
    <div class="header__inner">
      <RouterLink to="/" class="header__logo">
        <img :src="logo" alt="404|DEVISION" class="header__logo-image">
      </RouterLink>

      <nav class="header__nav">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/about">О нас</RouterLink>
        <RouterLink to="/goods">Услуги</RouterLink>
        <RouterLink to="/cart" class="header__cart-link">
          Корзина
          <span v-if="totalCount" class="header__cart-badge">{{ totalCount }}</span>
        </RouterLink>
        <RouterLink to="/request">Заявка</RouterLink>
        <RouterLink v-if="isAuth" to="/profile">Личный кабинет</RouterLink>
        <RouterLink v-if="isAdmin" to="/users">Пользователи</RouterLink>
        <RouterLink v-if="isAdmin" to="/admin">Панель администратора</RouterLink>
      </nav>

      <div class="header__auth">
        <div class="header__status">{{ userLabel }}</div>
        <RouterLink v-if="!isAuth" to="/login" class="button-second button-link">Вход</RouterLink>
        <RouterLink v-if="!isAuth" to="/register" class="button-main button-link">Регистрация</RouterLink>
        <button v-if="isAuth" class="button-second" @click="exitAccount">Выход</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  margin: 12px auto 24px;
  width: min(1180px, calc(100% - 32px));
  background: linear-gradient(180deg, rgba(13, 13, 13, 0.98) 0%, rgba(28, 28, 28, 0.98) 100%);
  backdrop-filter: blur(8px);
}

.header__inner {
  min-height: var(--header-height);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 20px;
  padding: 12px 18px;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 22px;
  font-weight: 700;
  color: var(--accent);
}

.header__logo-image {
  height: 60px;
}

.header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.header__nav a {
  color: var(--text-soft);
  transition: 0.2s;
}

.header__nav a.router-link-active,
.header__nav a:hover {
  color: var(--accent);
}

.header__cart-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.header__cart-badge {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.header__auth {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.header__status {
  color: var(--text-soft);
}

@media (max-width: 980px) {
  .header__inner {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .header__auth {
    justify-content: center;
  }
}
</style>
