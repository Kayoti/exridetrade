<script setup lang="ts">
const links = [{
  label: '',
  children: [{
    label: 'About us',
    class: 'text-white'
  }, {
    label: 'Contact us',
    class: 'text-white'
  }, {
    label: 'Terms of use',
    class: 'text-white'
  }, {
    label: 'Privacy statement',
    class: 'text-white'
  }]
}, {
  label: '',
  children: [{
    label: 'Listings',
    class: 'text-white'
  }, {
    label: 'Loan Calculator',
    class: 'text-white'
  }]
} /** {
  label: 'Features',
  children: [{
    label: 'Affiliates'
  }, {
    label: 'Portal'
  }, {
    label: 'Jobs'
  }, {
    label: 'Sponsors'
  }]
}, */

]
</script>

<template>
  <UFooter class="bg-[#222732]">
    <template #top>
      <div class="flex justify-center mb-4">
        <img
          src="~assets/images/exride_logo_light.png"
          class="h-10"
          alt="ExRide Logo"
        >
      </div>
      <div class="text-center text-sm leading-relaxed text-white py-8">
        <p>
          ExRide helps private sellers sell or trade their cars. We market the vehicles
          to our extensive nationwide buyer network and guarantee every transaction
          by handling payments, registrations, liens, and tax implications.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
        <div
          v-for="category in links"
          :key="category.label"
        >
          <ul class="space-y-2 list-none">
            <li
              v-for="child in category.children"
              :key="child.label"
              :class="child.class || ''"
            >
              <a href="#">{{ child.label }}</a>
            </li>
          </ul>
        </div>

        <div class="text-center">
          <p class="font-bold text-4xl text-[#7cccf4]">
            416-529-3448
          </p>
          <p class="text-sm text-white">
            22 Evans Ave., Toronto, ON M8Z 1J8
          </p>
        </div>
      </div>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. AExRide Inc. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

      <!--      <UButton
        to="https://github.com/nuxt-ui-pro/saas"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      /> -->
    </template>
  </UFooter>
</template>
