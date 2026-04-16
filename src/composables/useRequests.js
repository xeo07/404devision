import { reactive, computed, watch } from 'vue'

const state = reactive({
  requests: []
})

try {
  const requestsFromStorage = localStorage.getItem('st_requests')
  if (requestsFromStorage) {
    const parsedRequests = JSON.parse(requestsFromStorage)
    if (Array.isArray(parsedRequests)) {
      state.requests = parsedRequests
    }
  }
} catch (error) {
  state.requests = []
}

watch(
  () => state.requests,
  (newValue) => {
    localStorage.setItem('st_requests', JSON.stringify(newValue))
  },
  { deep: true }
)

function addRequest(data) {
  state.requests.push({
    id: Date.now(),
    createdAt: new Date().toLocaleString('ru-RU'),
    ...data
  })
}

export function useRequests() {
  const requests = computed(() => state.requests)

  return {
    requests,
    addRequest
  }
}
