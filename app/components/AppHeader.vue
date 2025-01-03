<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const isAuthenticated = ref(false)
/** const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
 *
 * import type { NavItem } from '@nuxt/content'

const links = [{
  label: 'Docs',
  to: '/docs'
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
}] */

const handleDashboardRedirect = () => {
  router.push({ name: 'dashboard' })
}

onMounted(() => {
  if (authStore.getUser()) {
    isAuthenticated.value = true
  }
})
</script>

<template>
  <!--  <UHeader :links="links"> -->
  <UHeader>
    <template #logo>
      <img
        src="~assets/images/exride_logo.png"
        class="h-10"
        alt="Exride logo"
      >
      <!--      <UBadge label="SaaS" variant="subtle" class="mb-0.5" /> -->
    </template>

    <template #right>
      <UButton
      v-if="isAuthenticated"
        label="Dashboard"
        trailing-icon=""
        class=""
        @click="handleDashboardRedirect()"
      />
      <!--      <UButton label="Sign in" color="gray" to="/login" />
      <UButton label="Sign up" icon="i-heroicons-arrow-right-20-solid" trailing color="black" to="/signup"
        class="hidden lg:flex" /> -->
    </template>

    <!--    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
      />
    </template> -->
  </UHeader>
</template>
