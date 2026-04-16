
<script setup>
import team1 from '../assets/personal1.png'
import team2 from '../assets/personal2.png'
import team3 from '../assets/personal3.png'
import team4 from '../assets/personal4.png'

const team = [
  {
    name: 'Артём',
    role: 'Руководитель ателье',
    work: 'Принимает проект, общается с клиентом, формирует состав работ и контролирует общий результат.',
    image: team4
  },
  {
    name: 'Илья',
    role: 'Специалист по техническому тюнингу',
    work: 'Ведёт Stage-проекты, диагностику, подбор конфигурации и технические доработки автомобиля.',
    image: team3
  },
  {
    name: 'Максим',
    role: 'Мастер по стайлингу и детейлингу',
    work: 'Занимается антихромом, внешним стайлингом, защитой кузова и визуальной подачей проекта.',
    image: team2
  },
  {
    name: 'Никита',
    role: 'Специалист по интерьеру',
    work: 'Отвечает за доработку салона, материалы, аккуратную сборку и повышение комфорта.',
    image: team1
  }
]
</script>


<template>
  <section class="card about-box">
    <h1 class="section-title">О компании</h1>
    <p class="section-text">
      404SQUAD — команда, основанная в 2025 году четырьмя товарищами. Со временем внутри
      проекта появилось отдельное направление 404|DEVISION, которое сосредоточено
      на тюнинге, модификации и визуальном обновлении автомобилей.
    </p>
    <div class="two-columns about-grid">
      <div class="card about-item">
        <img src="../assets/rx7.png" alt="rx-7" class="cardimg">
        <h3>Чем занимается 404|DEVISION</h3>
        <ul class="list-clean about-list">
          <li>Внешний тюнинг и стайлинг</li>
          <li>Технические модификации</li>
          <li>Доработка интерьера</li>
          <li>Комплексные решения для автомобилей</li>
        </ul>
      </div>
      <div class="card about-item">
        <img src="../assets/garage.png" alt="garage" class="cardimg">
        <h3>Подход к работе</h3>
        <p>
          Для нас важны аккуратность исполнения, понятный результат и современный
          визуальный стиль. Мы стремимся объединять технический подход и индивидуальный
          характер каждого проекта.
        </p>
        <p>
          Сайт 404|DEVISION помогает познакомиться с товарами и услугами, открыть
          карточку конкретного решения и отправить заявку на подбор модификации.
        </p>
      </div>
    </div>
    <div class="about-section">
      <h2 class="section-title section-title--small">Наша команда</h2>
      <p class="section-text">
        Наши роли и задачи внутри проекта.
      </p>

      <div class="team-grid">
        <article v-for="member in team" :key="member.name" class="card team-card">
          <img :src="member.image" :alt="member.name" class="team-card__image">
          <div class="team-card__body">
            <h3>{{ member.name }}</h3>
            <div class="team-card__role">{{ member.role }}</div>
            <p>{{ member.work }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-box {
  padding: 28px;
}

.about-grid {
  margin-top: 20px;
}

.about-item {
  padding: 20px;
}

.about-item p {
  color: var(--text-soft);
  line-height: 1.7;
  margin: 0 0 12px;
}

.about-item p:last-child {
  margin-bottom: 0;
}

.about-list {
  display: grid;
  gap: 10px;
  color: var(--text-soft);
}

.cardimg {
  border: 1px solid rgba(58, 68, 75, 0.2);
  border-radius: 14px;
  display: block;
}

.about-section {
  margin-top: 28px;
}

.section-title--small {
  font-size: 28px;
  margin-bottom: 12px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.team-card {
  overflow: hidden;
}

.team-card__image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-bottom: 1px solid var(--border);
}

.team-card__body {
  padding: 18px;
  display: grid;
  gap: 10px;
}

.team-card__body h3,
.team-card__body p {
  margin: 0;
}

.team-card__body p {
  color: var(--text-soft);
  line-height: 1.7;
}

.team-card__role {
  color: var(--accent);
  font-weight: 700;
}

@media (max-width: 1080px) {
  .team-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>

