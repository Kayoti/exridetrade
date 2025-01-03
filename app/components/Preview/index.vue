<template>
  <div class="grid">
    <div id="default-carousel" class="relative w-full mb-6" data-carousel="slide">
      <!-- Carousel Container -->
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <!-- Loop through images in store -->
        <div v-for="(imageData, index) in imageList" :key="index" class="duration-700 ease-in-out"
          :class="{ hidden: index !== currentIndex }" data-carousel-item>
          <img :src="imageData" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            :alt="'Image ' + (index + 1)">
        </div>
      </div>

      <!-- Carousel Indicators -->
      <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button v-for="(imageData, index) in imageList" :key="'indicator-' + index" type="button"
          class="w-3 h-3 rounded-full" :aria-current="currentIndex === index ? 'true' : 'false'"
          :aria-label="'Slide ' + (index + 1)" :data-carousel-slide-to="index" @click="currentIndex = index" />
      </div>

      <!-- Carousel Navigation -->
      <button type="button"
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev @click="previousSlide">
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 1 1 5l4 4" />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>

      <button type="button"
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next @click="nextSlide">
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>

    <!-- Image Thumbnails Below Carousel -->
    <div class="grid grid-cols-5 gap-4 mt-4">
      <div v-for="(imageData, index) in imageList" :key="'thumb-' + index" class="relative cursor-pointer"
        @click="currentIndex = index">
        <img :src="imageData" class="thumbnail" :alt="'Thumbnail ' + (index + 1)">
        <div v-if="currentIndex === index"
          class="absolute inset-0 bg-blue-500 bg-opacity-50 flex justify-center items-center text-white rounded-lg text-sm" />
      </div>
    </div>

    <div class="mt-8">
      <h2 class="font-bold text-xl">
        Preview Your Information Before Submission
      </h2>
    </div>

    <div class="items-start mt-8 rounded-lg border">
      <UAccordion size="xl" :items="items" :ui="{ wrapper: 'flex flex-col w-full p-2 b' }">
        <template #vehicle-info="{ item, index, open }">
          <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700  "
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
            <template #leading />

            <div class="mt-3 min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[800px]">
              <dl class="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div class="flex flex-col text-start pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Vehicle VIN
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleInfo.vehicle_vin || '' }}
                  </dd>
                </div>
                <div class="flex flex-col text-start py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Vehicle Description
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleInfo.vehicle_desc || '' }}
                  </dd>
                </div>
                <div class="flex flex-col text-start pt-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Asking Price
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleInfo?.asking_price || '' }}
                  </dd>
                </div>
                <div class="flex flex-col text-start py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Make
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleInfo?.make || '' }}
                  </dd>
                </div>
                <div class="flex flex-col text-start pt-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Mileage
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleInfo?.mileage || '' }} {{ vehicleInfo?.mileage_unit || ''
                    }}
                  </dd>
                </div>
                <div class="flex flex-col text-start py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Model
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleInfo?.model || '' }}
                  </dd>
                </div>
                <div class="flex flex-col text-start pt-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Options
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleInfo?.options.length > 0 ? vehicleInfo.options.join(', ')
                    : '' }}
                  </dd>
                </div>
                <div class="flex flex-col text-start py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Trim
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleInfo?.trim || '' }}
                  </dd>
                </div>
                <div class="flex flex-col text-start pt-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Year
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleInfo?.year || '' }}
                  </dd>
                </div>
              </dl>
            </div>

            <template #trailing />
          </UButton>
        </template>

        <template #vehicle-condition="{ item, index, open }">
          <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700"
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
            <div class="mt-3  min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[800px]">
              <dl class="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div class="flex flex-col text-start pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Has this vehicle been in any accidents?
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleCondition?.accidents || '' }}
                  </dd>
                </div>
                <div class="flex flex-col text-start py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Does this vehicle have any damages?
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleCondition?.damages || '' }}
                  </dd>
                </div>
                <div v-if="vehicleCondition?.damages === 'Yes'" class="flex flex-col text-start py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Damages Details
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleCondition?.damages_details || '' }}
                  </dd>
                </div>
                <div class="flex flex-col text-start py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Are there any liens against this vehicle?
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleCondition?.lien || '' }}
                  </dd>
                </div>
                <div v-if="vehicleCondition?.lien === 'Yes'" class="flex flex-col text-start py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Lien Lender
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleCondition?.lender || '' }}
                  </dd>
                </div>
                <div v-if="vehicleCondition?.lien === 'Yes'" class="flex flex-col text-start pt-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Lien Amount
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ vehicleCondition?.lien_amount || '' }}
                  </dd>
                </div>
              </dl>
            </div>
          </UButton>
        </template>

        <template #replacement-info="{ item, index, open }">
          <UButton color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700"
            :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
            <template #leading />

            <div class="mt-3 min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[800px]">
              <dl class="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div class="flex flex-col text-start pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Are you looking to replace your vehicle and receive HST credit on your sale?
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ replaceVehicleInfo.replace_vehicle || '' }}
                  </dd>
                </div>
                <div v-if="replaceVehicleInfo.replace_vehicle === 'Yes'" class="flex flex-col text-start py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Replace Vehicle Details
                  </dt>
                  <dd class="text-lg font-semibold">
                    {{ replaceVehicleInfo.replace_vehicle_details || '' }}
                  </dd>
                </div>
              </dl>
            </div>

            <template #trailing />
          </UButton>
        </template>
      </UAccordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/authStore'

const store = useAppStore()
const authStore = useAuthStore()

const userInfo = computed(() => ({
  email: store.$state.form.email || '',
  firstname: store.$state.form.firstname || '',
  lastname: store.$state.form.lastname || '',
  phone: store.$state.form.phone || ''
}))

const vehicleInfo = computed(() => ({
  ...store.$state.form.vehicle_info,
  vehicle_vin: store.$state.form.vehicle_vin || '',
  vehicle_desc: store.$state.form.vehicle_desc || ''
}))
const vehicleLocation = computed(() => store.$state.form.vehicle_location)
const vehicleCondition = computed(() => store.$state.form.vehicle_condition)
const replaceVehicleInfo = computed(() => ({
  replace_vehicle: store.$state.form.replace_vehicle || '',
  replace_vehicle_details: store.$state.form.replace_vehicle_details || ''
}))

const imageList = [
  store.$state.form.images.car_back_angle,
  store.$state.form.images.car_dash,
  store.$state.form.images.car_front_angle,
  store.$state.form.images.car_seats,
  store.$state.form.images.car_side
]

// Track the current slide index
const currentIndex = ref(0)

// Navigate to the previous slide
const previousSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + imageList.length) % imageList.length
}

// Navigate to the next slide
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % imageList.length
}

const items = [
  {
    label: 'Vehicle Information',
    icon: 'i-heroicons-exclamation-circle',
    defaultOpen: true,
    slot: 'vehicle-info',
    class: 'text-sky-500  bg-transparent border-none mb-2'
  },
  {
    label: 'Vehicle Condition',
    icon: 'i-heroicons-exclamation-circle',
    defaultOpen: false,
    slot: 'vehicle-condition',
    class: 'text-sky-500  bg-transparent border-none mb-2'
  },
  {
    label: 'Replacement Information',
    icon: 'i-heroicons-exclamation-circle',
    defaultOpen: false,
    slot: 'replacement-info',
    class: 'text-sky-500  bg-transparent border-none mb-2'
  }
]
</script>

<style scoped>
/* Style for Thumbnail Images */
.thumbnail {
  width: 100%;
  height: 100px;
  object-fit: cover;
  /* Ensure the image covers the area */
  border-radius: 0.375rem;
  /* rounded-lg equivalent */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover effect for thumbnails */
.thumbnail:hover {
  transform: scale(1.05);
  /* Slight zoom effect on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Style for selected thumbnail */
.selected-thumbnail {
  border: 2px solid #4A90E2;
  /* Blue border to indicate selection */
}

/* Styling for the "Selected" overlay on thumbnails */
.selected-thumbnail-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
