<template>
  <div class="w-full">
    <transition name="fade">
      <Step1 :key="step" v-show="step === 1" @Next="Next" @Back="Back" />
    </transition>
    <transition name="fade">
      <Step2 :key="step" v-show="step === 2" @Next="Next" @Back="Back" />
    </transition>
    <transition name="fade">
      <Step3 :key="step" v-show="step === 3" @Next="Next" @Back="Back" />
    </transition>
    <transition name="fade">
      <Step4 :key="step" v-show="step === 4" @Next="Next" @Back="Back" />
    </transition>
    <!-- <Step1 v-if="step === 1" @Next="Next" @Back="Back"  />
                <Step2 v-if="step === 2" @Next="Next" @Back="Back"  /> -->
  </div>
</template>

<script setup lang="ts">
import Step1 from "@/components/steps/Step1.vue"
import Step2 from "@/components/steps/Step2.vue"
import Step3 from "@/components/steps/Step3.vue"
import Step4 from "@/components/steps/Step4.vue"

import { useAppStore } from '@/stores/app.js';
const store = useAppStore();
const step = ref(1);
const Direction = useDirection();
const router = useRouter();
const animation = ref('animation-from-bottom')

async function updateLead() {
  const vtiger_data_update_lead = new URLSearchParams({
    'recordId': localStorage.getItem('leadid'),
    'cf_1960': store.$state.form.vehicle_vin ?? '',
    'cf_1962': store.$state.form.replace_vehicle ?? '',
    'cf_1964': store.$state.form.replace_vehicle_details ?? '',
    'cf_1966': store.$state.form.vehicle_desc ?? '',
    'cf_1910': store.$state.form.vehicle_info.year ?? '',
    'cf_1912': store.$state.form.vehicle_info.make ?? '',
    'cf_1914': store.$state.form.vehicle_info.model ?? '',
    'cf_1920': store.$state.form.vehicle_info.mileage ?? '',
    // 'cf_1268': store.$state.form.vehicle_info.mileage_unit ?? '',
    'cf_1968': store.$state.form.vehicle_info.asking_price ?? '',
    'cf_1970': store.$state.form.vehicle_condition.accidents ?? '',
    'cf_1972': store.$state.form.vehicle_condition.damages ?? '',
    'cf_1974': store.$state.form.vehicle_condition.damages_details ?? '',
    'cf_1976': store.$state.form.vehicle_condition.lien ?? '',
    'cf_1978': store.$state.form.vehicle_condition.lien_amount ?? '',
    'cf_1980': store.$state.form.vehicle_condition.lender ?? '',

  });

  const vtiger_update_url = "https://exride.easypear.com/modules/Webforms/update_lead.php?" + vtiger_data_update_lead.toString();

  await useFetch(vtiger_update_url, {
    method: 'GET',
  })
    .then(response => {
      console.log(response);
      setTimeout(() => {
      router.push('/photos-upload')
    }, 0)
    })
}

const Next = () => {
  if (step.value < 4) {
    step.value++;
    console.log(step.value)

  } else {
    animation.value = "animation-from-top";
    Direction.value = 1;
    updateLead();
   
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


onMounted(() => {
  //returnFromNext 
  if (router.currentRoute.value.query.returnFromNext) {
    step.value = 2;
  }

})


</script>