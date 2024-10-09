<template>
  <!-- <div v-if="drivefiles['car_side']" class=" overflow-hidden shadow-lg bg-white border rounded-xl text-center  divide-y mt-5 max-w-[600px]">
    <p class="text-gray-800 p-10" >You have succesfully uploaded side view photo of vehicle.</p>
    <UIBaseButton @click="$emit('Next')" 
          class=" h- w- py-2 px-3 rounded-full  bg-[#E1251B] hover:bg-[#ec645d]  text-center text-sm text-white font-semibold border-primary  duration-300 mb-3">
          Continue</UIBaseButton>
  </div> -->
 
  <div  class=" overflow-hidden shadow-lg bg-white border rounded-xl text-center  divide-y mt-5 max-w-[600px]">
    <div class="bg-[#C0C1C2] w-full p-5 text-white flex justify-between font-semibold">
      <p class="text-xl">Upload side angle</p>
      <button class="text-[red] bg-[#fff] text-xs px-3 rounded-lg">Incomplete</button>
    </div>
    <div class="text-center px-9 pb-7">
      <h1 class="font-bold text-md p-5 mt-3 text-xl text-gray-700">
        Upload or Take Photos - 1 of 5
      </h1>

      <p class="text-gray-600 text-sm font-bold px-9 pb-5">
        All photos below are required to continue forward.
      </p>

      <h1 class="font-bold text-md  mt-3 text-gray-500">
        Side (Driver)
      </h1>

      <div class=" overflow-hidden border rounded-2xl border-current  max-w-[170px] mb-10 mx-auto pb-5">
        <div class="m-2">
          <img v-if="store.$state.form.images.car_side" :src="store.$state.form.images.car_side" id="car-side" name="car_side" alt="">
          <img v-else src="~assets/images/car-side.png" id="car-side" alt="">
        </div>

        <div class=" space-y-2 mt-5">

          <input type="file" id="side-btn" @change="handleFile($event, 'car-side')" hidden />
          <label for="side-btn">
            <span class="mr-1"><font-awesome-icon icon="fa fa-upload" /></span>Upload Photos</label>

          <UIBaseButton @click="$emit('openCameraModal')"
            class="py-2 px-3 rounded-full  bg-[#E1251B] text-center text-xs text-white font-semibold border-primary  duration-300">
            <span><font-awesome-icon icon="fa fa-camera" /></span>
            Take Photos
          </UIBaseButton>
        </div>


      </div>

      <div class=" ">
        <UIBaseButton @click="$emit('Back')"
          class=" text-white bg-[#6b6b6b]  py-2 px-3 mr-2 rounded-full text-sm font-bold border border-[#6b6b6b] hover:bg-tertiary  hover:border-tertiary">
          Back</UIBaseButton>
          <!-- <UIBaseButton @click="$emit('Next')" :disabled="!isFormNotEmpty" :class="{' bg-[#ea346680]':!isFormNotEmpty,'bg-[#E1251B] hover:bg-[#ec645d]':isFormNotEmpty}"
          class=" h- w- py-2 px-3 rounded-full   text-center text-sm text-white font-semibold border-primary  duration-300">
          Continue</UIBaseButton> -->
      </div>
    </div>

  </div>
</template>



<script setup>
import { useAppStore } from '@/stores/app';
import axios from 'axios';
import Swal from 'sweetalert2';

const store = useAppStore();
const formData = new FormData();
const config = useRuntimeConfig();
const router = useRouter();

const drivefiles = ref(null);

const props = defineProps({
  finalImage: {
    type: String,
    default: '',
  }
})

const { handleFile } = useUtils();
// const drivefiles =JSON.parse(localStorage.getItem('drivefiles'));

watch(
  () => props.finalImage, async () => {
    const seatPic = document.getElementById("car-side");
    seatPic.setAttribute("src", props.finalImage);

    formData.append('car_side', props.finalImage);
    formData.append('leadid', localStorage.getItem('leadid'));

    store.$state.form.images.car_seats = seatPic.src;
    localStorage.setItem('form', JSON.stringify(store.$state.form));

    const response = await axios.post('http://localhost/CAE-APP-V2/CaeApp/Controller/FileHandler/UploadCdn.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    if (response.data.status==='success') {
      Swal.fire({
        title: 'Success!',
        text: 'Photo uploaded successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#E1251B',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/');
          // window.location.reload();
        }
      })
    }
  }
)

const isFormNotEmpty = computed(() => {
  return store.$state.form.images.car_side !== ''
})

onMounted(() => {
  drivefiles.value = JSON.parse(localStorage.getItem('drivefiles'));
  // const frontPic = document.getElementById("car-front");
  //   frontPic.setAttribute("src", store.$state.form.trade_in_form.car_front??'~assets/images/car-front.png');
})
</script>

<style scoped>
label {
  background-color: #E1251B;
  color: white;
  padding: 0.6rem;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 6rem;
  cursor: pointer;
  margin-top: 1rem;
}
</style>

