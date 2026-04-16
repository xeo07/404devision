import { reactive, computed, watch } from 'vue'
import antiChromeImage from '../assets/anti.jpg'
import stage1Image from '../assets/stage1.jpg'
import interiorImage from '../assets/interior.png'
import detailImage from '../assets/detail.jpg'
import placeholderImage from '../assets/placeholder.jpg'
const defaultGoods = [
  {
    id: 1,
    title: 'Антихром пакет',
    category: 'Стайлинг',
    price: 68500,
    image: antiChromeImage,
    shortDescription: 'Оклейка хромированных элементов кузова в глянцевый чёрный цвет.',
    description: 'Комплексная услуга для обновления экстерьера автомобиля. Включает демонтаж, подготовку поверхности и аккуратную оклейку декоративных элементов.',
    installationTime: '1 день',
    warranty: '6 месяцев',
    specs: {
      brand: '404 Performance Film',
      type: 'Полиуретановая плёнка',
      compatibility: 'Седаны, кроссоверы, купе',
      result: 'Глубокий чёрный цвет без хрома'
    },
    reviews: [
      'Внешний вид стал заметно агрессивнее.',
      'Работа выполнена аккуратно, зазоры чистые.'
    ]
  },
  {
    id: 2,
    title: 'Stage 1 ECU',
    category: 'Технический тюнинг',
    price: 35000,
    image: stage1Image,
    shortDescription: 'Программная корректировка блока управления для более отзывчивой динамики.',
    description: 'Прошивка Stage 1 ориентирована на городской режим и улучшение отклика педали газа без вмешательства в механическую часть.',
    installationTime: '4 часа',
    warranty: '12 месяцев',
    specs: {
      brand: '404 Performance Software',
      type: 'Чип-тюнинг',
      compatibility: 'Турбированные бензиновые двигатели',
      result: 'Рост мощности и крутящего момента'
    },
    reviews: [
      'Машина стала отзывчивее уже с низов.',
      'Удобно для ежедневной эксплуатации.'
    ]
  },
  {
    id: 3,
    title: 'Комфортный интерьер',
    category: 'Интерьер',
    price: 42000,
    image: interiorImage,
    shortDescription: 'Перешив салона, локальная шумоизоляция и обновление декоративных вставок.',
    description: 'Решение для тех, кто хочет улучшить ощущение от салона: приятные материалы, более тихий салон и аккуратный внешний вид.',
    installationTime: '3 дня',
    warranty: '12 месяцев',
    specs: {
      brand: '404 Performance Interior',
      type: 'Комплекс салона',
      compatibility: 'Легковые автомобили',
      result: 'Повышенный комфорт и визуальная премиальность'
    },
    reviews: [
      'Салон стал выглядеть дороже.',
      'Шум с дороги уменьшился.'
    ]
  },
  {
    id: 4,
    title: 'Detailing Protect',
    category: 'Детейлинг',
    price: 18000,
    image: detailImage,
    shortDescription: 'Мойка, полировка и защитное покрытие кузова.',
    description: 'Комплексная детейлинг-подготовка для восстановления блеска и защиты лакокрасочного покрытия автомобиля.',
    installationTime: '1 день',
    warranty: '3 месяца',
    specs: {
      brand: '404 Performance Care',
      type: 'Полировка и защита',
      compatibility: 'Любые автомобили',
      result: 'Глубокий блеск и гидрофобный эффект'
    },
    reviews: [
      'Кузов выглядит как после покупки.',
      'Хороший вариант перед сезоном.'
    ]
  }
]

const state = reactive({
  goods: defaultGoods,
  nextId: 5
})

try {
  const goodsFromStorage = localStorage.getItem('st_goods')
  const nextIdFromStorage = localStorage.getItem('st_goods_next_id')

  if (goodsFromStorage) {
    const parsedGoods = JSON.parse(goodsFromStorage)
    if (Array.isArray(parsedGoods) && parsedGoods.length > 0) {
      state.goods = parsedGoods
    }
  }

  if (nextIdFromStorage) {
    state.nextId = Number(nextIdFromStorage)
  }
} catch (error) {
  state.goods = defaultGoods
  state.nextId = 5
}

watch(
  () => state.goods,
  (newValue) => {
    localStorage.setItem('st_goods', JSON.stringify(newValue))
  },
  { deep: true }
)

watch(
  () => state.nextId,
  (newValue) => {
    localStorage.setItem('st_goods_next_id', String(newValue))
  }
)

function getGoodById(id) {
  return state.goods.find((good) => good.id === Number(id))
}

function addGood(data) {
  const newGood = {
    id: state.nextId,
    title: data.title,
    category: data.category,
    price: Number(data.price),
    image: data.image || placeholderImage,
    shortDescription: data.shortDescription,
    description: data.description,
    installationTime: data.installationTime,
    warranty: data.warranty,
    specs: {
      brand: data.brand,
      type: data.type,
      compatibility: data.compatibility,
      result: data.result
    },
    reviews: ['У данной услуги пока нет отзывов.']
  }

  state.goods.push(newGood)
  state.nextId += 1
}

function updateGood(id, data) {
  const good = getGoodById(id)

  if (!good) {
    return false
  }

  good.title = data.title
  good.category = data.category
  good.price = Number(data.price)
  good.image = data.image || placeholderImage
  good.shortDescription = data.shortDescription
  good.description = data.description
  good.installationTime = data.installationTime
  good.warranty = data.warranty
  good.specs.brand = data.brand
  good.specs.type = data.type
  good.specs.compatibility = data.compatibility
  good.specs.result = data.result

  return true
}

function deleteGood(id) {
  const index = state.goods.findIndex((good) => good.id === Number(id))
  if (index !== -1) {
    state.goods.splice(index, 1)
  }
}

export function useGoods() {
  const goods = computed(() => state.goods)

  return {
    goods,
    addGood,
    updateGood,
    deleteGood,
    getGoodById,
    placeholderImage
  }
}
