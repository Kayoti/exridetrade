<!-- eslint-disable no-constant-binary-expression -->
<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/authStore'

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

const store = useAppStore()
const authStore = useAuthStore()
const router = useRouter()
const emit = defineEmits(['next'])
const { signInWithGoogle, auth, onAuthStateChanged } = useFirebaseAuth()
const firebaseUser = ref()
const isLoading = ref(false)

const autocompleteOptions = ref({
  componentRestrictions: {
    country: ['CA']
  },
  strictBounds: true
})
const signup = ref(false)
const otpsent = ref(false)
const Name = ref(null)
const success = ref('')
const err = ref('')
const err1 = ref('')
const isGoogleAuth = ref(false)

const handleGoogleButton = async () => {
  console.log('&&&&&')
  try {
    isGoogleAuth.value = true
    await signInWithGoogle() // Call the Google sign-in function
  } catch (error) {
    console.error('Error during Google sign-in:', error)
  }
}

onMounted(() => onAuthStateChanged(auth, (user) => {
  console.log('*888888')
  if (user) {
    firebaseUser.value = user
    console.log('User logged in:', user)

    store.$state.form.email = user?.email
    store.$state.form.phone = user?.phoneNumber
    store.$state.form.mobile = user?.phoneNumber

    if (user?.displayName) {
      const nameParts = user.displayName.split(' ')

      store.$state.form.firstname = nameParts[0]

      store.$state.form.lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''
    } else {
      store.$state.form.firstname = ''

      store.$state.form.lastname = ''
    }

    checkLead()
  } else {
    console.log('No user is logged in')
  }
}))

watch(() => store.$state.form, () => {
  localStorage.setItem('form', JSON.stringify(store.$state.form))
}, { deep: true })

const setPlace = (addressData) => {
  const adr_data = addressData['address_components']
  for (let i = 0; i < adr_data.length; i++) {
    if (adr_data[i]['types'][0] === 'locality') {
      store.$state.form.vehicle_location.city = adr_data[i]['long_name']
    } else if (adr_data[i]['types'][0] === 'administrative_area_level_1') {
      store.$state.form.vehicle_location.prov = adr_data[i]['short_name']
    } else if (adr_data[i]['types'][0] === 'postal_code') {
      store.$state.form.vehicle_location.code = adr_data[i]['long_name']
    } else if (adr_data[i]['types'][0] === 'route') {
      store.$state.form.vehicle_location.route = adr_data[i]['long_name']
    } else if (adr_data[i]['types'][0] === 'street_number') {
      store.$state.form.vehicle_location.street_number = adr_data[i]['long_name']
    } else if (adr_data[i]['types'][0] === 'country') {
      store.$state.form.vehicle_location.country = adr_data[i]['short_name'] // or use 'short_name' if you prefer the country code
    }
  }
  Name.value = addressData['formatted_address']

  store.$state.form.vehicle_location.location = Name.value
  localStorage.setItem('form', JSON.stringify(store.$state.form))
  // console.log(Name);
}

async function sendOtp(checker, cody) {
  console.log(cody)

  const formData1 = new FormData()

  // localStorage.setItem("lead")

  formData1.append('smschecker', checker)
  formData1.append('smstoken', '9647')
  formData1.append('smscode', cody)
  formData1.append('smsphone', store.$state.form.phone)

  useFetch('https://exride.easypear.com/sms/otp.php', {
    // headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded' // Set the content type to 'application/x-www-form-urlencoded'.
    //         },
    method: 'POST',
    body: formData1
  }).then((response) => {
    otpsent.value = true
    console.log(response.data)
    try {
      if (JSON.parse(response.data.value) === 'pending') {
        success.value = 'We have sent a code to your phone +1' + store.$state.form.phone
        err.value = ''
        console.log(err)
      } else if (JSON.parse(response.data.value) === 'approved') {
        success.value = ''
        success.value = 'OTP code succefully verified!'
        err.value = ''
        checkLead()
      }
    } catch {
      success.value = ''
      err.value = ''
      err1.value = ''
      if (checker === 'create') {
        err.value = 'Error sending OTP. Please double check your information.'
      } else {
        err1.value = 'Error verifying OTP. Please double check your information.'
      }
      console.log(err)
    }
  })
}

async function checkLead() {
  const formData = new FormData()
  console.log(formData)
  if (store.$state.form.email) {
    formData.append('mode', 'getLeadByEmail')
    formData.append('email', store.$state.form.email)

    useFetch('https://exride.easypear.com/modules/TradeInPortal/process.php',
      {
        method: 'POST',
        body: formData
      }).then(async (response) => {
      console.log(JSON.parse(response.data.value).data)
      // localStorage.setItem("lead")

      if (!JSON.parse(response.data.value).data || JSON.parse(response.data.value).data.length === 0) {
        /** *        if (firebaseUser.value) {
          await createLead()

        } else {
          signup.value = true
        } */
        console.log('to signup email, firebase*************')
        signup.value = true
      } else {
        authStore.setUser('login')
        localStorage.setItem('app_user', 'login')
        localStorage.setItem('leadid', JSON.parse(response.data.value).data['leadid'])

        /// emit('next')
        console.log('success login email, firebase*************')
        router.push({ name: 'trade' })
        // signup.value = true
      }
    })
  } else if (store.$state.form.phone) {
    formData.append('mode', 'getLeadByPhone')
    formData.append('phone', store.$state.form.phone)

    useFetch('https://exride.easypear.com/modules/TradeInPortal/process.php',
      {
        method: 'POST',
        body: formData
      }).then((response) => {
      if (!JSON.parse(response.data.value).data || JSON.parse(response.data.value).data.length === 0) {
        signup.value = true
        console.log(signup)
      } else {
        authStore.setUser('login')
        localStorage.setItem('app_user', 'login')
        localStorage.setItem('leadid', JSON.parse(response.data.value).data['crmid'])

        router.push({ name: 'trade' })
      }
    })
  } else {
    console.log('Invalid user data')
  }
}

async function createLead() {
  isLoading.value = true
  const vtiger_data_seven_leads = new URLSearchParams({
    publicid: '5f7d449b3f5216d27c3a7aea6c70ecbe',
    name: 'Vehicle Sell',
    firstname: store.$state.form.firstname,
    lastname: store.$state.form.lastname,
    phone: store.$state.form.phone ?? '',
    mobile: store.$state.form.phone ?? '',
    email: store.$state.form.email ?? '',
    cf_939: store.$state.form.vehicle_location.location ?? '',
    city: store.$state.form.vehicle_location.city ?? '',
    state: store.$state.form.vehicle_location.prov ?? '',
    code: store.$state.form.vehicle_location.code ?? '',
    lane: store.$state.form.vehicle_location.street_number ?? '' + ' ' + store.$state.form.vehicle_location.route ?? '',
    country: store.$state.form.vehicle_location.country ?? '',
    cf_1684: store.$state.form.vehicle_location.prov ?? ''
  })

  const str = vtiger_data_seven_leads.toString()
  const vtiger_seven_url = 'https://exride.easypear.com/modules/Webforms/capture_test.php?' + str

  // if(!localStorage.getItem("leadid")){

  $fetch(vtiger_seven_url, {
    method: 'GET'
  })
    .then((response) => {
      isLoading.value = false
      console.log(response)
      // $response = Zend_Json::encode(array('success' => false, 'error' => array('message' => $failure)));

      localStorage.removeItem('leadid')
      localStorage.setItem('leadid', JSON.parse(response)['result'])
      authStore.setUser('login')
      localStorage.setItem('app_user', 'login')
      // emit('next')

      // TODO handle response before redirecting //i.e update php side
      router.push({ name: 'trade' })
    })
}

onMounted(() => {
  if (authStore.getUser) {
    /// console.log("auuu")
    // emit('next')
  }
})
</script>

<template>
  <div>
    <ULandingSection>
      <div
        v-if="!signup"
        class="flex flex-wrap gap-4 justify-center"
      >
        <UCard class="w-full md:w-[35%]">
          <div class="flex flex-col justify-center items-center pt-2">
            <img
              src="~assets/images/exride_logo.png"
              class="w-[50%] sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[20%]"
              alt="Exride logo"
            >

            <h3 class="font-bold md:text-xl pt-1 text-center">
              Sign In or Sign Up
            </h3>
          </div>

          <div class="flex flex-col font-bold gap-4 text-sm justify-between py-6 md:py-16 p-4 md:p-8">
            <UFormGroup
              size="xl"
              label="Phone Number"
              hint=""
              description=""
              help=""
            >
              <UInput
                v-model="store.$state.form.phone"
                placeholder="Phone"
                type="tel"
              >
                <template #leading>
                  <span class="text-gray-500 dark:text-gray-400 text-xm">+1</span>
                </template>
              </UInput>
            </UFormGroup>

            <div class="flex items-center my-4">
              <hr class="flex-grow border-t border-gray-300">
              <span class="mx-2 text-sm text-gray-500">OR</span>
              <hr class="flex-grow border-t border-gray-300">
            </div>

            <div class=" text-center">
              <UButton
                type="button"
                class="border border-gray-400 text-black hover:bg-gray-100 focus:outline-none font-medium  text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:outline-none bg-white w-full max-w-xs"
                @click="handleGoogleButton"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 19"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <path
                      fill="#4285F4"
                      d="M17.64 9.204c0-.638-.057-1.252-.163-1.84H9v3.48h4.844a4.147 4.147 0 0 1-1.8 2.723v2.258h2.908c1.7-1.563 2.688-3.86 2.688-6.621Z"
                    />
                    <path
                      fill="#34A853"
                      d="M9 18c2.43 0 4.463-.808 5.951-2.188l-2.908-2.258c-.81.543-1.84.865-3.043.865a5.09 5.09 0 0 1-4.817-3.5H1.165v2.2A8.998 8.998 0 0 0 9 18Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M4.183 10.92A5.077 5.077 0 0 1 3.96 9.5c0-.503.087-.994.223-1.42V5.88H1.165A8.998 8.998 0 0 0 0 9.5c0 1.426.342 2.77.947 3.92l3.236-2.5Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M9 3.579c1.32 0 2.504.455 3.438 1.346l2.577-2.577C13.46.808 11.43 0 9 0A8.998 8.998 0 0 0 1.165 5.88l3.236 2.5A5.09 5.09 0 0 1 9 3.579Z"
                    />
                  </g>
                </svg>
                Sign in with Google
              </UButton>
            </div>

            <div class="pt-8 text-center text-sm">
              Exride values your security.
              <br>
              Please enter your phone number or email to receive a one time password to login or sign-up.
            </div>
          </div>
        </UCard>

        <UCard class="w-full md:w-[35%]">
          <div class="flex flex-col font-bold gap-4 text-sm justify-between py-6 md:py-16 p-4 md:p-8">
            <div class="flex flex-row items-center gap-3 md:gap-6">
              <img
                src="~assets/images/profit.png"
                style="height: 32px; width: 32px"
              >
              <div>
                <p>Maximize Your Vehicle Value</p>
                <ul class="pt-1 font-normal text-normal list-disc flex flex-col gap-1 pl-6">
                  <li>Top Dollar for Your Car</li>
                  <li>Verified Buyers Pool</li>
                  <li>HST Trade-In Credits</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-row items-center gap-3 md:gap-6">
              <img
                src="~assets/images/extra_services.png"
                style="height: 32px; width: 32px"
              >
              <div>
                <p>Dealer Power in Your Hands</p>
                <ul class="pt-1 font-normal text-normal list-disc flex flex-col gap-1 pl-6">
                  <li>Major Banks Financing + Leasing</li>
                  <li>Warranties and Protection Plans</li>
                  <li>Registrations, Mechanical + Recon</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-row items-center gap-3 md:gap-6">
              <img
                src="~assets/images/fraud.png"
                style="height: 32px; width: 32px"
              >
              <div>
                <p>Stop Scammers and Fraud</p>
                <ul class="pt-1 font-normal text-normal list-disc flex flex-col gap-1 pl-6">
                  <li>Verified Vehicle History</li>
                  <li>Lien Searches + Payouts</li>
                  <li>Verification of Funds</li>
                </ul>
              </div>
            </div>
          </div>
        </UCard>
      </div>
      <div
        v-if="signup"
        class="flex flex-wrap gap-4 justify-center"
      >
        <UCard class="w-full md:w-[45%]">
          <div class="flex flex-col justify-center items-center pt-2">
            <img
              src="~assets/images/exride_logo.png"
              class="w-[50%] sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[20%]"
              alt="Exride logo"
            >

            <h3 class="font-bold md:text-xl pt-1 text-center">
              Sign In or Sign Up
            </h3>
          </div>

          <div class="flex flex-col font-bold gap-4 text-sm justify-between py-6 md:py-16 p-4 md:p-8">
            <UForm class="space-y-4">
              <UFormGroup
                size="xl"
                label="FirstName"
                name="firstname"
                eager-validation
              >
                <UInput
                  v-model="store.$state.form.firstname"
                  placeholder="FirstName"
                />
              </UFormGroup>

              <UFormGroup
                size="xl"
                label="LastName"
                name="lastname"
                eager-validation
              >
                <UInput
                  v-model="store.$state.form.lastname"
                  placeholder="LastName"
                />
              </UFormGroup>

              <UFormGroup
                size="xl"
                label="Phone Number"
                hint=""
                description=""
                help=""
              >
                <UInput
                  v-model="store.$state.form.phone"
                  placeholder="Phone"
                  type="tel"
                >
                  <template #leading>
                    <span class="text-gray-500 dark:text-gray-400 text-xm">+1</span>
                  </template>
                </UInput>
              </UFormGroup>

              <UFormGroup
                size="xl"
                label="Email"
                hint=""
                description=""
                help=""
              >
                <UInput
                  v-model="store.$state.form.email"
                  placeholder="you@example.com"
                  icon="i-heroicons-envelope"
                  type="email"
                />
              </UFormGroup>

              <!--           <GMapAutocomplete
                class="h-[50px]  w-full border border-gray-300 placeholder-gray-400 px-2 focus:ring-sky-500 focus:ring-2 outline-none"
                placeholder="Your Home Address" :value="Name" :options="autocompleteOptions"
                @place_changed="setPlace" /> -->
            </UForm>

            <div class=" text-center">
              <UButton
                :loading="isLoading"
                class="border border-gray-400 text-black hover:bg-gray-100 focus:outline-none font-medium  text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:outline-none bg-white w-full max-w-xs"
                @click="createLead()"
              >
                Continue
              </UButton>
            </div>

            <div class="pt-8 text-center text-sm">
              Exride values your security.
              <br>
              Please enter your phone number or email to receive a one time password to login or sign-up.
            </div>
          </div>
        </UCard>
      </div>

      <div class="flex flex-row justify-center pb-8">
        <img
          src="~assets/images/partner-logos.png"
          alt=""
          class="max-w-xs md:max-w-3xl"
        >
      </div>

      <!--      <div class="flex flex-row justify-center pb-8 animate-move-right-left">
        <img src="~assets/images/partner-logos.png" alt="" class="max-w-xs md:max-w-3xl">
      </div -->
    </ULandingSection>
  </div>
</template>
