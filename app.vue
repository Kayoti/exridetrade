<template>
  <div>
    <NuxtLayout>
      <div class="w-full">
      <transition name="fade">
        <Login :key="step" v-if="step === 1" @next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Dashboard :key="step" v-if="step === 2" @next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step1 :key="step" v-show="step === 3" @Next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step2 :key="step" v-if="step === 4" @Next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step3 :key="step" v-if="step === 5" @Next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step4 :key="step" v-if="step === 6" @Next="Next" @Back="Back" />
      </transition>

      <transition name="fade">
        <Step5 :key="step" v-if="step === 7" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step6 :key="step" v-if="step === 8" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step7 :key="step" v-if="step === 9" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step8 :key="step" v-if="step === 10" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step9 :key="step" v-if="step === 11" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step10 :key="step" v-if="step === 12" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
      </transition>
      <transition name="fade">
        <Step11 :key="step" v-if="step === 13" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
      </transition>
      
      <!-- <Step1 v-if="step === 1" @Next="Next" @Back="Back"  />
                  <Step2 v-if="step === 2" @Next="Next" @Back="Back"  /> -->
    </div>
    <Footer />
    <CameraModal @finalImage="finalImage" ref="CameraModalRef" />
  </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Login from "@/components/login.vue"
import Dashboard from "@/components/dashboard.vue"
import Step1 from "@/components/steps/Step1.vue"
import Step2 from "@/components/steps/Step2.vue"
import Step3 from "@/components/steps/Step3.vue"
import Step4 from "@/components/steps/Step4.vue"

import Step5 from "@/components/photos/Step1.vue"
import Step6 from "@/components/photos/Step2.vue"
import Step7 from "@/components/photos/Step3.vue"
import Step8 from "@/components/photos/Step4.vue"
import Step9 from "@/components/photos/Step5.vue"
import Step10 from "@/components/photos/Step6.vue"
import Step11 from "@/components/photos/Step7.vue"
import CameraModal from "@/components/UI/CameraModal.vue";

import { useAuthStore } from '@/stores/authStore';

import { useAppStore } from '@/stores/app.js';

const store = useAppStore();
const step = ref(1);
const CameraModalRef = ref(null)
const Direction = useDirection();
const router = useRouter();
const animation = ref('animation-from-bottom')
const authStore = useAuthStore();
const imag = ref('');

// async function updateLead() {
//   const vtiger_data_update_lead = new URLSearchParams({
//     'recordId': localStorage.getItem('leadid'),
//     'cf_1960': store.$state.form.vehicle_vin ?? '',
//     'cf_1962': store.$state.form.replace_vehicle ?? '',
//     'cf_1964': store.$state.form.replace_vehicle_details ?? '',
//     'cf_1966': store.$state.form.vehicle_desc ?? '',
//     'cf_1910': store.$state.form.vehicle_info.year ?? '',
//     'cf_1912': store.$state.form.vehicle_info.make ?? '',
//     'cf_1914': store.$state.form.vehicle_info.model ?? '',
//     'cf_1920': store.$state.form.vehicle_info.mileage ?? '',
//     // 'cf_1268': store.$state.form.vehicle_info.mileage_unit ?? '',
//     'cf_1968': store.$state.form.vehicle_info.asking_price ?? '',
//     'cf_1970': store.$state.form.vehicle_condition.accidents ?? '',
//     'cf_1972': store.$state.form.vehicle_condition.damages ?? '',
//     'cf_1974': store.$state.form.vehicle_condition.damages_details ?? '',
//     'cf_1976': store.$state.form.vehicle_condition.lien ?? '',
//     'cf_1978': store.$state.form.vehicle_condition.lien_amount ?? '',
//     'cf_1980': store.$state.form.vehicle_condition.lender ?? '',

//   });

//   const vtiger_update_url = "https://exride.easypear.com/modules/Webforms/update_lead.php?" + vtiger_data_update_lead.toString();

//   await useFetch(vtiger_update_url, {
//     method: 'GET',
//   })
//     .then(response => {
//       console.log(response);
//       setTimeout(() => {
//         Next();
//       // router.push('/photos-upload')
//     }, 0)
//     })
// }

const Next = () => {
  if (step.value < 13) {
    if (step.value === 6 && localStorage.getItem('edit')) {
      step.value+=7;
      console.log(step.value)
    }else{
      step.value++;
      console.log(step.value)
    }


 
  }else{
    animation.value = "animation-from-top";
    Direction.value = 1;
  
   
  }
}
const Back = () => {

  if (step.value > 1) {
    step.value--;
    return;
  }
  animation.value = "animation-from-top";
  Direction.value = 0;
  setTimeout(() => {
    router.push('/')
  }, 0)
}

const openCameraModal = () => {
    console.log("hjj")
  CameraModalRef.value.Open();
}

  const finalImage = (canvas) => {
  console.log("enlarging text");
  console.log(canvas);
  imag.value = canvas;
};

const checkLead = async () => {
  // await useFetch('http://localhost/CAE-APP-V2/CaeApp/Controller/FileHandler/LeadDetails.php', {
  //   // headers:{
  //   //  'Content-Type': 'application/json',
  //   // },
  //   method: 'POST',
  //   body: JSON.stringify({
  //     leadid: parseInt(localStorage.getItem('leadid')),
  //   })
  // }).then((response) => {
    // console.log(JSON.parse(response.data.value));

    const driveiles = localStorage.getItem('drivefiles')
    const drivefiles =JSON.parse(driveiles);

    if (drivefiles) {
      // const drivefiles = JSON.parse(response.data.value).data['drivefiles'];
      // localStorage.setItem('drivefiles', JSON.stringify(drivefiles));

      if (drivefiles['car_side']) {
        step.value = 2;
        step.value++;
        if (drivefiles['car_back_angle']) {
          step.value++;
          if (drivefiles['car_front_angle']) {
            step.value++;
            if (drivefiles['car_seats']) {
              step.value++;
              if (drivefiles['car_dash']) {
                step.value++;
              }
            }
          }
        }
      }
    }
    console.log(step)

  // });
}



onMounted(() => {
  //returnFromNext 
  // if (router.currentRoute.value.query.returnFromNext) {
  //   step.value = 2;
  // }
  // if(!authStore.getUser){
  //   router.push('/login');
  // }

})


</script>
