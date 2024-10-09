<template>
    <div class="fixed bg-gray-50 w-full mx-auto px-4 sm:px-6 -translate-y-6 py-4 pt-10 z-50 top-0" style="z-index: 50;">
           <nav class="relative mx-auto w-full flex items-center justify-between sm:h-10 md:justify-center z-50" aria-label="Global">
             <div class="flex flex-row gap-2 z-50">
               <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                 <div class="flex items-center justify-between w-full md:w-auto">
                   <h3 class="font-bold text-black text-xl">
                     <a href="/" onclick="window.location.href='/';">
                       <img src="~assets/images/exride_logo.png" class="h-10" alt="">
                     </a>
                   </h3>
                 </div>
               </div>
             </div>
             <div class="hidden md:flex md:items-center md:space-x-10">
               <a href="" onclick="window.location.href='';" class="font-medium text-gray-500 hover:text-gray-900">Future Values</a> 
               <a href="/#how-we-help" class="font-medium text-gray-500 hover:text-gray-900 hidden xl:block">How We Help</a> 
               <a href="" onclick="window.location.href='';" class="font-medium text-gray-500 hover:text-gray-900">Financing</a> 
               <a href="/#contact" onclick="window.location.href='/#contact';" class="font-medium text-gray-500 hover:text-gray-900 hidden xl:block">Contact Us</a> 
               <a href="/#faq" onclick="window.location.href='/#faq';" class="font-medium text-gray-500 hover:text-gray-900 hidden xl:block">FAQ</a>
             </div> 
             <div class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
               <div class="flex flex-row items-center gap-4">
                 <a class="bg-[#2563EB] text-white px-6 py-2 border border-transparent text-base font-medium rounded-3xl"><NuxtLink to="/login">LOGIN</NuxtLink>
   
                 </a>
               </div>
             </div> 
             <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0 z-50">
               <div class="flex items-center justify-end w-full md:w-auto z-50">
                 <div class="flex items-center md:hidden z-50">
                   <button type="button" class="bg-gray-50 z-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false" id="mobile_menu_button">
                     <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                     </svg>
                   </button>
                 </div>
               </div>
             </div>
           </nav>
         </div>
</template>