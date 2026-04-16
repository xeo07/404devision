<script setup>
import { RouterLink } from 'vue-router'
import logo from '../assets/altlogo.png'

const socialLinks = [
  { title: 'Telegram', href: 'https://t.me/t404shop' },
  { title: 'VK', href: 'https://vk.com/404devision' },
  { title: 'WhatsApp', href: 'https://wa.me/79994047725' },
  { title: 'Email', href: 'mailto:t404shop@gmail.com' }
]
</script>

<template>
  <footer class="footer card">
    <div class="footer__inner">
      <div class="footer__brand">
        <img :src="logo" alt="404|DEVISION" class="footer__logo">
        <div>
          <div class="footer__title">404|DEVISION</div>
          <div class="footer__text">Тюнинг-ателье и индивидуальные решения для автомобилей</div>
          <div class="footer__text">© 404SQUAD</div>
        </div>
      </div>

      <div class="footer__column">
        <div class="footer__subtitle">Контакты</div>
        <div class="footer__text">+7 (999) 404-77-25</div>
        <div class="footer__text">+7 (997) 404-77-04</div>
        <div class="footer__text">t404shop@gmail.com</div>
        <div class="footer__text">Санкт-Петербург</div>
      </div>

      <div class="footer__column">
        <div class="footer__subtitle">Разделы</div>
        <div class="footer__links">
          <RouterLink to="/">Главная</RouterLink>
          <RouterLink to="/about">О нас</RouterLink>
          <RouterLink to="/goods">Услуги</RouterLink>
          <RouterLink to="/cart">Корзина</RouterLink>
          <RouterLink to="/request">Заявка</RouterLink>
        </div>
      </div>

      <div class="footer__column">
        <div class="footer__subtitle">Социальные сети</div>
        <div class="footer__links">
          <a v-for="item in socialLinks" :key="item.title" :href="item.href" target="_blank" rel="noreferrer">{{ item.title }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: min(1180px, calc(100% - 32px));
  margin: 24px auto 12px;
}

.footer__inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 22px;
}

.footer__brand {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.footer__logo {
  width: 52px;
  height: 52px;
}

.footer__title {
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 6px;
}

.footer__subtitle {
  font-weight: 700;
  margin-bottom: 10px;
}

.footer__text,
.footer__links a {
  color: var(--text-soft);
  line-height: 1.6;
}

.footer__links {
  display: grid;
  gap: 8px;
}

.footer__links a:hover {
  color: var(--accent);
}

@media (max-width: 1024px) {
  .footer__inner {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .footer__inner {
    grid-template-columns: 1fr;
  }
}
</style>
