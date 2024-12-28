import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  // Retrieve user authentication token from localStorage
  const readAuthToken = () => {
    if (import.meta.client) {
      const storedUser = localStorage.getItem('app_user')
      if (storedUser) {
        user.value = storedUser
      }
    }
  }

  const getUser = () => {
    if (import.meta.client) {
      const storedUser = localStorage.getItem('app_user')
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null
  }


  const setUser = (name) => {
    user.value = name
    if (import.meta.client) {
      localStorage.setItem('app_user', name)
    }
  }


  // Computed property to check if the user is authenticated
  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    setUser,
    getUser,
    readAuthToken,
    isAuthenticated
  }
})
