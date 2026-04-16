<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found card">
    <div class="not-found__code">404</div>
    <div class="not-found__brand">404|Atelier</div>
    <h1 class="section-title">Страница не найдена</h1>
    <p class="section-text">
      Такой страницы нет. Вернитесь на главную или откройте список услуг.
    </p>
    <div class="not-found__actions">
      <RouterLink to="/" class="button-main button-link">На главную</RouterLink>
      <RouterLink to="/goods" class="button-second button-link">К услугам</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  padding: 40px 24px;
  text-align: center;
  display: grid;
  gap: 12px;
}

.not-found__code {
  font-size: 96px;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.not-found__brand {
  color: var(--text-soft);
  font-weight: 700;
  letter-spacing: 1px;
}

.not-found__actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
