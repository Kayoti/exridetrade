<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div>
    <ULandingSection>
      <div class="flex flex-wrap gap-4 justify-center">
        <UCard class="w-full md:w-[35%]">
          <div class="flex flex-col justify-center items-center pt-2">
            <img src="~assets/images/exride_logo.png" class="w-[50%] sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[20%]"
              alt="Exride logo" />

            <h3 class="font-bold md:text-xl pt-1 text-center">
              Sign In or Create an Account
            </h3>
          </div>

          <div class="flex flex-col font-bold gap-4 text-sm justify-between py-6 md:py-16 p-4 md:p-8">
            <div class="flex items-center">
              <button
                class="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                +1
              </button>
              <div class="relative w-full">
                <input id="phone" type="tel"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your phone number" pattern="[\+]?[0-9]{1,4}?[0-9]{7,14}" required>
              </div>
            </div>

            <div class="flex items-center my-4">
              <hr class="flex-grow border-t border-gray-300">
              <span class="mx-2 text-sm text-gray-500">OR</span>
              <hr class="flex-grow border-t border-gray-300">
            </div>

            <button type="button"
              class="border border-gray-400 text-black hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:outline-none bg-white w-full max-w-xs">
              <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 19">
                <g fill="none" fill-rule="evenodd">
                  <path fill="#4285F4"
                    d="M17.64 9.204c0-.638-.057-1.252-.163-1.84H9v3.48h4.844a4.147 4.147 0 0 1-1.8 2.723v2.258h2.908c1.7-1.563 2.688-3.86 2.688-6.621Z" />
                  <path fill="#34A853"
                    d="M9 18c2.43 0 4.463-.808 5.951-2.188l-2.908-2.258c-.81.543-1.84.865-3.043.865a5.09 5.09 0 0 1-4.817-3.5H1.165v2.2A8.998 8.998 0 0 0 9 18Z" />
                  <path fill="#FBBC05"
                    d="M4.183 10.92A5.077 5.077 0 0 1 3.96 9.5c0-.503.087-.994.223-1.42V5.88H1.165A8.998 8.998 0 0 0 0 9.5c0 1.426.342 2.77.947 3.92l3.236-2.5Z" />
                  <path fill="#EA4335"
                    d="M9 3.579c1.32 0 2.504.455 3.438 1.346l2.577-2.577C13.46.808 11.43 0 9 0A8.998 8.998 0 0 0 1.165 5.88l3.236 2.5A5.09 5.09 0 0 1 9 3.579Z" />
                </g>
              </svg>
              Sign in with Google
            </button>

            <div class="pt-8 text-center text-sm">
              Your security is our priority at Exride.
              <br>Please enter your phone number to receive a one-time password for secure login or account creation.
              Alternatively, you can sign in using your Google account.
            </div>
          </div>
        </UCard>

        <UCard class="w-full md:w-[35%]">
          <div class="flex flex-col font-bold gap-4 text-sm justify-between py-6 md:py-16 p-4 md:p-8">
            <div class="flex flex-row items-center gap-3 md:gap-6">
              <img src="~assets/images/profit.png" style="height: 32px; width: 32px">
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
              <img src="~assets/images/extra_services.png" style="height: 32px; width: 32px">
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
              <img src="~assets/images/fraud.png" style="height: 32px; width: 32px">
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
      <div class="flex flex-row justify-center pb-8">
        <img src="~assets/images/partner-logos.png" alt="" class="max-w-xs md:max-w-3xl">
      </div>

      <!--      <div class="flex flex-row justify-center pb-8 animate-move-right-left">
        <img src="~assets/images/partner-logos.png" alt="" class="max-w-xs md:max-w-3xl">
      </div -->
    </ULandingSection>
  </div>
</template>
