<template>
  <UForm
    :schema="currentSchema"
    :state="flattenedData"
    class="space-y-4 text-center"
    @submit="onSubmit"
  >
    <slot />

    <div class="">
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

    <pre>{{ flattenedData }}</pre>
  </UForm>
</template>

<script setup lang="ts">
import { ref, computed, provide, watch } from 'vue'

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true
  },
  state: {
    type: Object,
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
interface Schema {
  _nodes: string[]
}

const currentSchema = computed<Schema>(() => {
  console.log(currentStepIdx.value)
  const schema = props.validationSchema[currentStepIdx.value] as Schema
  console.log('schema=>', schema)
  return schema
})

function flattenFormData(formData, schemaNodes) {
  console.log(schemaNodes)
  const flattenedData = {}

  function extractValues(data, path = '') {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const newPath = path ? `${path}.${key}` : key
        if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
          extractValues(data[key], newPath)
        } else {
          const lastKey = key
          if (schemaNodes?.includes(newPath) || schemaNodes?.includes(lastKey)) {
            flattenedData[lastKey] = data[key]
          }
        }
      }
    }
  }

  extractValues(formData)
  return flattenedData
}

const flattenedData = computed(() => {
  console.log(currentSchema.value)
  const schemaNodes = currentSchema.value?._nodes
  return flattenFormData(props.state, schemaNodes)
})

const onSubmit = () => {
  console.log('++++**', currentStepIdx.value)
  if (!isLastStep.value) {
    currentStepIdx.value++
    return
  }
  console.log('submit**')
  console.log(flattenedData.value)
  emit('submit', props.state)
}

function goToPrev() {
  if (currentStepIdx.value === 0) {
    return
  }

  currentStepIdx.value--
}

watch(currentStepIdx, () => {
  console.log('Current Step:', currentStepIdx.value)
  console.log('Flattened Data:', flattenedData.value)
})
</script>
