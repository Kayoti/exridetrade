<template>
  <div class="w-full h-full border border-2 rounded-xl" style="background-color: white !important;">

    <!-- BEGINNING OF THE CONTAINER -->
     <div class="mx-5">
      <h2 class="text-2xl font-bold text-center w-full pb-4 pt-2">Snapshots that sell</h2>
    <p class="pt-1 font-semibold text-sm pb-2 px-4">Remember, a well-presented car is a dealer's delight- the prettier the picture, the bigger the bucks.</p>
     </div>
    


    <div class="grid grid-cols-1 md:grid-cols-2  gap-3 m-6">


          <div class="  p-3 rounded-xl border border-2">
        
            <p class="pt-1 text-center text-sm font-semibold pb-2 px-4">Upload side of vehicle(Driver)</p>


              <label for="side-btn"
      class="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
     
      <img v-if="store.$state.form.images.car_side" :src="store.$state.form.images.car_side" id="car-side"
                name="car_side" alt="" class="max-h-36">
              <img v-else src="~assets/images/car-side.png" id="car-side" alt="">
             
              <p v-if="store.$state.form.images.car_side">EDIT IMAGE</p>
              <p v-else>+ ADD IMAGE</p>

      <input type="file" id="side-btn" @change="handleFile($event, 'car-side')" hidden />
      <p class="text-xs font-medium text-gray-400 my-2">PNG, JPG and JPEG are Allowed.</p>
    </label>

          </div>

        <div class=" p-3 rounded-xl border border-2">

          <p class="pt-1 text-center text-sm font-semibold pb-2 px-4">Upload back angle of vehicle</p>

        

            <label for="back-btn"
      class="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
     
              <!-- <img src="~assets/images/car-side.png" class="max-w-48 mb-4"> -->
              <img v-if="store.$state.form.images.car_back_angle" :src="store.$state.form.images.car_back_angle" id="car-back-angle"
              name="car_back_angle" alt="" class="max-h-36">
            <img v-else src="~assets/images/car-back.png" id="car-back-angle" alt="">
             
            <p v-if="store.$state.form.images.car_back_angle">EDIT IMAGE</p>
            <p v-else>+ ADD IMAGE</p>

      <input type="file" id="back-btn" @change="handleFile($event, 'car-back-angle')" hidden />
      <p class="text-xs font-medium text-gray-400 my-2">PNG, JPG and JPEG are Allowed.</p>
    </label>

        </div>

        <div class="p-3 rounded-xl border border-2">
            <p class="pt-1 text-center text-sm font-semibold pb-2 px-4">Upload front angle of vehicle</p>

              <label for="front-btn"
      class="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
     
              <!-- <img src="~assets/images/car-side.png" class="max-w-48 mb-4"> -->
              <img v-if="store.$state.form.images.car_front_angle" :src="store.$state.form.images.car_front_angle" id="car-front-angle"
                name="car_front_angle" alt="" class="max-h-36">
              <img v-else src="~assets/images/car-back.png" id="car-front-angle" alt="">
             
      <p v-if="store.$state.form.images.car_front_angle">EDIT IMAGE</p>
      <p v-else>+ ADD IMAGE</p>

      <input type="file" id="front-btn" @change="handleFile($event, 'car-front-angle')" hidden />
      <p class="text-xs font-medium text-gray-400 my-2">PNG, JPG and JPEG are Allowed.</p>
    </label>


              

        </div>

        <div class="p-3 rounded-xl border border-2">
            <p class="pt-1 text-center text-sm font-semibold pb-2 px-4">Upload seats and dash</p>

            <label for="seats-btn"
      class="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
     
              <!-- <img src="~assets/images/car-side.png" class="max-w-48 mb-4"> -->
              <img v-if="store.$state.form.images.car_seats" :src="store.$state.form.images.car_seats" id="car-seats"
                name="car_seats" alt="" class="max-h-36">
              <img v-else src="~assets/images/seat.png" id="car-seats" alt="">
             
              <p v-if="store.$state.form.images.car_seats">EDIT IMAGE</p>
              <p v-else>+ ADD IMAGE</p>

      <input type="file" id="seats-btn" @change="handleFile($event, 'car-seats')" hidden />
      <p class="text-xs font-medium text-gray-400 my-2">PNG, JPG and JPEG are Allowed.</p>
    </label>

        </div>

        <div class="p-3 rounded-xl border border-2 ">
            <p class="pt-1 text-center text-sm font-semibold pb-2 px-4">Upload dash with car on</p>

            

              <label for="dash-btn"
      class="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
     
      <img v-if="store.$state.form.images.car_dash" :src="store.$state.form.images.car_dash" id="car-dash"
                name="car_dash" alt="" class="max-h-36">
              <img v-else src="~assets/images/dash.png" id="car-dash" alt="">
             
              <p v-if="store.$state.form.images.car_dash">EDIT IMAGE</p>
              <p v-else>+ ADD IMAGE</p>

      <input type="file" id="dash-btn" @change="handleFile($event, 'car-dash')" hidden />
      <p class="text-xs font-medium text-gray-400 my-2">PNG, JPG and JPEG are Allowed.</p>
    </label>

        </div>


    </div>
    
    <div class="flex justify-end m-4">
      <button class="rounded-xl py-2 bg-[#2563EB] font-bold text-white px-5 text-center hover:bg-accent w-40" :disabled="!isFormNotEmpty" :class="{'bg-gray-200':!isFormNotEmpty,'bg-[#2563EB] hover:bg-[#2B9DD7]':isFormNotEmpty}" @click="$emit('Next')">Next</button>
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
import axios from 'axios';
import Swal from 'sweetalert2';

const store = useAppStore();
const formData = new FormData();
const config = useRuntimeConfig();
const router = useRouter();
const emit = defineEmits(['Next']);

const props = defineProps({
  finalImage: {
    type: String,
    default: '',
  }
})

const { handleFile } = useUtils(emit);


const isFormNotEmpty = computed(() => {

return store.$state.form.images.car_side !== '' && store.$state.form.images.car_back_angle !== '' && store.$state.form.images.car_front_angle !== '' 
&& store.$state.form.images.car_seats !== '' && store.$state.form.images.car_dash !== '';

})


watch(
  () => props.finalImage, async () => {
    console.log(props.finalImage)
    const seatPic = document.getElementById("car-side");
    seatPic.setAttribute("src", props.finalImage);

    formData.append('car_side', props.finalImage);
    formData.append('leadid', localStorage.getItem('leadid'));

    store.$state.form.images.car_side = seatPic.src;
    localStorage.setItem('form', JSON.stringify(store.$state.form));

    // const response = await axios.post('https://exride.easypear.com/test_images.php', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // console.log(response.data);
    // if (response.data.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: 'Photo uploaded successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#E1251B',
      }).then((result) => {
        if (result.isConfirmed) {

          // const vtiger_data_update_lead = new URLSearchParams({
          //   'recordId': localStorage.getItem('leadid'),
          //   'drivefiles' : new URLSearchParams({
          //             "car_side" : response.data.resp["car_side"]
          //   })


          // });

          // const vtiger_update_url = "https://exride.easypear.com/modules/Webforms/update_lead.php?" + vtiger_data_update_lead.toString();

          // $fetch(vtiger_update_url, {

          //     method: 'GET',
          // })
          //   .then(response => {
          //     console.log(response);
          //     setTimeout(() => {
          //     router.push('/photos-upload')
          //   }, 0)
          //   })
          // Assuming "response.data.resp" contains the new data
          // const newDrivefile = {
          //   "car_side": response.data.resp["car_side"]
          // };

          // // Retrieve the existing object from localStorage (if it exists), or initialize an empty object
          // let drivefiles = JSON.parse(localStorage.getItem('drivefiles')) || {};

          // // Merge the new drivefile into the existing object
          // drivefiles = { ...drivefiles, ...newDrivefile };

          // // Store the updated object in localStorage as a JSON string
          // localStorage.setItem('drivefiles', JSON.stringify(drivefiles));

          // Redirect after saving
          // router.push('/photos-upload');

          // router.push('/');
          emit('Next');
          // window.location.reload();
        }
      })
    // }
  }
)

// const here = ref(1);
// const there = ref(0);

// const toggleFirstForm = () => {
//   here.value = 1;
//   there.value = 0;
// }

// const toggleSecondForm = () => {
//   there.value = 1;
//   here.value = 0;
// }
</script>