<template>
    <div class="w-full" style="background-color: white !important;">
  
      <!-- BEGINNING OF THE CONTAINER -->

          <div class=" w-full flex justify-center items-center ">

            <div class="px-4 max-h-[90%] p-8 md:p-12 overflow-y-auto rounded-xl border border-2 md:max-w-3xl">
                <div class="flex flex-col gap-2 w-full text-center">
                    <h2 class="text-2xl font-bold text-center w-full pb-8 ">General Information</h2> 
                    <div class="flex flex-row">
                        <p class="border border-black/20 rounded-l-xl pr-3 pl-4 py-2 h-min font-bold">Kilometers</p> 
                        <input class="pr-5 pl-2 py-2 rounded-r-xl border border-black/20 w-full" type="number" placeholder="120000" v-model="store.$state.form.vehicle_info.mileage">
                    </div> 
                        <div class="p-2 w-full border border-black/20 rounded-2xl">
                            <p class="pt-1 text-center font-bold">Vehicle Description</p> 
                            <textarea rows="2" class="mx-2 mt-4 rounded-lg whitespace-normal w-full pr-4" placeholder="Please enter a brief description of the vehicle..." v-model="store.$state.form.vehicle_desc" style="border: none; outline: none;"></textarea>
                        </div> 
                        <div class="p-2 w-full border border-black/20 rounded-2xl">
                            <p class="pt-1 text-center font-bold pb-2">Has this vehicle been in any accidents?</p> 
                            <div class="flex flex-row content-center w-full justify-center ">
                              <div @click="Selecta(item)" v-for="(item,index,key) in options" :key="key" :class="{'bg-[#2563EB]':store.$state.form.vehicle_condition.accidents === item.value,'bg-white':store.$state.form.vehicle_condition.accidents != item.value}" class="rounded-xl w-full h-8 border border-black/20">
                                  <div class=" flex flex-col items-center ">
                                      <!-- <img :src="store.$state.form.trade_in === item.value ? item.activeImage :item.unactiveImage" alt=""> -->
                                      <span class=" text-lg font-normal font-pnova " :class="{'text-white':store.$state.form.vehicle_condition.accidents === item.value,'text-black':store.$state.form.vehicle_condition.accidents != item.value}">{{item.title}}</span>
                                      <div>
                                          <input type="radio" :value="item.value" v-model="store.$state.form.vehicle_condition.accidents"  name="accidents" id=""  hidden>
                                      </div>
                                  </div>
                              </div>
                                <!-- <button class="rounded-l-xl w-full h-8 border border-black/20 hover:border-4 hover:bg-[#2563EB] hover:text-white" >No</button> 
                                <button class="rounded-r-xl w-full h-8 border border-black/20 hover:border-4 hover:bg-[#2563EB] hover:text-white" >Yes</button> -->
                            </div>
                        </div> 
                        <div class="p-2 w-full border border-black/20 rounded-2xl">
                            <p class="pt-1 text-center font-bold pb-2">Does this vehicle have any damages?</p> 
                            <div class="flex flex-row content-center w-full justify-center ">
                              <div @click="Selectd(item)" v-for="(item,index,key) in options" :key="key" :class="{'bg-[#2563EB]':store.$state.form.vehicle_condition.damages === item.value,'bg-white':store.$state.form.vehicle_condition.damages != item.value}" class="rounded-xl w-full h-8 border border-black/20">
                                  <div class=" flex flex-col items-center ">
                                      <!-- <img :src="store.$state.form.trade_in === item.value ? item.activeImage :item.unactiveImage" alt=""> -->
                                      <span class=" text-lg font-normal font-pnova " :class="{'text-white':store.$state.form.vehicle_condition.damages === item.value,'text-black':store.$state.form.vehicle_condition.damages != item.value}">{{item.title}}</span>
                                      <div>
                                          <input type="radio" :value="item.value" v-model="store.$state.form.vehicle_condition.damages"  name="damages" id=""  hidden>
                                      </div>
                                  </div>
                              </div>
                            </div> 

                            <textarea rows="2" class="mx-2 mt-4 rounded-lg w-full pr-4" placeholder="Describe the damage..." style="border: none; outline: none;" v-show="store.$state.form.vehicle_condition.damages==='Yes'" v-model="store.$state.form.vehicle_condition.damages_details"></textarea>
                        </div> 
                        <div class="p-4 w-full border border-black/20 rounded-2xl">
                            <p class="pt-1 text-center font-bold pb-2">Are You Looking to Replace Your Vehicle and Receive an HST Credit on Your Sale?</p> 
                            <div class="flex flex-row content-center w-full justify-center ">
                              <div @click="Selectr(item)" v-for="(item,index,key) in options" :key="key" :class="{'bg-[#2563EB]':store.$state.form.replace_vehicle === item.value,'bg-white':store.$state.form.replace_vehicle != item.value}" class="rounded-xl w-full h-8 border border-black/20">
                                  <div class=" flex flex-col items-center ">
                                      <!-- <img :src="store.$state.form.trade_in === item.value ? item.activeImage :item.unactiveImage" alt=""> -->
                                      <span class=" text-lg font-normal font-pnova " :class="{'text-white':store.$state.form.replace_vehicle === item.value,'text-black':store.$state.form.replace_vehicle != item.value}">{{item.title}}</span>
                                      <div>
                                          <input type="radio" :value="item.value" v-model="store.$state.form.replace_vehicle"  name="damages" id=""  hidden>
                                      </div>
                                  </div>
                              </div>
                            </div> 

                            <textarea rows="2" class="mx-2 mt-4 rounded-lg w-full pr-4" placeholder="Price range, make, model, etc..." style="border: none; outline: none;" v-show="store.$state.form.replace_vehicle==='Yes'" v-model="store.$state.form.replace_vehicle_details"></textarea>
                        </div> 
                        <div class="flex flex-row gap-2 w-full justify-center pt-4">
                            <button class="rounded-full py-3 text-white w-full" :disabled="!isFormNotEmpty" :class="{'bg-gray-200':!isFormNotEmpty,'bg-[#2563EB] hover:bg-[#2B9DD7]':isFormNotEmpty}" @click="$emit('Next')">Next</button>
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
import { useAppStore } from '@/stores/app';
const router = useRouter();

const store = useAppStore();


const options = ref([
{
            title:'No',
            value:'No',
        },
        {
            title:'Yes',
            value:'Yes',
        },
       

    ])


    const Selecta = (option) => {
      store.$state.form.vehicle_condition.accidents = option.value
      localStorage.setItem('form',JSON.stringify(store.$state.form))
    }

    const Selectd = (option) => {
      if(option.value==='No'){
        store.$state.form.vehicle_condition.damages_details=''
      }
      store.$state.form.vehicle_condition.damages = option.value
      localStorage.setItem('form',JSON.stringify(store.$state.form))
    }

    const Selectr = (option) => {
      if(option.value==='No'){
        store.$state.form.replace_vehicle_details=''
      }
      store.$state.form.replace_vehicle = option.value
      localStorage.setItem('form',JSON.stringify(store.$state.form))
    }

    watch(()=>[store.$state.form.vehicle_condition.accidents, store.$state.form.vehicle_condition.damages, store.$state.form.vehicle_condition.damages_details, store.$state.form.replace_vehicle,store.$state.form.replace_vehicle_details, store.$state.form.vehicle_desc, store.$state.form.vehicle_info.mileage],()=>{
       localStorage.setItem('form',JSON.stringify(store.$state.form))
   },{deep:true})

   const isFormNotEmpty = computed(() => {

    return store.$state.form.vehicle_condition.accidents !== '' && store.$state.form.vehicle_condition.damages !== '' && store.$state.form.replace_vehicle !== '' && store.$state.form.vehicle_desc !== '' && store.$state.form.vehicle_info.mileage !=='';

   })

</script>