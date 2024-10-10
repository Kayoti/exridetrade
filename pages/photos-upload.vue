<template>
    <div class="w-full">
               <transition name="fade">
                <Step1 :key="step" v-show="step === 1" @Next="Next" @Back="Back" />
              </transition>
              <transition name="fade">
                <Step2 :key="step" v-if="step === 2" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
              </transition>
              <transition name="fade">
                <Step3 :key="step" v-if="step === 3" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
              </transition>
              <transition name="fade">
                <Step4 :key="step" v-if="step === 4" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
              </transition>
              <transition name="fade">
                <Step5 :key="step" v-if="step === 5" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
              </transition>
              <transition name="fade">
                <Step6 :key="step" v-if="step === 6" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back" />
              </transition>
              <transition name="fade">
                <Step7 :key="step" v-show="step === 7" />
              </transition>
                
            </div>
            <CameraModal @finalImage="finalImage" ref="CameraModalRef" />
</template>

<script setup lang="ts">
  import Step1 from "@/components/photos/Step1.vue"
  import Step2 from "@/components/photos/Step2.vue"
  import Step3 from "@/components/photos/Step3.vue"
  import Step4 from "@/components/photos/Step4.vue"
  import Step5 from "@/components/photos/Step5.vue"
  import Step6 from "@/components/photos/Step6.vue"
  import Step7 from "@/components/photos/Step7.vue"
  import CameraModal from "@/components/UI/CameraModal.vue";
  import { useAuthStore } from '@/stores/authStore';

  import { useAppStore } from '@/stores/app.js';
  const store = useAppStore();
  const authStore = useAuthStore();
  const step = ref(1);
  const CameraModalRef = ref(null)
  const Direction = useDirection();
  const router = useRouter();
  const animation = ref('animation-from-bottom')
  const imag = ref('');

  const Next = () => {
    if(step.value < 6){
    step.value++;
    console.log(step.value)

   }else{
      animation.value = "animation-from-top";
      Direction.value = 1;
      setTimeout(()=>{
      router.push('/onboarding/vehicle-condition')
      },0)
   }
  }
  const Back = () => {

    if(step.value > 1) {
    step.value--;
    return;
   }
    animation.value = "animation-from-top";
   Direction.value = 0;
   setTimeout(()=>{
    router.push('/')
   },0)
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

// checkLead();

  onMounted(()=>{
    //returnFromNext 
    checkLead();
    // if(router.currentRoute.value.query.returnFromNext) {
    //   step.value = 2;
    // }

    if(!authStore.getUser){
    router.push('/login');
  }
  
  })


</script>