<template>
    <div class="w-full h-full" style="background-color: white !important;">
  
  <!-- BEGINNING OF THE CONTAINER -->
  <div class=" w-full  h-full font-pnova relative ">
    <!-- <div class=" w-[8px] h-full fixed left-0 top-0 bg-tertiary"></div> -->
     
    <div class=" w-full ">
      <Header />
      <div class=" w-full flex justify-center items-center h-screen">

        <div class=" max-h-[90%] p-8 md:p-12 overflow-y-auto rounded-xl shadow-xl md:max-w-3xl mt-3">
            <h2 class="text-2xl font-bold text-center w-full pt-2">Upload or Take Photos</h2> 
            <h2 class="text-2xl font-bold text-center w-full pb-2">4 of 5</h2> 
            <p class="pt-1 text-center text-sm font-semibold pb-2 px-4">All photos below are required to continue forward.</p>
            <p class="pt-1 text-center text-sm font-semibold pb-2 px-4">Seats and Dash</p>

            <div
              class="flex flex-col items-center justify-center border border-black/20 rounded-xl w-80 max-w-lg mx-auto p-4">
              <!-- <img src="~assets/images/car-side.png" class="max-w-48 mb-4"> -->
              <img v-if="store.$state.form.images.car_seats" :src="store.$state.form.images.car_seats" id="car-seats"
                name="car_seats" alt="">
              <img v-else src="~assets/images/seat.png" id="car-seats" alt="">
              <div class="flex  gap-4 w-full items-center">


                <div class="rounded-xl py-2 bg-[#2563EB] font-bold text-white text-sm w-60 hover:bg-accent text-center">
                  <input type="file" id="seats-btn" @change="handleFile($event, 'car-seats')" hidden />
                  <label for="seats-btn">
                    <span class="mr-1"></span>Upload Photos</label>
                </div>


                <button @click="$emit('openCameraModal')"
                  class="rounded-xl py-2 bg-[#2563EB] font-bold text-white text-sm w-60 hover:bg-accent">
                  <span></span>
                  Take Photos
                </button>


               
              </div>
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


watch(
  () => props.finalImage, async () => {
    console.log(props.finalImage)
    const seatPic = document.getElementById("car-seats");
    seatPic.setAttribute("src", props.finalImage);

    formData.append('car_seats', props.finalImage);
    formData.append('leadid', localStorage.getItem('leadid'));

    store.$state.form.images.car_seats = seatPic.src;
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
          //   "car_seats": response.data.resp["car_seats"]
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
        }
      })
    }
  // }
)
</script>