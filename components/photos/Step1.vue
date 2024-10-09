<template>
    <div class="w-full h-full" style="background-color: white !important;">
  
  <!-- BEGINNING OF THE CONTAINER -->
  <div class=" w-full  h-full font-pnova relative ">
    <!-- <div class=" w-[8px] h-full fixed left-0 top-0 bg-tertiary"></div> -->
     
    <div class=" w-full ">
      <Header />
      <div class=" w-full flex justify-center items-center h-screen">

        <div class=" max-h-[90%] p-8 md:p-12 overflow-y-auto rounded-xl shadow-xl md:max-w-3xl">
            <h2 class="text-2xl font-bold text-center w-full pb-4 pt-2">Snapshots that sell: Update your Vehicle Listing</h2> 

            <div class=" w-full flex justify-center items-center">
                <img src="~assets/images/img-dash.jpg">
            </div>
            
            <p class="pt-1 text-center font-semibold pb-2 px-4">Remember, a well-presented car is a dealer's delight- the prettier the picture, the bigger the bucks.</p>
            <div class="flex flex-row gap-2 w-full justify-center pt-8">
                <!-- <button class="rounded-xl py-2 bg-[#2563EB] font-bold text-white px-5 w-full hover:bg-accent" @click="$emit('Back')">Back</button>  -->
                <button class="rounded-xl py-2 bg-[#2563EB] font-bold text-white px-5 w-full hover:bg-accent" @click="$emit('Next')">Continue</button>
            </div>
        </div>

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

const here = ref(1);
const there = ref(0);

 const toggleFirstForm = () => {
   here.value=1;
   there.value=0;
 }

 const toggleSecondForm = () => {
   there.value=1;
   here.value=0;
 }
</script>