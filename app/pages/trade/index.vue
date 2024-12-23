<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable @stylistic/spaced-comment -->
<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { object, string } from 'yup'
import FormWizard from '@/components/Form/FormWizard.vue'
import FormStep from '@/components/Form/FormStep.vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()
const years = ref([])
const make = ref([])
const model = ref([])
const apiToken = 'A1WFxpSVIyICJnEFncyWdjsnvVkxGmk5jvQ3Z5UdXCbHBY6nMYrjDOOXKqLc'

const makeurl = encodeURI('https://carmakemodeldb.com/api/v1/car-lists/get/all/makes?api_token=' + apiToken)
const modelurl = encodeURI('https://carmakemodeldb.com/api/v1/car-lists/get/all/models/')
const yearurl = encodeURI('https://carmakemodeldb.com/api/v1/car-lists/get/years/desc' + '?api_token=' + apiToken)

const vehicleDisplay = ref('')

const isError = ref(false)

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

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
]
const state = reactive({
  vehicle_vin: undefined
})

const stepSchemas = ref([
  object({
    vehicle_vin: string()
      .required('VIN is required')
      .length(17, 'VIN must be exactly 17 characters')
      .matches(/^[A-HJ-NPR-Z0-9]+$/, 'VIN can only contain alphanumeric characters excluding I, O, and Q')
  }),
  object({
    favoriteDrink: string().required('Required')
  })
])

function onSubmit(formData) {
  console.log(JSON.stringify(formData, null, 2))
}

const vehicleStepItems = [{
  key: 'vehicle_vin',
  label: 'Vin',
  description: ''
}, {
  key: 'manual',
  label: 'Manual',
  description: ''
}]

const handleVehicle = () => {
  isError.value = false
  store.$state.form.vehicle_info.model = ''
  store.$state.form.vehicle_info.make = ''
  store.$state.form.vehicle_info.year = ''
  vehicleDisplay.value = ''

  const formData = new FormData()
  formData.append('vinNumber', store.$state.form.vehicle_vin)
  formData.append('checkVin', true)

  console.log(formData)
  console.log(store.$state.form)
  if (store.$state.form.vehicle_vin.length === 17) {
    $fetch('https://exride.easypear.com/productProcess.php', {
      method: 'POST',
      body: formData
    }).then((resp) => {
      console.log(resp)
      const dataInfo = JSON.parse(resp).data
      localStorage.setItem('dataInfo', JSON.stringify(dataInfo))

      store.$state.form.vehicle_info.year = dataInfo.year
      store.$state.form.vehicle_info.make = dataInfo.make.toLowerCase().charAt(0).toUpperCase() + dataInfo.make.toLowerCase().slice(1)

      if (store.$state.form.vehicle_info.make) {
        nextTick(async () => {
          fillModel(store.$state.form.vehicle_info.make)
        })
      }

      store.$state.form.vehicle_info.model = dataInfo.model.toLowerCase()

      console.log(store)

      vehicleDisplay.value = dataInfo.year + ' ' + dataInfo.make + ' ' + store.$state.form.vehicle_info.model
    })
  }
}

const fillModel = (make) => {
  model.value = []

  if (make != '') {
    $fetch(modelurl + make + '?api_token=' + apiToken, {

      method: 'GET'
    }).then((response) => {
      console.log(response)
      Object.values(response).forEach(i => model.value.push(i.model))
      console.log(model)
    })
  }
}
await useFetch(yearurl).then((response) => {
  Object.values(response.data.value).forEach(i => years.value.push(i.year))
})

await useFetch(makeurl).then((response) => {
  // store.$state.form.vehicle_info.model = ''
  Object.values(response.data.value).forEach(i => make.value.push(i.make))
})

const onChangeMake = () => {
  // store.$state.form.vehicle_info.model = ''

  fillModel(store.$state.form.vehicle_info.make)
}

watch(() => [store.$state.form.vehicle_info, store.$state.form.vehicle_vin], () => {
  localStorage.setItem('form', JSON.stringify(store.$state.form))

  localStorage.setItem('dataInfo', JSON.stringify(store.$state.form.vehicle_info))
}, { deep: true })

const isFormNotEmpty = computed(() => {
  const year = store.$state.form.vehicle_info.year
  const make = store.$state.form.vehicle_info.make
  const model = store.$state.form.vehicle_info.model

  return year !== '' && make !== '' && model !== ''
})

onMounted(() => {
  console.log('**********g**************')
  if (store.$state.form.vehicle_vin.length === 17) {
    handleVehicle()
  }
  onChangeMake()
})

watch(
  () => store.$state.form.vehicle_vin,
  (_newValue, _oldValue) => {
    handleVehicle()
  }
)

watch(
  () => store.$state.form.vehicle_info.make,
  (_newValue, _oldValue) => {
    store.$state.form.vehicle_info.model = ''
    onChangeMake()
  }
)

watch(
  () => store.$state.form.vehicle_info.year,
  (_newValue, _oldValue) => {
    store.$state.form.vehicle_info.model = ''
    store.$state.form.vehicle_info.make = ''
    onChangeMake()
  }
)

const handleVehicleTab = (index) => {
  const item = vehicleStepItems[index]

  if (item.key === 'manual') {
    //@ts-ignore
    stepSchemas.value[0] = object({
      year: string().required('Year is required'),
      make: string().required('Make is required'),
      model: string().required('Model is required')
    })
  } else {
    //@ts-ignore
    stepSchemas.value[0] = object({
      vehicle_vin: string()
        .required('VIN is required')
        .length(17, 'VIN must be exactly 17 characters')
        .matches(/^[A-HJ-NPR-Z0-9]+$/, 'VIN can only contain alphanumeric characters excluding I, O, and Q')
    })
  }

  console.log(stepSchemas.value[0])
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
          <div class="flex items-center justify-center ">
            <FormWizard
              :validation-schema="stepSchemas"
              :state="store.$state.form"
              @submit="onSubmit"
            >
              <FormStep class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]">
                <div class="text-center">
                  <h2 class="font-bold text-2xl pb-5">
                    Vehicle Upload
                  </h2>
                </div>
                <UTabs
                  :items="vehicleStepItems"
                  class="w-full rounded-full"
                  @change="handleVehicleTab"
                >
                  <template #item="{ item }">
                    <div>
                      <div
                        v-if="item.key === 'vehicle_vin'"
                        class="space-y-3 flex flex-col items-center justify-center min-h-[300px]"
                      >
                        <UFormGroup name="vehicle_vin">
                          <UInput
                            v-model="store.$state.form.vehicle_vin"
                            size="xl"
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]"
                            placeholder="Enter VIN number"
                          />
                        </UFormGroup>
                        <UFormGroup name="vehicle_display">
                          <UInput
                            v-if="vehicleDisplay"
                            v-model="vehicleDisplay"
                            size="xl"
                            disabled
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]"
                            placeholder=""
                          />
                        </UFormGroup>
                      </div>
                      <div
                        v-else-if="item.key === 'manual'"
                        class="space-y-3 flex flex-col items-center justify-center min-h-[300px]"
                      >
                        <UFormGroup
                          size="xl"
                          name="year"
                          label="Select Year"
                        >
                          <USelectMenu
                            v-model="store.$state.form.vehicle_info.year"
                            placeholder="Select..."
                            :options="years"
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]"
                          />
                        </UFormGroup>
                        <UFormGroup
                          size="xl"
                          name="make"
                          label="Select Make"
                        >
                          <USelectMenu
                            v-model="store.$state.form.vehicle_info.make"
                            placeholder="Select..."
                            :options="make"
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]"
                          />
                        </UFormGroup>
                        <UFormGroup
                          size="xl"
                          name="model"
                          label="Select Model"
                        >
                          <USelectMenu
                            v-model="store.$state.form.vehicle_info.model"
                            :value="model"
                            placeholder="Select..."
                            :options="model"
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]"
                          />
                        </UFormGroup>
                      </div>
                    </div>
                  </template>
                </UTabs>
              </FormStep>

              <FormStep />

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
