<template>
  <div v-if="shouldShow" class="min-w-[380px] px-2 sm:min-w-[350px] md:min-w-[600px] lg:min-w-[600px] xl:min-w-[700px]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'

// This is a ref injected from FormWizard
const stepCounter = inject('STEP_COUNTER') as Ref<number>
const currentIdx = ref(stepCounter.value++)
// Grabs the live ref to the current form active step
const formStepIdx = inject('CURRENT_STEP_INDEX') as Ref<number>

// If this step should be shown
const shouldShow = computed(() => {
  return currentIdx.value === formStepIdx.value
})
</script>
