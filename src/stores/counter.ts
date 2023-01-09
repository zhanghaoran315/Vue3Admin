import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounter = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  const increment = () => count.value++

  return {
    count,
    doubleCount,
    increment
  }
})
