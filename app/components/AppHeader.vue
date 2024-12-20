<script setup lang="ts">
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
</script>

<template>
  <!--  <UHeader :links="links"> -->
  <UHeader>
    <template #logo>
      <img
        src="~assets/images/exride_logo.png"
        class="w-[10%] sm:w-[5%] md:w-[10%] lg:w-[10%] xl:w-[8%]"
        alt="Exride logo"
      >
      <!--      <UBadge label="SaaS" variant="subtle" class="mb-0.5" /> -->
    </template>

    <template #right>
      <UButton
        label="Dashboard"
        color="white"
        variant="ghost"
        trailing-icon=""
        class="hidden lg:flex bg-sky-400 border-0 border-sky-700 text-white hover:bg-sky-600 hover:border-sky-900"
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
