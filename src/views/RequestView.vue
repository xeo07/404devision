<script setup>
import { reactive, ref } from 'vue'
import { useGoods } from '../composables/useGoods'
import { useRequests } from '../composables/useRequests'
import ModalWindow from '../components/ModalWindow.vue'

const { goods } = useGoods()
const { addRequest } = useRequests()

const form = reactive({
  customerName: '',
  phone: '',
  email: '',
  car: '',
  goodId: '',
  visitType: 'Замер',
  needCall: false,
  comment: ''
})

const errors = reactive({
  customerName: '',
  phone: '',
  email: '',
  car: '',
  goodId: '',
  comment: ''
})

const isModalOpen = ref(false)

const nameReg = /^[А-Яа-яA-Za-zЁё\s-]{2,}$/
const phoneReg = /^\+?[0-9]{11,12}$/
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  errors.customerName = nameReg.test(form.customerName) ? '' : 'Введите имя без цифр, не менее 2 символов.'
  errors.phone = phoneReg.test(form.phone) ? '' : 'Введите телефон в формате +79994040000.'
  errors.email = emailReg.test(form.email) ? '' : 'Введите корректную электронную почту.'
  errors.car = form.car.trim() ? '' : 'Укажите марку и модель автомобиля.'
  errors.goodId = form.goodId ? '' : 'Выберите услугу.'
  errors.comment = form.comment.trim() ? '' : 'Добавьте краткое описание пожеланий.'

  return !errors.customerName && !errors.phone && !errors.email && !errors.car && !errors.goodId && !errors.comment
}

function clearError(field) {
  errors[field] = ''
}

function resetForm() {
  form.customerName = ''
  form.phone = ''
  form.email = ''
  form.car = ''
  form.goodId = ''
  form.visitType = 'Замер'
  form.needCall = false
  form.comment = ''
}

function submitRequest() {
  if (!validate()) {
    return
  }

  const selectedService = goods.value.find((good) => good.id === Number(form.goodId))

  addRequest({
    customerName: form.customerName,
    phone: form.phone,
    email: form.email,
    car: form.car,
    visitType: form.visitType,
    needCall: form.needCall,
    comment: form.comment,
    fromCart: false,
    services: selectedService ? [selectedService.title] : [],
    totalPrice: selectedService ? selectedService.price : 0
  })

  resetForm()
  isModalOpen.value = true
}
</script>

<template>
  <section class="card request-box">
    <h1 class="section-title">Заявка на услуги</h1>
    <p class="section-text">Заполните форму, и специалист 404|DEVISION свяжется с вами для уточнения деталей проекта.</p>

    <form class="form-grid" @submit.prevent="submitRequest">
      <div class="two-columns">
        <div class="field">
          <label for="customerName">Имя</label>
          <input id="customerName" v-model="form.customerName" type="text" @input="clearError('customerName')">
          <div class="error-text">{{ errors.customerName }}</div>
        </div>

        <div class="field">
          <label for="phone">Телефон</label>
          <input id="phone" v-model="form.phone" type="text" @input="clearError('phone')">
          <div class="error-text">{{ errors.phone }}</div>
        </div>
      </div>

      <div class="two-columns">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="text" @input="clearError('email')">
          <div class="error-text">{{ errors.email }}</div>
        </div>

        <div class="field">
          <label for="car">Автомобиль</label>
          <input id="car" v-model="form.car" type="text" @input="clearError('car')">
          <div class="error-text">{{ errors.car }}</div>
        </div>
      </div>

      <div class="field">
        <label for="goodId">Услуга</label>
        <select id="goodId" v-model="form.goodId" @change="clearError('goodId')">
          <option value="">Выберите вариант</option>
          <option v-for="good in goods" :key="good.id" :value="good.id">{{ good.title }}</option>
        </select>
        <div class="error-text">{{ errors.goodId }}</div>
      </div>

      <div class="field radio-group">
        <label>Формат визита</label>
        <label><input v-model="form.visitType" type="radio" value="Замер"> Замер</label>
        <label><input v-model="form.visitType" type="radio" value="Диагностика"> Диагностика</label>
        <label><input v-model="form.visitType" type="radio" value="Консультация"> Консультация</label>
      </div>

      <div class="field checkbox-field">
        <label><input v-model="form.needCall" type="checkbox"> Нужен обратный звонок</label>
      </div>

      <div class="field">
        <label for="comment">Комментарий</label>
        <textarea id="comment" v-model="form.comment" @input="clearError('comment')"></textarea>
        <div class="error-text">{{ errors.comment }}</div>
      </div>

      <div>
        <button class="button-main" type="submit">Отправить заявку</button>
      </div>
    </form>
  </section>

  <ModalWindow
    v-if="isModalOpen"
    title="Заявка отправлена"
    text="Специалист 404|DEVISION свяжется с вами для уточнения деталей проекта."
    @close="isModalOpen = false"
  />
</template>

<style scoped>
.request-box {
  padding: 26px;
}

.radio-group,
.checkbox-field {
  gap: 10px;
}

.radio-group label,
.checkbox-field label {
  font-weight: 400;
}
</style>
