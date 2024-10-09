<template>
    <div class="w-full h-full" style="background-color: white !important;">
  
      <!-- BEGINNING OF THE CONTAINER -->
      <div class=" w-full  h-full font-pnova relative bg-[#F9FAFB]">
        <!-- <div class=" w-[8px] h-full fixed left-0 top-0 bg-tertiary"></div> -->
         
        <div class=" w-full ">
          <Header />
          <div class=" w-full ">
  
  
            <div class="bg-[#FFF] w-full pt-20">
              <div class="grid grid-cols-1 md:grid-cols-2 max-w-[1200px] mx-auto pt-10 pb-10 gap-10 place-items-center">
                <div class="sm:text-center lg:text-left max-w-sm lg:max-w-lg lg:w-auto mx-auto lg:mx-0 pb-8">
                  <h1 class="text-5xl xl:text-6xl font-extrabold text-gray-900 text-center md:text-left">We Help Buy and Sell Cars Privately.</h1> 
                  <div class="flex flex-col md:flex-row mt-8 sm:max-w-lg sm:mx-auto text-center lg:mx-0 gap-4 text-base lg:text-lg font-bold">
                    <a class="flex flex-row items-center justify-center w-full flex-grow gap-3 mx-auto md:mx-0 px-5 text-white bg-red-600 rounded-3xl transition-all text-center" href=""><p class="py-1">BUY A CAR</p></a> 
                    <a class="flex flex-row items-center justify-center w-full gap-3 bg-[#2563EB] flex-grow text-white px-5 border border-transparent rounded-3xl transition-all text-center"><NuxtLink to="/login">SELL A CAR</NuxtLink></a></div> 
                    <div class="flex flex-row mt-4 w-full"><a href="" class="rounded-full text-center font-bold border-2 w-full py-1 border-[#2563EB] tracking-wider text-[#2563EB] hover:underline uppercase">Apply For Financing</a></div></div>
  
              
                <div class="hidden md:flex flex-col justify-center items-center h-[100%] ">
                  <img src="~assets/images/marketplace-hero.png" class="pt-16 w-full h-auto" alt="blue car">
                </div>
  
              </div>
            </div>
  
            <section class="justify-center flex flex-row px-4 md:px-8 mt-5">
              <div class="max-w-7xl w-full p-0 md:p-8 shadow-none md:shadow-md rounded-2xl border-none md:border">
                <div class="w-full py-2 md:py-4 z-30 flex">
                  <div class="w-full flex flex-row gap-1 md:gap-2 px-4 md:px-0">
                    <input type="text" placeholder="I'm looking for a new work truck under 50k..." class="w-[70vw] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"> 
                    <button class="btn border-0 bg-blue-600 rounded-lg p-2 sm:p-4 text-white flex flex-row">
                    
                  Smart Search
                    </button>
                  </div>
                </div> 
                <div class="grid grid-cols-2 px-4 md:px-0 md:flex md:flex-row gap-2" style="z-index: 2;" id="filter">
                  
                      <div class=" w-full h-min bg-black py-3 rounded-xl ">
                        <a href="" onclick="window.location.href='';" class="text-white ms-3 font-bold rounded-xl">MAKE
  
  </a>
                      </div>
  
                      <div class=" w-full h-min bg-black py-3 rounded-xl">
                        <a href="" onclick="window.location.href='';" class="text-white ms-3 font-bold rounded-xl">MODEL
  
  </a>
                      </div>
                   
                      <div class=" w-full h-min bg-black py-3 rounded-xl">
                        <a href="" onclick="window.location.href='/login/dashboard';" class="text-white ms-3 font-bold rounded-xl">YEAR
  
  </a>
                      </div>
  
                      <div class=" w-full h-min bg-black py-3 rounded-xl">
                        <a href="" onclick="window.location.href='/login/dashboard';" class=" text-white ms-3 font-bold rounded-xl">PRICE
  
  </a>
                      </div>
                      <div class=" w-full h-min bg-black py-3 rounded-xl ">
                        <a href="" onclick="window.location.href='/login/dashboard';" class="text-white ms-3 font-bold rounded-xl ">KILOMETERS
  
  </a>
                      </div>
                  
                </div>
              </div>
            </section>
  
            <section class="">
              <section class="py-16 mt-8 rounded-t-full bg-white" id="how-we-help">
                <h1 class="text-4xl md:text-7xl text-center px-24 font-extrabold text-gray-900 w-full pb-16 pt-8">How We Help</h1>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-6xl text-normal md:text-xl px-4 md:px-0">
                  <div class="p-8 border bg-white rounded-xl shadow-xl">
                    <div class="flex flex-row gap-5 items-center w-full">
                      <img src="~assets/images/profit.png" class="w-12 h-12" alt="Core services icon" style="object-fit: scale-down;"> 
                      <h3 class="font-bold text-xl">Maximize Your Vehicle Value</h3>
                    </div> 
                    <ul class="pt-5 list-disc flex flex-col gap-3 pl-6">
                      <li>Top Dollar for Your Car</li> 
                      <li>Verified Buyers Pool</li> 
                      <li>HST Trade-In Credits</li>
                    </ul>
                  </div> 
                  <div class="p-8 border bg-white rounded-xl shadow-xl">
                    <div class="flex flex-row gap-5 items-center w-full">
                      <img src="~assets/images/extra_services.png" class="w-12 h-12" alt="Extra services icon" style="object-fit: scale-down;"> 
                      <div>
                        <h3 class="font-bold text-xl">Dealer Power in Your Hands</h3>
                      </div>
                    </div> 
                    <ul class="pt-5 list-disc flex flex-col gap-3 pl-6">
                      <li>Major Banks Financing + Leasing</li> 
                      <li>Warranties and Protection Plans</li> 
                      <li>Registrations, Mechanical + Recon</li>
                    </ul>
                  </div> 
                  <div class="p-8 border bg-white rounded-xl shadow-xl">
                    <div class="flex flex-row gap-5 items-center w-full">
                      <img src="~assets/images/fraud.png" class="w-12 h-12" alt="Third-Party Services icon" style="object-fit: scale-down;"> 
                      <div>
                        <h3 class="font-bold text-xl">Stop Scammers and Fraud</h3>
                      </div>
                    </div> 
                    <ul class="pt-5 list-disc flex flex-col gap-3 pl-6">
                      <li>Verified Vehicle History</li> 
                      <li>Lien Searches + Payouts</li> 
                      <li>Verification of Funds</li>
                    </ul>
                  </div>
                </div>
              </section>
              <div class="hidden md:flex flex-col justify-center items-center bg-white"><img src="~assets/images/partner-logos.png" alt="" class="pt-4 pb-8 px-0 md:px-32 bg-white max-w-7xl"></div> 
            </section>
  
            <section class="my-16 px-4 mx-auto max-w-7xl">
              <div class="text-center mb-12">
                <h1 class="text-7xl font-extrabold text-gray-900 w-full">About Us</h1> 
                <p class="text-lg text-gray-900 max-w-[600px] mx-auto mt-4">ExRide helps private sellers sell or trade their cars. We market the
                  vehicles to our extensive nationwide buyer network and guarantee every
                  transaction by handling payments, registrations, liens, and tax
                  implications.
                </p>
              </div> 
              <div class="flex flex-row flex-wrap justify-center gap-4">
                <div class="space-x-4 mt-8 shadow-inner bg-white rounded-md max-w-sm lg:w-auto lg:mx-0 p-2 hover:-translate-x-2 hover:-translate-y-3 transition-all">
                  <div class="flex flex-row justify-center items-center space-x-2 border-b-2 border-slate-100 w-full py-2 px-4">
                    <img src="~assets/images/car-key.png" alt=""> 
                    <h3 class="font-bold text-gray-900 text-lg">Stress Free</h3>
                  </div> 
                  <div>
                    <p class="p-2">Selling a car privately has been a source of stress for much too
                      long. Nobody wants to meet strangers and negotiate uncertain deals.
                      In the absence of trust, private vehicle transactions can quickly
                      spiral out of hand and cost thousands of dollars. ExRide removes the
                      stress from private car sales by handling the entire transaction
                      with its the buyer-side uncertainties.
                    </p>
                  </div>
                </div> 
                <div class="space-x-4 mt-8 shadow-inner bg-white rounded-md max-w-sm lg:w-auto lg:mx-0 p-2 hover:-translate-x-2 hover:-translate-y-3 transition-all">
                  <div class="flex flex-row justify-center items-center space-x-2 border-b-2 border-slate-100 w-full py-2 px-4">
                    <img src="~assets/images/transparency.png" alt=""> 
                    <h3 class="font-bold text-gray-900 text-lg">Transparent</h3>
                  </div> 
                  <div>
                    <p class="p-2">Our process is simple and fully transparent. We offer your vehicle
                      to qualified buyers from around the country through an auction-based
                      system. We present you with the top offers, all you must do is
                      decide to accept or decline. ExRide guarantees every transaction by
                      handling disbursements, liens, registrations and other complexities.
                    </p>
                  </div>
                </div> 
                <div class="space-x-4 mt-8 shadow-inner bg-white rounded-md max-w-sm lg:w-auto lg:mx-0 p-2 hover:-translate-x-2 hover:-translate-y-3 transition-all">
                  <div class="flex flex-row justify-center items-center space-x-2 border-b-2 border-slate-100 w-full py-2 px-4">
                    <h3 class="font-bold text-gray-900 text-lg">Data Driven</h3>
                  </div> 
                  <div>
                    <p class="p-2">Information is the key to success in a modern marketplace. We
                      integrate relevant data sources to compile an accurate rendering of
                      today’s automotive marketplace. You can count of ExRide to deliver
                      unparalleled value when marketing your vehicle. ExRide is a
                      comprehensive system for selling vehicles safely and effectively.
                    </p>
                  </div>
                </div>
              </div>
            </section>
  
            <section id="faq" class="bg-[#0F2C64] pt-6 pb-32"><div class="flex flex-row flex-wrap items-center justify-center text-white max-w-7xl mx-auto gap-4"><h2 class="text-center text-3xl font-extrabold">Still have questions?</h2> <div class="mx-8 w-2/3 divide-y-2 divide-white-200"><dl class="mt-6 space-y-6 divide-y divide-white-200"><div class="pt-6"><dt class="text-lg"><button type="button" class="text-left w-full flex justify-between items-start text-white-400" aria-controls="faq-0" aria-expanded="false" id="question1"><span class="font-medium text-white-900 capitalize">I have a loan on my car, how does that work?</span> <span class="ml-6 h-7 flex items-center"><svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></span></button></dt> <dd class="mt-2 pr-12" id="faq-0"><p class="text-sm text-white-500 hidden" id="question1_ans">ExRide will pay off any existing loans on your vehicle with the
                  proceeds of sale. All the disbursements will be clearly outlined
                  on your offer presentation We handle all the lien release and
                  transfer documentation as well.</p></dd> </div><div class="pt-6"><dt class="text-lg"><button type="button" class="text-left w-full flex justify-between items-start text-white-400" aria-controls="faq-0" aria-expanded="false" id="question2"><span class="font-medium text-white-900 capitalize">My Car Has an Accident, Can I Still List it?</span> <span class="ml-6 h-7 flex items-center"><svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></span></button></dt> <dd class="mt-2 pr-12" id="faq-0"><p class="text-sm text-white-500 hidden" id="question2_ans">ExRide performs all history and title check and provides full
                  disclosure to the buyers. While accident do have an impact on
                  vehicle value, they can be easily sold via ExRide.</p></dd> </div><div class="pt-6"><dt class="text-lg"><button type="button" class="text-left w-full flex justify-between items-start text-white-400" aria-controls="faq-0" aria-expanded="false" id="question3"><span class="font-medium text-white-900 capitalize">How does ExRide make money?</span> <span class="ml-6 h-7 flex items-center"><svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></span></button></dt> <dd class="mt-2 pr-12" id="faq-0"><p class="text-sm text-white-500 hidden" id="question3_ans">ExRide's core functionality is 100% free, you can list, find
                  buyers, and sell your vehicle on our platform at no cost. Some
                  optional services such as vehicle pickup and delivery to buyers
                  are calculated based on the distance to our yard. Additionally,
                  we may get incentives from third-party service providers of
                  optional services such as lenders, warranty providers, etc.</p></dd> </div><div class="pt-6"><dt class="text-lg"><button type="button" class="text-left w-full flex justify-between items-start text-white-400" aria-controls="faq-0" aria-expanded="false"><span class="font-medium text-white-900 capitalize">More Questions?</span> <span class="ml-6 h-7 flex items-center"><svg class="rotate-0 h-6 w-6 transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></span></button></dt></div></dl></div></div></section>
  
  
                  <!-- <section class="p-4 pt-8 max-w-7xl mx-auto"><a id="contact"><h1 class="text-center text-5xl font-extrabold text-gray-900 w-full pb-8">Contact Us</h1></a> <div class="flex flex-col md:flex-row justify-start gap-4"><div class="rounded-lg border shadow"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.4514096060125!2d-79.5211971464827!3d43.617962780440934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b37e1672d510d%3A0x3fbd4771d4a02a7f!2sExRide%20Inc.!5e0!3m2!1sen!2sca!4v1711395118072!5m2!1sen!2sca" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="hidden md:block" style="border: 0px;"></iframe> <div class="pt-4 flex flex-row gap-4 p-3"><div class="flex flex-col md:flex-row items-center gap-2"><img src="/images/phone.png" alt=""> <p>416-529-3448</p></div> <div class="flex flex-col md:flex-row items-center gap-2"><img src="/images/email.png" alt=""> <p>hello@exride.com</p></div></div></div> <section class="w-full h-full"><div class="w-full max-w-md lg:max-w-lg"><form class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 border" method="POST" action="/api/vehicle-inquiry"><h3 class="w-full text-center text-2xl font-bold pb-4">Get in Touch</h3>  <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name*</label> <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" placeholder="Name" required=""></div> <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email*</label> <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="text" placeholder="Email" required=""></div> <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone</label> <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="phone" type="text" placeholder="Phone"></div> <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="comments">Message</label> <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="message" type="text" placeholder="Your question or message..."></textarea></div> <div class="flex items-center justify-between"><button class="bg-black mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline" type="submit">Send</button></div></form></div></section></div></section> -->
            
                  <footer><div class="max-w-7xl mx-auto pt-12 px-4 overflow-hidden sm:px-6 lg:px-8"><div class="flex flex-wrap items-center justify-between border-b-2 py-8">
                    <!-- <img class="hidden md:block h-8" src="../images/exride_08062023_g.png" alt=""> -->
                     <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer"><div class="px-5 py-2"><a href="" class="text-base text-gray-500 hover:text-gray-900">Dashboard</a></div> <div class="px-5 py-2"><a href="" class="text-base text-gray-500 hover:text-gray-900">Marketplace</a></div> <div class="px-5 py-2"><a href="/#contact" class="text-base text-gray-500 hover:text-gray-900">Contact Us</a></div></nav></div> <p class="mt-8 text-center text-base text-gray-800"><a href="">Terms of Services | Privacy Policy</a></p> <p class="text-center text-base text-gray-800">© 2022 Exride Inc. All Rights Reserved.</p></div></footer>
            
         
  
  
            
        </div>
       
        </div>
      </div>
       <!-- END OF THE CONTAINER -->
  
  
    </div>
  </template>
  
  <style scoped>
  body {
    background-color: white !important;
  }
  </style>

  <script setup lang="ts">
import Header from "@/components/Header.vue"
</script>
  

  