<script setup>
import { RouterLink } from 'vue-router'
import { useGoods } from '../composables/useGoods'
import GoodsCard from '../components/GoodsCard.vue'
import autoBg from '../assets/auto-bg.png'
import antiImage from '../assets/anti.jpg'
import stageImage from '../assets/stage1.jpg'
import detailImage from '../assets/detail.jpg'
import rx7Image from '../assets/rx7.png'
import demon from '../assets/gt1.png'
import targa from '../assets/gt2.png'
import rs6 from '../assets/gt3.png'
import srt from '../assets/gt4.png'

const { goods } = useGoods()

const heroStyle = {
  backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.62), rgba(12, 12, 12, 0.82)), url(${autoBg})`
}

const projectItems = [
  {
    title: 'NISSAN GTR (DEMON)',
    image: demon,
    hpBefore: 530,
    hpAfter: 1307,
    quarterMile: '7.2s'
  },
  {
    title: 'MAZDA RX-7 (RED COMET)',
    image: rx7Image,
    hpBefore: 280,
    hpAfter: 1606,
    quarterMile: '6.8s'
  },
  {
    title: 'DODGE DEMON SRT (GARRY)',
    image: srt,
    hpBefore: 890,
    hpAfter: 1300,
    quarterMile: '7.4s'
  },
  {
    title: 'AUDI RS6 (LARRY TURBO)',
    image: rs6,
    hpBefore: 600,
    hpAfter: 913,
    quarterMile: '9.4s'
  },
  {
    title: 'PORSCHE 911 (GREY ROCKET)',
    image: targa,
    hpBefore: 450 ,
    hpAfter: 850,
    quarterMile: '9.3s'
  }
]
</script>

<template>
  <section class="hero card" :style="heroStyle">
    <div class="hero__content">
      <p class="hero__label">Тюнинг-ателье и индивидуальные проекты</p>
      <h1 class="hero__title">404|DEVISION</h1>
      <p class="hero__text">
        Разрабатываем и реализуем готовые услуги для тюнинга автомобилей: стайлинг,
        технические доработки, интерьер, детейлинг и проекты под задачу клиента.
      </p>
      <div class="hero__actions">
        <RouterLink to="/goods" class="button-main button-link">Каталог услуг</RouterLink>
        <RouterLink to="/request" class="button-second button-link">Оставить заявку</RouterLink>
      </div>
    </div>
  </section>

  <section class="home-section">
    <h2 class="section-title">Наши проекты</h2>
    <p class="section-text">
      Примеры проектов с фото автомобилей и краткими характеристиками результата.
    </p>
    <div class="projects-grid">
      <article v-for="item in projectItems" :key="item.title" class="card project-card">
        <img :src="item.image" :alt="item.title" class="project-card__image">
        <div class="project-card__body">
          <h3>{{ item.title }}</h3>
          <div class="project-card__stats">
            <div><span>HP (было)</span><strong>{{ item.hpBefore }}</strong></div>
            <div><span>HP (tuning)</span><strong>{{ item.hpAfter }}</strong></div>
            <div><span>1/4 мили</span><strong>{{ item.quarterMile }}</strong></div>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="home-section">
    <h2 class="section-title">Готовые услуги</h2>
    <p class="section-text">Ниже представлены услуги, которые можно добавить в корзину и оформить через заявку.</p>
    <div class="three-columns">
      <GoodsCard v-for="good in goods.slice(0, 3)" :key="good.id" :good="good" />
    </div>
  </section>

  <section class="home-grid">
    <article class="card info-card">
      <h3>Почему выбирают 404|DEVISION</h3>
      <p>
        Мы работаем с автомобилем как с проектом: подбираем решение под задачу,
        объясняем этапы, соблюдаем аккуратность и сохраняем единый стиль в работе.
      </p>
      <p>
        Сайт тюнинг-ателье помогает быстро познакомиться с услугами, примерами работ,
        составом команды и оставить обращение на выполнение проекта.
      </p>
    </article>
  </section>
</template>

<style scoped>
.hero {
  overflow: hidden;
  margin-bottom: 32px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 460px;
  display: flex;
  align-items: center;
}

.hero__content {
  padding: 48px 36px;
  display: grid;
  gap: 16px;
}

.hero__label {
  color: var(--accent);
  font-weight: 700;
  margin: 0;
}

.hero__title {
  font-size: 56px;
  margin: 0;
  letter-spacing: 1px;
}

.hero__text {
  margin: 0;
  max-width: 760px;
  line-height: 1.7;
  color: #dfdfdf;
}

.hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.home-section,
.home-grid {
  margin-bottom: 32px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
}

.project-card {
  overflow: hidden;
}

.project-card__image {
  width: 350px;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid var(--border);
}

.project-card__body {
  padding: 18px;
  display: grid;
  gap: 12px;
}

.project-card__body h3 {
  margin: 0;
}

.project-card__stats {
  display: grid;
  gap: 10px;
}

.project-card__stats div {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--text-soft);
}

.project-card__stats strong {
  color: var(--text);
}

.info-card {
  padding: 24px;
}

.info-card h3 {
  margin-top: 0;
  margin-bottom: 12px;
}

.info-card p {
  margin: 0 0 12px;
  color: var(--text-soft);
  line-height: 1.7;
}

.info-card p:last-child {
  margin-bottom: 0;
}

@media (max-width: 1180px) {
  .projects-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
