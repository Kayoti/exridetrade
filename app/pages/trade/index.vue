<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { object, string } from 'yup'
import FormWizard from '@/components/Form/FormWizard.vue'
import FormStep from '@/components/Form/FormStep.vue'

const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const links = computed(() => [{
  id: 1,
  completed: true,
  label: 'Vehicle Upload',
  to: '#vehicle',
  icon: 'i-heroicons-cube-transparent',
  active: false,
  description: 'Explore our core features'
}, {
  id: 2,
  completed: false,
  label: 'General Info',
  to: '#general',
  icon: 'i-heroicons-credit-card',
  active: true,
  description: 'Explore our core features'
}, {
  id: 3,
  completed: false,
  label: 'Lien',
  to: '#lien',
  icon: 'i-heroicons-academic-cap',
  active: activeHeadings.value.includes('lien'),
  description: 'Explore our core features'
}, {
  id: 4,
  completed: false,
  label: 'Asking Price',
  to: '#price',
  icon: 'i-heroicons-question-mark-circle',
  active: activeHeadings.value.includes('price'),
  description: 'Explore our core features'
}, {
  id: 5,
  completed: false,
  label: 'Photos Upload',
  to: '#photos',
  icon: 'i-heroicons-question-mark-circle',
  active: activeHeadings.value.includes('photos'),
  description: 'Explore our core features'
}, {
  id: 6,
  completed: false,
  label: 'Review',
  to: '#review',
  icon: 'i-heroicons-question-mark-circle',
  active: activeHeadings.value.includes('review'),
  description: 'Explore our core features'
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#vehicle'),
    document.querySelector('#general'),
    document.querySelector('#lien'),
    document.querySelector('#price'),
    document.querySelector('#photos'),
    document.querySelector('#review')
  ])
})

const state = reactive({
  email: undefined,
  name: undefined,
  password: undefined
})

const stepSchemas = [
  object({
    email: string().email('Invalid email').required('Required'),
    name: string().required('Required')
  }),
  object({
    password: string()
      .min(8, 'Must be at least 8 characters')
      .required('Required')
  }),
  object({
    favoriteDrink: string().required('Required')
  })
]

function onSubmit(formData) {
  console.log(JSON.stringify(formData, null, 2))
}
</script>

<template>
  <div>
    <ULandingSection>
      <div class="flex flex-col md:flex-row gap-6">
        <UCard class="relative min-w-[25%] pt-4">
          <ol class="space-y-4 w-full">
            <template
              v-for="(link, index) in links"
              :key="index"
            >
              <li>
                <a
                  :href="link.to"
                  class="block w-full"
                >
                  <div
                    class="w-full p-4 border rounded-lg transition-colors"
                    :class="[
                      link.completed ? 'text-green-700 border-green-300 bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400'
                      : link.active ? 'text-blue-700 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400'
                        : 'text-gray-900 bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                    ]"
                    role="alert"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <component
                          :is="link.icon"
                          class="w-5 h-5"
                          :class="[
                            link.completed ? 'text-green-500 dark:text-green-400'
                            : link.active ? 'text-blue-500 dark:text-blue-400'
                              : 'text-gray-500 dark:text-gray-400'
                          ]"
                        />
                        <div class="space-y-1">
                          <h3 class="font-medium">{{ link.label }}</h3>
                          <p class="text-sm text-gray-500 dark:text-gray-400">{{ link.description }}</p>
                        </div>
                      </div>
                      <!-- Checkmark for completed steps -->
                      <svg
                        v-if="link.completed"
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                      <!-- Arrow for active step -->
                      <svg
                        v-else-if="link.active"
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </template>
          </ol>
        </UCard>

        <!--        <UCard class="relative border-s border-gray-200 dark:border-gray-700 min-w-[25%] pt-4">
          <ol class="border-s">
            <template
              v-for="(link, index) in links"
              :key="index"
            >
              <li class="mb-12 ms-10 [&:last-child]:mb-0 [&:last-child]:after:hidden relative group">
                <a
                  :href="link.to"
                  class="block relative cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <span
                    class="absolute flex items-center justify-center w-10 h-10 rounded-full -start-14 ring-4 ring-white dark:ring-gray-900"
                    :class="link.active ? 'bg-green-200 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'"
                  >
                    <component
                      :is="link.icon"
                      class="w-5 h-5"
                      :class="link.active ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'"
                    />
                  </span>
                  <div class="space-y-2">
                    <h3
                      class="font-medium leading-tight text-lg"
                      :class="link.active ? 'text-green-500' : 'text-gray-500'"
                    >
                      {{ link.label }}
                    </h3>
                     <p class="text-sm text-gray-500 dark:text-gray-400">{{ link.description }}</p>
                  </div>
                </a>
              </li>
            </template>
          </ol>
        </UCard> -->

        <UCard class="flex justify-center items-center w-full ">
          <div class="w-full max-w-lg p-4">
            <FormWizard
              :validation-schema="stepSchemas"
              :state="state"
              @submit="onSubmit"
            >
              <FormStep>
                <UFormGroup
                  label="Email"
                  name="email"
                >
                  <UInput v-model="state.email" />
                </UFormGroup>

                <UFormGroup
                  label="name"
                  name="name"
                >
                  <UInput
                    v-model="state.name"
                    type="name"
                  />
                </UFormGroup>
              </FormStep>

              <FormStep>
                <UFormGroup
                  label="Password"
                  name="password"
                >
                  <UInput
                    v-model="state.password"
                    type="password"
                  />
                </UFormGroup>
              </FormStep>

              <FormStep>
                <Field
                  name="favoriteDrink"
                  as="select"
                >
                  <option>Select a drink</option>
                  <option value="coffee">
                    Coffee
                  </option>
                  <option value="tea">
                    Tea
                  </option>
                  <option value="soda">
                    Soda
                  </option>
                </Field>
                <ErrorMessage name="favoriteDrink" />
              </FormStep>
            </FormWizard>
          </div>
        </UCard>
      </div>
    </ULandingSection>
  </div>
</template>
