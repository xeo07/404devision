<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <section class="admin-page">
    <div class="card admin-menu">
      <h1 class="section-title">Панель администратора</h1>
      <div class="admin-links">
        <RouterLink to="/admin/goods">Список услуг</RouterLink>
        <RouterLink to="/admin/add">Добавить услугу</RouterLink>
      </div>
    </div>

    <div class="card admin-content">
      <RouterView />
    </div>
  </section>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 16px;
}

.admin-menu,
.admin-content {
  padding: 20px;
}

.admin-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-links a {
  color: var(--text-soft);
}

.admin-links a.router-link-active,
.admin-links a:hover {
  color: var(--accent);
}
</style>
