<template>
  <UForm
    :schema="currentSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <slot />

    <div>
      <UButton
        v-if="hasPrevious"
        type="button"
        class="border border-gray-400 text-black hover:bg-gray-100 focus:outline-none font-medium text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:outline-none bg-white w-full max-w-xs mt-4"
        @click="goToPrev"
      >
        Previous
      </UButton>

      <UButton
        type="submit"
        class="border border-gray-400 text-black hover:bg-gray-100 focus:outline-none font-medium text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:outline-none bg-white w-full max-w-xs mt-4"
      >
        {{ isLastStep ? 'Submit' : 'Next' }}
      </UButton>
    </div>

    <pre>{{ state }}</pre>
  </UForm>
</template>

<script setup lang="ts">
import { ref, computed, provide } from 'vue'

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true
  },
  state: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['submit'])
const currentStepIdx = ref(0)

// Injects the starting step, child <form-steps> will use this to generate their ids
const stepCounter = ref(0)
provide('STEP_COUNTER', stepCounter)

// Inject the live ref of the current index to child components
// will be used to toggle each form-step visibility
provide('CURRENT_STEP_INDEX', currentStepIdx)

// if this is the last step
const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1
})

// If the `previous` button should appear
const hasPrevious = computed(() => {
  return currentStepIdx.value > 0
})

// extracts the individual step schema
const currentSchema = computed(() => {
  console.log(currentStepIdx.value)
  console.log('schema=>', props.validationSchema)
  return props.validationSchema[currentStepIdx.value]
})

const onSubmit = () => {
  if (!isLastStep.value) {
    currentStepIdx.value++
    return
  }

  emit('submit', props.state)
}

function goToPrev() {
  if (currentStepIdx.value === 0) {
    return
  }

  currentStepIdx.value--
}
</script>
