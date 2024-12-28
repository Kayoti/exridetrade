import { useAuthStore } from '@/stores/authStore'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const authStore = useAuthStore()

    authStore.readAuthToken()

    const isAuthenticated = authStore.isAuthenticated
    console.log(isAuthenticated)

    if (!isAuthenticated && to.path !== '/') {
      return navigateTo('/')
    }
  }
})
