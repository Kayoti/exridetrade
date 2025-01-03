<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/authStore'

const { firebaseLogout } = useFirebaseAuth()
const isSignOutLoading = ref(false)
const store = useAppStore()
const lead = ref()
const router = useRouter()

const cta = {
  title: 'Add Vehicle',
  description: '',
  onClick: () => handleAddVehicle(),
  links: [
    {
      color: 'gray',
      icon: 'i-heroicons-plus-20-solid',
      size: 'xl',
      class: 'ml-8',
      variant: 'ghost'
    }
  ]
}

const handleLogout = () => {
  localStorage.removeItem('app_user')
  firebaseLogout()
  localStorage.removeItem('leadid')
  localStorage.removeItem('form')
  localStorage.removeItem('dataInfo')

  isSignOutLoading.value = true

  reloadNuxtApp({
    path: '/',
    ttl: 1000
  })
}

const handleAddVehicle = () => {
  router.push({ name: 'trade' })
}

onMounted(() => {
  lead.value = localStorage.getItem('leadid')
  store.$state.form = JSON.parse(localStorage.getItem('form') || '{}')
})
</script>

<template>
  <div>
    <ULandingSection>
      <div class="flex flex-col md:flex-row gap-6">
        <dl class="flex-1 max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
          <div class="flex flex-col pb-3">
            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
              FirstName
            </dt>
            <dd class="text-lg font-semibold">
              {{ store.$state.form.firstname || "-" }}
            </dd>
          </div>
          <div class="flex flex-col pb-3">
            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
              LastName
            </dt>
            <dd class="text-lg font-semibold">
              {{ store.$state.form.lastname || "-" }}
            </dd>
          </div>
          <div class="flex flex-col pt-3">
            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
              Phone number
            </dt>
            <dd class="text-lg font-semibold">
              {{ store.$state.form.phone ? `+${store.$state.form.phone}` : "-" }}
            </dd>
          </div>
          <div class="flex flex-col pb-3">
            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
              Email address
            </dt>
            <dd class="text-lg font-semibold">
              {{ store.$state.form.email || "-" }}
            </dd>
          </div>
          <div class="flex flex-col py-3 border-b border-gray-300 dark:border-gray-600">
            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
              Address
            </dt>
            <dd class="text-lg font-semibold">
              {{ store.$state.form.location || "-" }}
            </dd>
          </div>
          <UButton
            :loading="isSignOutLoading"
            class="border border-gray-400 text-black hover:bg-gray-100 focus:outline-none font-medium text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:outline-none bg-white w-full max-w-xs mt-4"
            @click="handleLogout()"
          >
            Sign Out
          </UButton>
        </dl>

        <ULandingCTA
          v-bind="cta"
          class="flex-1 bg-gray-100/50 dark:bg-gray-800/50 p-6"
        />
      </div>
    </ULandingSection>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}

.dark {
  .landing-grid {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
