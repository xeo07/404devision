import { reactive, computed, watch } from 'vue'
import { useGoods } from './useGoods'

const state = reactive({
  items: []
})

try {
  const itemsFromStorage = localStorage.getItem('st_cart_items')
  if (itemsFromStorage) {
    const parsedItems = JSON.parse(itemsFromStorage)
    if (Array.isArray(parsedItems)) {
      state.items = parsedItems
    }
  }
} catch (error) {
  state.items = []
}

watch(
  () => state.items,
  (newValue) => {
    localStorage.setItem('st_cart_items', JSON.stringify(newValue))
  },
  { deep: true }
)

function normalizeQty(value) {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue) || numberValue < 1) {
    return 1
  }

  return Math.floor(numberValue)
}

function addToCart(goodId, qty = 1) {
  const normalizedQty = normalizeQty(qty)
  const existingItem = state.items.find((item) => item.goodId === Number(goodId))

  if (existingItem) {
    existingItem.qty += normalizedQty
    return
  }

  state.items.push({
    goodId: Number(goodId),
    qty: normalizedQty
  })
}

function updateQty(goodId, qty) {
  const existingItem = state.items.find((item) => item.goodId === Number(goodId))

  if (!existingItem) {
    return
  }

  existingItem.qty = normalizeQty(qty)
}

function increaseQty(goodId) {
  const existingItem = state.items.find((item) => item.goodId === Number(goodId))

  if (!existingItem) {
    return
  }

  existingItem.qty += 1
}

function decreaseQty(goodId) {
  const existingItem = state.items.find((item) => item.goodId === Number(goodId))

  if (!existingItem) {
    return
  }

  if (existingItem.qty <= 1) {
    removeFromCart(goodId)
    return
  }

  existingItem.qty -= 1
}

function removeFromCart(goodId) {
  const index = state.items.findIndex((item) => item.goodId === Number(goodId))

  if (index !== -1) {
    state.items.splice(index, 1)
  }
}

function clearCart() {
  state.items = []
}

export function useCart() {
  const { getGoodById } = useGoods()

  const cartItems = computed(() => {
    return state.items
      .map((item) => {
        const good = getGoodById(item.goodId)

        if (!good) {
          return null
        }

        return {
          goodId: item.goodId,
          qty: item.qty,
          good,
          sum: good.price * item.qty
        }
      })
      .filter(Boolean)
  })

  const totalCount = computed(() => {
    return cartItems.value.reduce((accumulator, item) => accumulator + item.qty, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((accumulator, item) => accumulator + item.sum, 0)
  })

  return {
    cartItems,
    totalCount,
    totalPrice,
    addToCart,
    updateQty,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart
  }
}
