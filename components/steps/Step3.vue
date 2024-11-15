<template>
    <div class="w-full h-full" style="background-color: white !important;">
  
      <!-- BEGINNING OF THE CONTAINER -->

          <div class=" w-full flex justify-center items-center ">

            <div class="px-4 max-h-[80%] p-8 md:p-12 overflow-y-auto rounded-xl border border-2 md:max-w-3xl">
                <div class="p-2 w-full border border-black/20 rounded-2xl">
                    <h2 class="text-2xl font-bold text-center w-full pb-4 pt-2">Lien</h2> 
                    <p class="pt-1 text-center font-bold pb-2 px-4">Are there any liens against this vehicle?</p> 
                    <div class="flex flex-row content-center w-full justify-center px-2 pb-2">
                        <button class="rounded-l-xl w-full h-8 border border-black/20 hover:border-4"  :class="{'text-white bg-[#2563EB]':store.$state.form.vehicle_condition.lien==='No'}" @click="toggleFirstForm">No</button> 
                        <button class="rounded-r-xl w-full h-8 border border-black/20 hover:border-4" :class="{'text-white bg-[#2563EB]':store.$state.form.vehicle_condition.lien==='Yes'}" @click="toggleSecondForm">Yes</button>
                    </div> 
                    <div class="flex flex-row px-2 pt-2" v-show="store.$state.form.vehicle_condition.lien==='Yes'">
                        <p class="border border-black/20 pr-4 rounded-l-xl pl-4 py-2 h-min font-bold w-1/4">$CAD</p> 
                        <input class="pr-5 pl-2 py-2 rounded-r-xl border border-black/20 w-full" type="number" v-model="store.$state.form.vehicle_condition.lien_amount" placeholder="5000">
                    </div> 
                    <div class="flex flex-row pt-2 pb-2 px-2" v-show="store.$state.form.vehicle_condition.lien==='Yes'">
                        <p class="border border-black/20 rounded-l-xl pr-5 pl-4 py-2 h-min font-bold w-1/4">Lender</p> 
                        <input class="pr-5 pl-2 py-2 rounded-r-xl border border-black/20 w-full" type="text" v-model="store.$state.form.vehicle_condition.lender" placeholder="BMO">
                    </div>
                </div> 
                <div class="flex flex-row gap-2 w-full justify-center pt-8">
                    <button class="rounded-xl py-2 bg-[#2563EB] font-bold text-white px-5 w-full hover:bg-accent" @click="$emit('Back')">Back</button> 
                    <button class="rounded-xl py-2 bg-[#2563EB] font-bold text-white px-5 w-full hover:bg-accent" :disabled="!isFormNotEmpty" :class="{'bg-gray-200':!isFormNotEmpty,'bg-[#2563EB] hover:bg-[#2B9DD7]':isFormNotEmpty}"  @click="$emit('Next')">Next</button>
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

// const here = ref(1);
// const there = ref(0);

 const toggleFirstForm = () => {
  //  here.value=1;
  //  there.value=0;
   store.$state.form.vehicle_condition.lien = "No";
 }

 const toggleSecondForm = () => {
  //  there.value=1;
  //  here.value=0;
   store.$state.form.vehicle_condition.lien = "Yes";
 }

 watch(() => [store.$state.form.vehicle_condition.lien, store.$state.form.vehicle_condition.lien], () => {
    localStorage.setItem('form', JSON.stringify(store.$state.form))
 }, { deep: true })

const isFormNotEmpty = computed(() => {

return store.$state.form.vehicle_condition.lien !== '';

})
</script>