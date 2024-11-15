<template>
    <div class="w-full h-full" style="background-color: white !important;">
  
      <!-- BEGINNING OF THE CONTAINER -->
 
          <div class=" w-full flex justify-center items-center">

            <div class="px-4 max-h-[80%] p-8 md:p-12 overflow-y-auto rounded-xl border border-2 md:max-w-3xl">
                <div class="flex flex-col gap-2 md:w-64">
                    <h2 class="font-bold text-2xl pb-4 text-center">Asking Price</h2> 
                    <div class="px-3 py-2 pt-3 border border-black/20 rounded-xl" title="This is based on the market value of similar vehicles in your area.">
                        <p class="text-center pb-1 text-sm">We recommend a price between <br> <span class="font-bold text-xl">$5280</span>
                            and
                            <span class="font-bold text-xl">$8930</span>
                            based on our market valuation, but you're free to set any price you
                            wish.</p>
                    </div> 
                    <div class="flex flex-row ">
                        <p class="border border-black/20 rounded-l-xl pr-3 pl-4 py-2 h-min">$</p> 
                        <input class="pr-5 pl-2 py-2 rounded-r-xl border border-black/20" v-model="store.$state.form.vehicle_info.asking_price" placeholder="10000">
                    </div> 
                    <!-- <div class="hidden">[object Object]</div>  -->
                    <div class="flex flex-row content-center justify-center pt-6">
                        <input class="w-3/4" type="range" step="100" min="3960" max="11162.5" v-model="store.$state.form.vehicle_info.asking_price">
                    </div>
                </div> 
                <div class="flex flex-row gap-2 w-full justify-center pt-8">
                    <button class="rounded-xl py-2 bg-[#2563EB] font-bold text-white px-5 text-center hover:bg-accent w-full" @click="$emit('Back')">Back</button> 
                    <button class="rounded-xl py-2 bg-[#2563EB] font-bold text-white px-5 text-center hover:bg-accent w-full" :disabled="!isFormNotEmpty" :class="{'bg-gray-200':!isFormNotEmpty,'bg-[#2563EB] hover:bg-[#2B9DD7]':isFormNotEmpty}" @click="$emit('Next')">Next</button>
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

import { useAppStore } from '@/stores/app';
const router = useRouter();

const store = useAppStore();
const emit = defineEmits(['next']);

watch(() => [store.$state.form.vehicle_info.asking_price], () => {
    localStorage.setItem('form', JSON.stringify(store.$state.form))
 }, { deep: true })

const isFormNotEmpty = computed(() => {

return store.$state.form.vehicle_info.asking_price !== '';

})

// const stepUpload = () => {
//   if(localStorage.getItem('edit')){
//     emit('next');
//   }else
// }
</script>