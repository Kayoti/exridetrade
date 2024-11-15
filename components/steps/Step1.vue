<template>
  <div class="w-full h-full" style="background-color: white !important;">

    <!-- BEGINNING OF THE CONTAINER -->
   
      <!-- <div class=" w-[8px] h-full fixed left-0 top-0 bg-tertiary"></div> -->

        <div class=" w-full flex justify-center items-center  ">

          <div class="flex flex-col gap-4 w-full rounded-xl shadow-xl p-10">
            <h2 class="font-bold text-2xl pb-5 text-center"  >Vehicle Upload</h2> 
            <div class="mt-4 flex flex-row justify-center border rounded-full bg-gray-200">
              <button class="w-1/2 py-1 rounded-full text-white" :class="{'text-white bg-[#2563EB]':here}" @click="toggleFirstForm">VIN</button> 
              <button class="w-1/2 rounded-full" :class="{'text-white bg-[#2563EB]':there}" @click="toggleSecondForm">Manual</button>
            </div> 
            <input placeholder="Enter VIN number" type="text" class="rounded-full py-3 px-5 border border-black/20" 
            v-model="store.$state.form.vehicle_vin" v-show="here"  @input="getCarDetails()">
            
            <input type="text" class="rounded-full py-3 px-5 border border-black/20" 
            v-model="disp" v-show="disp && here" disabled>

            <!-- <input placeholder="Year" type="text" class="rounded-full py-3 px-5 border border-black/20" 
            options="years"  v-model="store.$state.form.vehicle_info.year" v-show="there"> -->

            <select class="rounded-full py-3 px-5 border border-black/20" 
                    v-model="store.$state.form.vehicle_info.year" 
                    v-show="there">
                <option value="" disabled>Select Year</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>

            <select class="rounded-full py-3 px-5 border border-black/20" 
            v-model="store.$state.form.vehicle_info.make" 
                    v-show="there" @change="onChangeMake()">
                <option value="" disabled>Select Make</option>
                <option v-for="make in make" :key="make" :value="make">{{ make }}</option>
            </select>

            <select class="rounded-full py-3 px-5 border border-black/20" 
            v-model="store.$state.form.vehicle_info.model" 
                    v-show="there">
                <option value="" disabled>Select Model</option>
                <option v-for="model in model" :key="model" :value="model.toLowerCase()">{{ model.toLowerCase() }}</option>
            </select>

            <button class="rounded-full py-3 text-white w-full" :disabled="!isFormNotEmpty" :class="{'bg-gray-200':!isFormNotEmpty,'bg-[#2563EB] hover:bg-[#2B9DD7]':isFormNotEmpty}" @click="$emit('Next')">Start Upload</button>
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
const here = ref(1);
const there = ref(0);
// const her = ref(false);

const apiToken = 'A1WFxpSVIyICJnEFncyWdjsnvVkxGmk5jvQ3Z5UdXCbHBY6nMYrjDOOXKqLc';

const typeurl = encodeURI("https://carmakemodeldb.com/api/v1/car-lists/get/drive-types/desc" + "?api_token=" + apiToken);
const bodyurl = encodeURI("https://carmakemodeldb.com/api/v1/car-lists/get/body-styles/desc" + "?api_token=" + apiToken);
var makeurl = encodeURI("https://carmakemodeldb.com/api/v1/car-lists/get/all/makes?api_token=" + apiToken);
var modelurl = encodeURI("https://carmakemodeldb.com/api/v1/car-lists/get/all/models/");
const yearurl = encodeURI("https://carmakemodeldb.com/api/v1/car-lists/get/years/desc" + "?api_token=" + apiToken);

const years = ref([]);
const make = ref([]);
const model = ref([]);

const disp = ref("");

const isError = ref(false);


const toggleFirstForm = () => {
 here.value=1;
 there.value=0;
}

const toggleSecondForm = () => {
 there.value=1;
 here.value=0;
}

//  const isVinNotEmpty = computed(() => {
//     return store.$state.form.vehicle_vin.length === 17;

//    })

const getCarDetails = () => {
 isError.value = false;
 store.$state.form.vehicle_info.model=''
 store.$state.form.vehicle_info.make=''
 store.$state.form.vehicle_info.year=''
 disp.value=""

 const formData = new FormData();
  formData.append('vinNumber', store.$state.form.vehicle_vin);
  formData.append('checkVin', true);

 if (store.$state.form.vehicle_vin.length === 17) {
  $fetch("https://exride.easypear.com/productProcess.php", {
    method: 'POST',
    body: formData,
  }).then( resp => {
    const dataInfo = JSON.parse(resp).data;
    localStorage.setItem("dataInfo", JSON.stringify(dataInfo));

    store.$state.form.vehicle_info.year = dataInfo.year;
    store.$state.form.vehicle_info.make = dataInfo.make.toLowerCase().charAt(0).toUpperCase() + dataInfo.make.toLowerCase().slice(1);

    if (store.$state.form.vehicle_info.make) {
    nextTick(async () => {
     fillModel(store.$state.form.vehicle_info.make);
    })
  }

    store.$state.form.vehicle_info.model = dataInfo.model.toLowerCase();

    console.log(store);

    disp.value =  dataInfo.year + ' ' + dataInfo.make + ' '+ store.$state.form.vehicle_info.model;
  });
 }
 }

 await useFetch(yearurl).then((response) => {
  Object.values(response.data.value).forEach(i => years.value.push(i.year))

})

await useFetch(makeurl).then((response) => {
  // store.$state.form.vehicle_info.model = ''
  Object.values(response.data.value).forEach(i => make.value.push(i.make))

})

 const fillModel = (make) => {
  model.value = [];

  if (make != '') {
               $fetch(modelurl + make + "?api_token=" + apiToken, {

              method: 'GET',
          }).then((response) => {
            console.log(response);
        Object.values(response).forEach(i => model.value.push(i.model))
        console.log(model);
     })
  }
}

const onChangeMake = () => {
  // store.$state.form.vehicle_info.model = ''

  fillModel(store.$state.form.vehicle_info.make)
}


watch(() => [store.$state.form.vehicle_info, store.$state.form.vehicle_vin], () => {
  localStorage.setItem('form', JSON.stringify(store.$state.form))

  localStorage.setItem("dataInfo", JSON.stringify(store.$state.form.vehicle_info));

}, { deep: true })

const isFormNotEmpty = computed(() => {
  const  year = store.$state.form.vehicle_info.year;
  const  make = store.$state.form.vehicle_info.make;
  const  model = store.$state.form.vehicle_info.model;
  
  return year !== '' && make !== '' && model !== '' ;

 })

 onMounted(() => {
  if (store.$state.form.vehicle_vin.length === 17) {
    getCarDetails()
  }
  onChangeMake()
 })
</script>