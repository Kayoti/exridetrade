<template>
  <div class="fixed bg-gray-50 w-full mx-auto px-4 sm:px-6 -translate-y-6 py-6 pt-10 z-50 top-0" style="z-index: 50;">
    <nav class="relative mx-auto w-full flex items-start  sm:h-10 z-50" :class="logedin?'justify-between':'justify-start'"  aria-label="Global">
      <!-- Left: Logo -->
      <div class="flex">
        <a href="http://exride.ca">
          <img src="~assets/images/exride_logo.png" class="h-8" alt="ExRide Logo" >
        </a>  
      </div>

      <!-- Center: Navigation Links -->
      <!-- <div class="hidden md:flex md:space-x-10">
          <img src="~assets/images/exride_logo.png" class="h-8" alt="ExRide Logo">

        <a href="https://aaa.easypear.com/search/" class="relative font-bold text-black hover:text-gray-900 inline-block hover:before:absolute hover:before:left-0 hover:before:top-[-0.75rem] hover:before:h-[1px] hover:before:w-full hover:before:bg-[#2B9DD7]">Shop Cars</a>
        <a href="https://aaa.easypear.com/sell-trade-app/" class="relative font-bold text-black hover:text-gray-900 inline-block hover:before:absolute hover:before:left-0 hover:before:top-[-0.75rem] hover:before:h-[1px] hover:before:w-full hover:before:bg-[#2B9DD7]">Sell Cars</a>
        <a href="https://aaa.easypear.com/auto-finance-application/" class="relative font-bold text-black hover:text-gray-900 inline-block hover:before:absolute hover:before:left-0 hover:before:top-[-0.75rem] hover:before:h-[1px] hover:before:w-full hover:before:bg-[#2B9DD7]">Auto Financing</a>
        <div class="relative font-bold text-black hover:text-gray-900 inline-block hover:before:absolute hover:before:left-0 hover:before:top-[-0.75rem] hover:before:h-[1px] hover:before:w-full hover:before:bg-[#2B9DD7] group">
          <a href="https://aaa.easypear.com/about-us/" class="font-bold text-black hover:text-gray-900 flex items-center">Resources 
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </a>

          <div class="absolute left-0 mt-3 w-60 hidden bg-white shadow-lg group-hover:block rounded-lg divide-y">
            <a href="https://aaa.easypear.com/loan-calculator/" class="block px-4 py-2 text-gray-700 hover:text-[#2B9DD7]">Loan Calculator</a>
            <a href="https://aaa.easypear.com/faqs/" class="block px-4 py-2 text-gray-700 hover:text-[#2B9DD7]">FAQS</a>
            <a href="https://aaa.easypear.com/blog/" class="block px-4 py-2 text-gray-700 hover:text-[#2B9DD7]">News/Blogs</a>
          </div>
        </div>
        <div class="relative font-bold text-black hover:text-gray-900 inline-block hover:before:absolute hover:before:left-0 hover:before:top-[-0.75rem] hover:before:h-[1px] hover:before:w-full hover:before:bg-[#2B9DD7] group">
          <a href="https://aaa.easypear.com/about-us/" class="font-bold text-black hover:text-gray-900 flex items-center">Why ExRide 
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </a>
          
          <div class="absolute left-0 mt-3 w-60 hidden bg-white shadow-lg group-hover:block rounded-lg divide-y">
            <a href="https://aaa.easypear.com/about-us/" class="block px-4 py-2 text-gray-700 hover:text-[#2B9DD7]">About Us</a>
            <a href="https://aaa.easypear.com/contact-us/" class="block px-4 py-2 text-gray-700 hover:text-[#2B9DD7]">Contact</a>
          </div>
        </div>
      </div> -->

      <!-- Right: Log In/Register -->
      <!-- <div class="hidden md:flex items-center space-x- divide-x divide-black" v-show="!logedin">
       
        <a href="#" class="text-gray-700 hover:text-gray-900 me-2">Log in</a>
        <a href="#" class="text-gray-700 hover:text-gray-900 ms-">Register</a>
      </div> -->

      <div class="md:flex items-center space-x- divide-x divide-black" v-show="logedin">
        <!-- <i class="fa fa-user"></i> -->
        <p class="text-center hover:bg-[#fff] bg-[#0ea5e9] hover:text-[#0ea5e9] text-[#fff]  hover:outline hover:outline-[#0ea5e9] me-2 p-2 rounded-3xl cursor-pointer" @click="Dash()">Dashboard</p>
        
      </div>

      <!-- Mobile Menu Button -->
      <!-- <div class="md:hidden flex items-center">
        <button type="button" class="bg-gray-50 rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div> -->
    </nav>
  </div>
</template>

<script setup lang="ts">
import { reloadNuxtApp } from "nuxt/app";

const logedin = ref(false);
const router = useRouter();

const props = defineProps({
  Loading: {
    type: String,
    default: '',
  }
})
console.log(props)


const Dash = () => {

  reloadNuxtApp({
  path: "/",
  ttl: 1000, // default 10000
});
 }

onMounted(()=>{

if (localStorage.getItem("app_user")==="login") {
  logedin.value = true;
}

})
</script>

<style>
  /* Add necessary spacing and dropdown styling */
  .group:hover .group-hover\:block {
    display: block;
  }
  
</style>
