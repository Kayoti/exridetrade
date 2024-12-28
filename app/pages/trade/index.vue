<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable @stylistic/spaced-comment -->
<script setup lang="ts">
import { object, string, number } from 'yup'
import FormWizard from '@/components/Form/FormWizard.vue'
import FormStep from '@/components/Form/FormStep.vue'
import { useAppStore } from '@/stores/app'
import carSide from '~/assets/images/car_side.png'
import carBackAngle from '~/assets/images/car_back.png'
import carFrontAngle from '~/assets/images/car_front.png'
import carSeats from '~/assets/images/seat.png'
import carDash from '~/assets/images/dash.png'

const store = useAppStore()
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()
const years = ref([])
const make = ref([])
const model = ref([])
const formState = ref(store.$state.form)
const apiToken = 'A1WFxpSVIyICJnEFncyWdjsnvVkxGmk5jvQ3Z5UdXCbHBY6nMYrjDOOXKqLc'

const makeurl = encodeURI('https://carmakemodeldb.com/api/v1/car-lists/get/all/makes?api_token=' + apiToken)
const modelurl = encodeURI('https://carmakemodeldb.com/api/v1/car-lists/get/all/models/')
const yearurl = encodeURI('https://carmakemodeldb.com/api/v1/car-lists/get/years/desc' + '?api_token=' + apiToken)

const vehicleDisplay = ref('')

const imageLabels = {
  car_side: 'Upload side of vehicle (Driver)',
  car_back_angle: 'Upload back angle of vehicle',
  car_front_angle: 'Upload front angle of vehicle',
  car_seats: 'Upload seats and dash',
  car_dash: 'Upload dash with car on'
}

// Image imports for dynamic handling
const imageSources = {
  car_side: carSide,
  car_back_angle: carBackAngle,
  car_front_angle: carFrontAngle,
  car_seats: carSeats,
  car_dash: carDash
}

const isFormNotEmptyImageStep = computed(() => {
  return Object.values(store.$state.form.images).every(image => image !== '')
})

const handleFile = (event: Event, imageKey: string) => {
  const input = event.target as HTMLInputElement
  const file = input?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      store.$state.form.images[imageKey] = reader.result as string
      localStorage.setItem('form', JSON.stringify(store.$state.form))
    }
    reader.readAsDataURL(file)
  }
}

const handleDeleteImage = (key) => {
  if (store.$state.form.images[key]) {
    store.$state.form.images[key] = null
  }
}

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

console.log(activeHeadings.value)

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
    accidents: string().required('Vehicle condition is required'),
    replace_vehicle: string().required('Replace vehicle option is required'),
    replace_vehicle_details: string(), // Initially optional
    vehicle_desc: string().required('Vehicle description is required'),
    damages: string().required('Condition is required'),
    damages_details: string(), // Initially optional
    mileage: number()
      .required('Mileage is required')
      .typeError('Mileage must be a number')
      .positive('Mileage must be a positive number')
  }),
  object({
    lien: string().required()
    //  lender: string(),
    //  lien_amount: number()
  }),
  object({
    asking_price: number().required('Asking price is required').typeError('Asking price must be a number').positive('Asking price must be a positive number')
  }),
  object({
    car_side: string().required('Please upload the side image of the vehicle').test('not-placeholder', 'Please upload the correct image', function (value) {
      return value !== imageSources['car-side']
    }),
    car_back_angle: string().required('Please upload the back angle image of the vehicle').test('not-placeholder', 'Please upload the correct image', function (value) {
      return value !== imageSources['car-back-angle']
    }),
    car_front_angle: string().required('Please upload the front angle image of the vehicle').test('not-placeholder', 'Please upload the correct image', function (value) {
      return value !== imageSources['car-front-angle']
    }),
    car_seats: string().required('Please upload the seats and dash image').test('not-placeholder', 'Please upload the correct image', function (value) {
      return value !== imageSources['car-seats']
    }),
    car_dash: string().required('Please upload the dash image with car on').test('not-placeholder', 'Please upload the correct image', function (value) {
      return value !== imageSources['car-dash']
    })
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

const isAccidentsItems = [{
  key: 'No',
  label: 'No',
  description: ''
}, {
  key: 'Yes',
  label: 'Yes',
  description: ''
}]

const isDamagesItems = [{
  key: 'No',
  label: 'No',
  description: ''
}, {
  key: 'Yes',
  label: 'Yes',
  description: ''
}]

const isReplaceVehicleItems = [{
  key: 'No',
  label: 'No',
  description: ''
}, {
  key: 'Yes',
  label: 'Yes',
  description: ''
}]

const lienItems = [{
  key: 'No',
  label: 'No',
  description: ''
}, {
  key: 'Yes',
  label: 'Yes',
  description: ''
}]

const activeTab = ref(vehicleStepItems.findIndex(item => item.key === 'vehicle_vin'))
const replaceActiveTab = ref(isReplaceVehicleItems.findIndex(item => item.key === store.$state.form.replace_vehicle))
const damageActiveTab = ref(isReplaceVehicleItems.findIndex(item => item.key === store.$state.form.vehicle_condition.damages))
const accidentActiveTab = ref(isReplaceVehicleItems.findIndex(item => item.key === store.$state.form.vehicle_condition.accidents))
const lienActiveTab = ref(lienItems.findIndex(item => item.key === store.$state.form.vehicle_condition.lien))

watch(
  () => store.$state.form.vehicle_info_type,
  (newValue) => {
    const index = vehicleStepItems.findIndex(item => item.key === newValue)
    if (index !== -1) {
      activeTab.value = index
    }
  }
)

const handleReplaceVehicleTab = (selectedTab: { key: number }) => {
  //@ts-ignore
  if (selectedTab === 1) {
    store.$state.form.replace_vehicle = 'Yes'
  } else {
    store.$state.form.replace_vehicle = 'No'
  }

  updateValidationSchema()
}

const handleDamageVehicleTab = (selectedTab: { key: number }) => {
  //@ts-ignore
  if (selectedTab === 1) {
    store.$state.form.vehicle_condition.damages = 'Yes'
  } else {
    store.$state.form.vehicle_condition.damages = 'No'
  }
  updateValidationSchema()
}

const handleAccidentVehicleTab = (selectedTab: { key: number }) => {
  //@ts-ignore
  if (selectedTab === 1) {
    store.$state.form.vehicle_condition.accidents = 'Yes'
  } else {
    store.$state.form.vehicle_condition.accidents = 'No'
  }
}

const updateValidationSchema = () => {
  const currentSchema = stepSchemas.value[1]
  stepSchemas.value[1] = currentSchema.shape({
    replace_vehicle_details: store.$state.form.replace_vehicle === 'Yes'
      ? string().required('Vehicle details are required')
      : string(), // Optional if 'No'
    damages_details: store.$state.form.vehicle_condition.damages === 'Yes'
      ? string().required('Vehicle condition details are required')
      : string() // Optional if 'No'
  })

  console.log(currentSchema)
}

const handleLienTab = (selectedTab: { key: number }) => {
  //@ts-ignore
  if (selectedTab === 1) {
    console.log('*****8*888')
    store.$state.form.vehicle_condition.lien = 'Yes'
  } else {
    store.$state.form.vehicle_condition.lien = 'No'
  }

  const currentSchema = stepSchemas.value[2]

  stepSchemas.value[2] = currentSchema.shape({
    lien: string().required(),
    lender: store.$state.form.vehicle_condition.lien === 'Yes'
      ? string().required('Lender is required')
      : string(),
    lien_amount: store.$state.form.vehicle_condition.lien === 'Yes'
      ? number()
        .required('Lien amount is required')
        .typeError('Lien amount must be a number')
        .positive('Lien amount must be a positive number')
      : number()
  })

  console.log(stepSchemas.value[2])
}
const im = '~assets/images/car-side.png'
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
    formState.value = store.$state.form.vehicle_info
    //@ts-ignore
    stepSchemas.value[0] = object({
      year: string().required('Year is required'),
      make: string().required('Make is required'),
      model: string().required('Model is required')
    })
  } else {
    formState.value = store.$state.form
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
            <template v-for="(link, index) in links" :key="index">
              <li>
                <a :href="link.to" class="block w-full">
                  <div class="w-full p-4 border rounded-lg transition-colors" :class="[
                    link.completed ? 'text-green-700 border-green-300 bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400'
                      : link.active ? 'text-blue-700 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400'
                        : 'text-gray-900 bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                  ]" role="alert">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <component :is="link.icon" class="w-5 h-5" :class="[
                          link.completed ? 'text-green-500 dark:text-green-400'
                            : link.active ? 'text-blue-500 dark:text-blue-400'
                              : 'text-gray-500 dark:text-gray-400'
                        ]" />
                        <div class="space-y-1">
                          <h3 class="font-medium">{{ link.label }}</h3>
                          <p class="text-sm text-gray-500 dark:text-gray-400">{{ link.description }}</p>
                        </div>
                      </div>
                      <!-- Checkmark for completed steps -->
                      <svg v-if="link.completed" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 5.917 5.724 10.5 15 1.5" />
                      </svg>
                      <!-- Arrow for active step -->
                      <svg v-else-if="link.active" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9" />
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
            <FormWizard :validation-schema="stepSchemas" :state="store.$state.form" @submit="onSubmit">
              <FormStep class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[600px]">
                <div class="text-center">
                  <h2 class="font-bold text-2xl pb-5">
                    Vehicle Upload
                  </h2>
                </div>
                <UTabs v-model="activeTab" :items="vehicleStepItems" class="w-full rounded-full"
                  @change="handleVehicleTab">
                  <template #item="{ item }">
                    <div>
                      <div v-if="item.key === 'vehicle_vin'"
                        class="space-y-3 flex flex-col items-center justify-center min-h-[300px]">
                        <UFormGroup name="vehicle_vin">
                          <UInput v-model="store.$state.form.vehicle_vin" size="xl"
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]"
                            placeholder="Enter VIN number" />
                        </UFormGroup>
                        <UFormGroup name="vehicle_display">
                          <UInput v-if="vehicleDisplay" v-model="vehicleDisplay" size="xl" disabled
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]"
                            placeholder="" />
                        </UFormGroup>
                      </div>
                      <div v-else-if="item.key === 'manual'"
                        class="space-y-3 flex flex-col items-center justify-center min-h-[300px]">
                        <UFormGroup size="xl" name="year" label="Select Year">
                          <USelectMenu v-model="store.$state.form.vehicle_info.year" placeholder="Select..."
                            :options="years"
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]" />
                        </UFormGroup>
                        <UFormGroup size="xl" name="make" label="Select Make">
                          <USelectMenu v-model="store.$state.form.vehicle_info.make" placeholder="Select..."
                            :options="make"
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]" />
                        </UFormGroup>
                        <UFormGroup size="xl" name="model" label="Select Model">
                          <USelectMenu v-model="store.$state.form.vehicle_info.model" :value="model"
                            placeholder="Select..." :options="model"
                            class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[500px]" />
                        </UFormGroup>
                      </div>
                    </div>
                  </template>
                </UTabs>
              </FormStep>
              <FormStep>
                <div class="text-center">
                  <h2 class="font-bold text-2xl pb-5">
                    General Information
                  </h2>
                </div>

                <div class="space-y-3 flex flex-col items-center justify-center min-h-[300px]">
                  <UFormGroup size="xl" label="" hint="" description="" help="" name="mileage"
                    class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[650px] border rounded-lg p-2">
                    <template #label>
                      <div class="font-bold text-center mb-2">
                        Vehicle Mileage
                      </div>
                    </template>
                    <UInput v-model="store.$state.form.vehicle_info.mileage" placeholder="Mileage" type="number"
                      name="mileage" class=" no-arrows">
                      <template #trailing>
                        <p class="text-gray-500 dark:text-gray-400 text-xs">
                          Kilometers
                        </p>
                      </template>
                    </UInput>

                    <!---                    <UButtonGroup size="sm" orientation="horizontal">

                      <UButton icon="i-heroicons-clipboard-document" color="gray">Button</UButton>
                      <UInput />
                    </UButtonGroup> -->
                  </UFormGroup>

                  <UFormGroup size="xl" hint="" description="" help="" name="vehicle_desc"
                    class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[650px] border rounded-lg p-2">
                    <template #label>
                      <div class="font-bold text-center mb-2">
                        Vehicle description
                      </div>
                    </template>
                    <UTextarea v-model="store.$state.form.vehicle_desc" class="" :padded="false"
                      placeholder="Enter a brief description of your vehicle ...." variant="none" />
                  </UFormGroup>

                  <UFormGroup size="xl" hint="" description="" help="" name="accidents"
                    class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[650px] border rounded-lg p-2">
                    <template #label>
                      <div class="font-bold text-center mb-2">
                        Has this vehicle been in any accidents?
                      </div>
                    </template>

                    <UTabs v-model="accidentActiveTab" :items="isAccidentsItems" class="w-full"
                      @change="handleAccidentVehicleTab">
                      <template #item="{ item }">
                        <div v-if="item.key === 'No'" class="space-y-3" />
                        <div v-else-if="item.key === 'Yes'" class="space-y-3" />
                      </template>
                    </UTabs>
                  </UFormGroup>

                  <UFormGroup size="xl" hint="" description="" help="" name="damages_details"
                    class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[650px] border rounded-lg p-2">
                    <template #label>
                      <div class="font-bold text-center mb-2">
                        Does this vehicle have any damages?
                      </div>
                    </template>

                    <UTabs v-model="damageActiveTab" :items="isDamagesItems" class="w-full"
                      @change="handleDamageVehicleTab">
                      <template #item="{ item }">
                        <div v-if="item.key === 'No'" class="space-y-3" />
                        <div v-else-if="item.key === 'Yes'" class="space-y-3">
                          <UTextarea v-model="store.$state.form.vehicle_condition.damages_details" class=""
                            name="damages" :padded="false" placeholder="Describe damage ...." variant="none" />
                        </div>
                      </template>
                    </UTabs>
                  </UFormGroup>

                  <UFormGroup size="xl" hint="" description="" help="" name="replace_vehicle_details"
                    class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[650px] border rounded-lg p-2">
                    <template #label>
                      <div class=" font-bold text-center mb-2 w-full max-w-full text-ellipsis overflow-hidden">
                        Are You Looking to Replace Your Vehicle and Receive an HST Credit on Your Sale?
                      </div>
                    </template>

                    <UTabs v-model="replaceActiveTab" :items="isReplaceVehicleItems" class="w-full"
                      @change="handleReplaceVehicleTab">
                      <template #item="{ item }">
                        <div v-if="item.key === 'No'" class="space-y-3" />
                        <div v-else-if="item.key === 'Yes'" class="space-y-3">
                          <UTextarea v-model="store.$state.form.replace_vehicle_details" class="" :padded="false"
                            name="replace_vehicle" placeholder="Price range, make, model, etc ...." variant="none" />
                        </div>
                      </template>
                    </UTabs>
                  </UFormGroup>
                </div>
              </FormStep>
              <FormStep>
                <div class="text-center">
                  <h2 class="font-bold text-2xl">
                    Lien
                  </h2>
                </div>

                <div class="flex flex-col items-center justify-center min-h-[300px]">
                  <div class="font-bold text-center p-5">
                    Are there any liens against this vehicle?
                  </div>

                  <div
                    class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[650px] border rounded-lg p-2">
                    <UTabs v-model="lienActiveTab" :items="lienItems" class="w-full" @change="handleLienTab">
                      <template #item="{ item }">
                        <div v-if="item.key === 'No'" class="space-y-3 min-h-[150px]">
                          <div class="min-h-[100px]" />
                        </div>
                        <div v-else-if="item.key === 'Yes'" class="space-y-3 min-h-[150px]">
                          <UFormGroup name="lien_amount">
                            <UButtonGroup size="xl" orientation="horizontal"
                              class="w-full rounded-full border overflow-hidden">
                              <UButton color="gray"
                                class="text-mb font-bold text-gray-500 dark:text-gray-400 focus:ring-2 focus:ring-sky-500 px-5"
                                variant="ghost">
                                $CAD
                              </UButton>
                              <UInput v-model="store.$state.form.vehicle_condition.lien_amount" placeholder="5000"
                                type="number" variant="ghost"
                                class="w-full border-l border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none no-arrow" />
                            </UButtonGroup>
                          </UFormGroup>

                          <UFormGroup name="lender">
                            <UButtonGroup size="xl" orientation="horizontal"
                              class="w-full rounded-full border overflow-hidden">
                              <UButton color="gray"
                                class="text-mb font-bold text-gray-500 dark:text-gray-400 focus:ring-2 focus:ring-sky-500"
                                variant="ghost">
                                Lender
                              </UButton>
                              <UInput v-model="store.$state.form.vehicle_condition.lender" placeholder="BMO" type="text"
                                variant="ghost"
                                class="w-full border-l border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                            </UButtonGroup>
                          </UFormGroup>
                        </div>
                      </template>
                    </UTabs>
                  </div>
                </div>
              </FormStep>
              <FormStep>
                <div class="text-center">
                  <h2 class="font-bold text-2xl">
                    Asking Price
                  </h2>
                </div>

                <div class="flex flex-col items-center justify-center min-h-[300px]">
                  <div class="font-bold text-center space-y-2 mb-5">
                    <p>
                      We recommend a price between
                      <strong class="text-md text-sky-500">$5280</strong> and
                      <strong class="text-md text-sky-500">$8930</strong>
                    </p>
                    <p>
                      based on our market valuation, but you're free to set any price you wish.
                    </p>
                  </div>

                  <div
                    class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[650px] border rounded-lg p-2">
                    <UFormGroup name="asking_price">
                      <UButtonGroup size="xl" orientation="horizontal"
                        class="w-full rounded-full border overflow-hidden">
                        <UButton color="gray"
                          class="text-md font-bold text-gray-500 dark:text-gray-400 focus:ring-2 focus:ring-sky-500 px-5"
                          variant="ghost">
                          $
                        </UButton>
                        <UInput v-model="store.$state.form.vehicle_info.asking_price" placeholder="10000" type="number"
                          variant="ghost"
                          class="w-full border-l border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none no-arrow" />
                      </UButtonGroup>
                    </UFormGroup>

                    <UFormGroup name="range" label="Range">
                      <URange v-model="store.$state.form.vehicle_info.asking_price" :step="100" :min="3960"
                        :max="11162.5" />
                    </UFormGroup>
                  </div>
                </div>
              </FormStep>
              <FormStep>
                <div class="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] lg:min-w-[500px] xl:min-w-[650px] p-2">
                  <div class="mx-5">
                    <h2 class="text-2xl font-bold text-center w-full pb-4 pt-2">
                      Snapshots that sell
                    </h2>
                    <p class="pt-1 font-semibold text-sm pb-2 px-4">
                      Remember, a well-presented car is a dealer's
                      delight- the prettier
                      the picture, the bigger the bucks.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 m-6">

                    <div v-for="(label, key) in imageLabels" :key="key" class="p-3 rounded-xs border relative">
                      <p class="pt-1 text-center text-sm font-semibold pb-2 px-4">
                        {{ label }}
                      </p>

                      <label :for="key + '-file-input'" :class="{
                        'bg-white text-gray-500 font-semibold text-base rounded max-w-md flex flex-col items-center justify-center cursor-pointer mx-auto relative h-52': true,
                        'border border-gray-300 border-dashed': !store.$state.form.images[key]
                      }">
                        <!-- Delete Button -->
                        <button v-if="store.$state.form.images[key]"
                          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-md border border-white"
                          @click.prevent="handleDeleteImage(key)">
                          ✕
                        </button>

                        <!-- Image Preview: Fixed height for the image -->
                        <img v-if="store.$state.form.images[key]" :id="key" :src="store.$state.form.images[key]"
                          :alt="label" class="w-full h-40 object-cover">

                        <!-- Fallback Image if Not Uploaded -->
                        <img v-else :id="key" :src="imageSources[key]" :alt="label" class="w-full h-36 object-cover">

                        <!-- Image Edit/Add Text -->
                        <div class="flex flex-col items-center justify-center flex-grow pt-2">
                          <p v-if="store.$state.form.images[key]" class="text-sm font-semibold">
                            - EDIT IMAGE
                          </p>
                          <p v-else class="text-sm font-semibold">
                            + ADD IMAGE
                          </p>
                        </div>

                        <!-- File Input -->
                        <UFormGroup :name="key" class="px-2">
                          <input :id="key + '-file-input'" type="file" hidden @change="handleFile($event, key)">
                        </UFormGroup>

                        <!-- Allowed File Types Message -->
                        <div class="mb-3">
                          <p class="text-xs font-medium text-gray-400" v-if="!store.$state.form.images[key]">
                            PNG, JPG, and JPEG are allowed.
                          </p>
                        </div>
                      </label>
                    </div>




                  </div>
                </div>
              </FormStep>
              <FormStep>

<Preview></Preview>
              </FormStep>
            </FormWizard>
          </div>
        </UCard>
      </div>
    </ULandingSection>
  </div>
</template>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.no-arrows::-webkit-inner-spin-button,
.no-arrows::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.no-arrows {
  -moz-appearance: textfield;
}
</style>
