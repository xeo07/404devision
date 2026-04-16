<script setup>
const props = defineProps({
  title: String,
  text: String
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="modal-layout">
    <div class="modal-backdrop" @click="emit('close')"></div>
    <div class="modal-window card">
      <h3 class="modal-title">{{ props.title }}</h3>
      <p class="modal-text">{{ props.text }}</p>
      <button class="button-main" @click="emit('close')">Закрыть</button>
    </div>
  </div>
</template>

<style scoped>
.modal-layout {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
}

.modal-window {
  position: relative;
  z-index: 1001;
  width: min(460px, calc(100% - 32px));
  padding: 24px;
  display: grid;
  gap: 16px;
}

.modal-title {
  margin: 0;
}

.modal-text {
  margin: 0;
  line-height: 1.5;
  color: var(--text-soft);
}
</style>
