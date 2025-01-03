<template>
  <div id="main-container">
    <AppHeader id="app-header" />

    <UContainer>
      <div  class="min-h-screen flex flex-col">
        <slot />
      </div>
    </UContainer>

    <AppFooter id="app-footer" />
  </div>
</template>

<script setup lang="ts">
// Your setup script, if needed
</script>
