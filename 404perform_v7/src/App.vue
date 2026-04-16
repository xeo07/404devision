<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="page-shell">
    <SiteHeader />
    <main class="page-content">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
