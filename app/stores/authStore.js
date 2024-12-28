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

  // Getter for user data
  const getUser = computed(() => user.value)

  // Setter to update the user and persist in localStorage
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
