<script setup>
import { reactive, ref } from 'vue'
import { useGoods } from '../composables/useGoods'
import ModalWindow from '../components/ModalWindow.vue'
import placeholderImage from '../assets/placeholder.jpg'
import antiImage from '../assets/anti.jpg'
import stageImage from '../assets/stage1.jpg'
import interiorImage from '../assets/interior.png'
import detailImage from '../assets/detail.jpg'
import garageImage from '../assets/garage.png'
import rx7Image from '../assets/rx7.png'
import autoBgImage from '../assets/auto-bg.png'

const { addGood } = useGoods()

const imageOptions = [
  { label: 'Заглушка', value: placeholderImage },
  { label: 'Антихром', value: antiImage },
  { label: 'Stage 1', value: stageImage },
  { label: 'Интерьер', value: interiorImage },
  { label: 'Детейлинг', value: detailImage },
  { label: 'Проект в боксе', value: garageImage },
  { label: 'Mazda RX-7', value: rx7Image },
  { label: 'Hero / фон авто', value: autoBgImage }
]

const form = reactive({
  title: '',
  category: '',
  price: '',
  image: placeholderImage,
  shortDescription: '',
  description: '',
  installationTime: '',
  warranty: '',
  brand: '',
  type: '',
  compatibility: '',
  result: ''
})

const errors = reactive({
  title: '',
  category: '',
  price: '',
  shortDescription: '',
  description: '',
  installationTime: '',
  warranty: '',
  brand: '',
  type: '',
  compatibility: '',
  result: ''
})

const isModalOpen = ref(false)

function validate() {
  errors.title = form.title.trim() ? '' : 'Введите название услуги.'
  errors.category = form.category.trim() ? '' : 'Введите категорию.'
  errors.price = /^[0-9]+$/.test(String(form.price)) ? '' : 'Цена должна быть числом без букв.'
  errors.shortDescription = form.shortDescription.trim() ? '' : 'Введите краткое описание.'
  errors.description = form.description.trim() ? '' : 'Введите полное описание.'
  errors.installationTime = form.installationTime.trim() ? '' : 'Укажите срок выполнения.'
  errors.warranty = form.warranty.trim() ? '' : 'Укажите гарантию.'
  errors.brand = form.brand.trim() ? '' : 'Укажите бренд.'
  errors.type = form.type.trim() ? '' : 'Укажите тип услуги.'
  errors.compatibility = form.compatibility.trim() ? '' : 'Укажите совместимость.'
  errors.result = form.result.trim() ? '' : 'Укажите ожидаемый результат.'

  return Object.values(errors).every((item) => item === '')
}

function resetForm() {
  form.title = ''
  form.category = ''
  form.price = ''
  form.image = placeholderImage
  form.shortDescription = ''
  form.description = ''
  form.installationTime = ''
  form.warranty = ''
  form.brand = ''
  form.type = ''
  form.compatibility = ''
  form.result = ''
}

function submitForm() {
  if (!validate()) {
    return
  }

  addGood({ ...form })
  resetForm()
  isModalOpen.value = true
}
</script>

<template>
  <section class="admin-form">
    <h2>Добавление новой услуги</h2>

    <form class="form-grid" @submit.prevent="submitForm">
      <div class="two-columns">
        <div class="field">
          <label>Название</label>
          <input v-model="form.title" type="text" @input="errors.title = ''">
          <div class="error-text">{{ errors.title }}</div>
        </div>

        <div class="field">
          <label>Категория</label>
          <input v-model="form.category" type="text" @input="errors.category = ''">
          <div class="error-text">{{ errors.category }}</div>
        </div>
      </div>

      <div class="two-columns">
        <div class="field">
          <label>Цена</label>
          <input v-model="form.price" type="text" @input="errors.price = ''">
          <div class="error-text">{{ errors.price }}</div>
        </div>

        <div class="field">
          <label>Картинка</label>
          <select v-model="form.image">
            <option v-for="option in imageOptions" :key="option.label" :value="option.value">{{ option.label }}</option>
          </select>
          <div class="error-text"></div>
        </div>
      </div>

      <div class="field">
        <label>Краткое описание</label>
        <textarea v-model="form.shortDescription" @input="errors.shortDescription = ''"></textarea>
        <div class="error-text">{{ errors.shortDescription }}</div>
      </div>

      <div class="field">
        <label>Полное описание</label>
        <textarea v-model="form.description" @input="errors.description = ''"></textarea>
        <div class="error-text">{{ errors.description }}</div>
      </div>

      <div class="two-columns">
        <div class="field">
          <label>Срок выполнения</label>
          <input v-model="form.installationTime" type="text" @input="errors.installationTime = ''">
          <div class="error-text">{{ errors.installationTime }}</div>
        </div>

        <div class="field">
          <label>Гарантия</label>
          <input v-model="form.warranty" type="text" @input="errors.warranty = ''">
          <div class="error-text">{{ errors.warranty }}</div>
        </div>
      </div>

      <div class="two-columns">
        <div class="field">
          <label>Бренд</label>
          <input v-model="form.brand" type="text" @input="errors.brand = ''">
          <div class="error-text">{{ errors.brand }}</div>
        </div>

        <div class="field">
          <label>Тип</label>
          <input v-model="form.type" type="text" @input="errors.type = ''">
          <div class="error-text">{{ errors.type }}</div>
        </div>
      </div>

      <div class="two-columns">
        <div class="field">
          <label>Совместимость</label>
          <input v-model="form.compatibility" type="text" @input="errors.compatibility = ''">
          <div class="error-text">{{ errors.compatibility }}</div>
        </div>

        <div class="field">
          <label>Результат</label>
          <input v-model="form.result" type="text" @input="errors.result = ''">
          <div class="error-text">{{ errors.result }}</div>
        </div>
      </div>

      <div>
        <button class="button-main" type="submit">Добавить услугу</button>
      </div>
    </form>
  </section>

  <ModalWindow
    v-if="isModalOpen"
    title="Панель администратора"
    text="Новая услуга добавлена в список."
    @close="isModalOpen = false"
  />
</template>

<style scoped>
.admin-form {
  display: grid;
  gap: 18px;
}
</style>
