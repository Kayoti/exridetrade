<template>
  <div class="grid">
    <div id="default-carousel" class="relative w-full mb-6" data-carousel="slide">
      <!-- Carousel Container -->
      <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
        <!-- Loop through images in store -->
        <div v-for="(imageData, index) in imageList" :key="index" class="duration-700 ease-in-out"
          :class="{ 'hidden': index !== currentIndex }" data-carousel-item>
          <img :src="imageData" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            :alt="'Image ' + (index + 1)" />
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
      <div v-for="(imageData, index) in imageList" :key="'thumb-' + index" @click="currentIndex = index"
        class="relative cursor-pointer">
        <img :src="imageData" class="thumbnail" :alt="'Thumbnail ' + (index + 1)" />
        <div v-if="currentIndex === index"
          class="absolute inset-0 bg-blue-500 bg-opacity-50 flex justify-center items-center text-white rounded-lg text-sm">
          Selected
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';

const store = useAppStore();

// Extract images from the store state (base64 image data in this case)
const imageList = [
  store.$state.form.images.car_back_angle,
  store.$state.form.images.car_dash,
  store.$state.form.images.car_front_angle,
  store.$state.form.images.car_seats,
  store.$state.form.images.car_side,
];

// Track the current slide index
const currentIndex = ref(0);

// Navigate to the previous slide
const previousSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + imageList.length) % imageList.length;
};

// Navigate to the next slide
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % imageList.length;
};
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

