<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
const lead = ref()
const store = useAppStore()

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

onMounted(() => {
  lead.value = localStorage.getItem("leadid")
  store.$state.form = JSON.parse(localStorage.getItem("form") || '{}') // Parse the form data
})
</script>

<template>
  <div>
    <ULandingSection>

      <div class="flex flex-wrap gap-4 justify-center">
        <UCard class="w-full md:w-[30%] mx-auto p-6">
          <h2 class="text-xl font-semibold mb-4">Profile Information</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-700">Personal Information</h3>
              <p><strong>First Name:</strong> {{ store.$state.form.firstname }}</p>
              <p><strong>Last Name:</strong> {{ store.$state.form.lastname }}</p>
              <p><strong>Email:</strong> {{ store.$state.form.email }}</p>
              <p><strong>Phone:</strong> {{ store.$state.form.phone || '' }}</p>
              <p><strong>Address:</strong> {{ store.$state.form.vehicle_location?.street_number || '' }}, {{
                store.$state.form.vehicle_location?.city || '' }}</p>

            </div>


          </div>
        </UCard>

        <UCard class="w-full md:w-[60%] mx-auto p-6">
          <h2 class="text-xl font-semibold mb-4">Profile Information</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-700">Personal Information</h3>
              <p><strong>First Name:</strong> {{ store.$state.form.firstname }}</p>
              <p><strong>Last Name:</strong> {{ store.$state.form.lastname }}</p>
              <p><strong>Email:</strong> {{ store.$state.form.email }}</p>
              <p><strong>Phone:</strong> {{ store.$state.form.phone || '' }}</p>
              <p><strong>Address:</strong> {{ store.$state.form.vehicle_location?.street_number || '' }}, {{
                store.$state.form.vehicle_location?.city || '' }}</p>

            </div>


          </div>
        </UCard>
      </div>


    </ULandingSection>
  </div>
</template>
