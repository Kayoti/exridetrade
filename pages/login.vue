<template>
    
    <div class="w-full h-full" >
        <Header />
      <!-- BEGINNING OF THE CONTAINER -->
      <div class=" w-full  h-full font-pnova relative bg-[#FFF]">
        <!-- <div class=" w-[8px] h-full fixed left-0 top-0 bg-tertiary"></div> -->
        
            <div class=" w-full mt-32">

                <div class="flex flex-col-reverse gap-2 md:gap-8">
                    <div class="p-4 md:p-8 grid place-content-center w-full">
                        <h3 class="text-2xl md:text-5xl font-bold pb-8 flex flex-row items-center justify-center gap-8 w-full">
                            <p class="text-center">How Much is Your Vehicle Worth?</p>
                        </h3> 
                        <div class="rounded-xl flex flex-col md:flex-row gap-4 w-full">
                            <input placeholder="Enter your VIN number" type="text" class="rounded-full py-3 px-5 flex-grow border border-black/20 shadow-xl w-full"> 
                            <button class="rounded-full px-4 py-3 bg-[#2563EB] text-white font-bold shadow-xl hover:-translate-x-0.5 hover:-translate-y-1 transition-all duration-200">Calculate</button>
                        </div> 
                    </div>

                    <div class="flex flex-col md:flex-row gap-8 justify-start md:justify-center">
                        <div class="p-8 border border-black/20 rounded-xl md:w-fit md:max-w-sm ">
                            <div class="flex flex-col justify-center items-center pt-2" style="">
                                <img src="~assets/images/exride_logo.png" alt="exride logo" style="width: 50%;"> 
                                <h3 class="font-bold md:text-xl pt-1 text-center">Login or Sign-Up</h3>
                            </div> 
                            <div class="mt-4 flex flex-row justify-center border rounded-full bg-gray-200">
                                <button class="w-1/2 rounded-full " :class="{'text-white bg-[#2563EB]':here}" @click="toggleFirstForm">Phone</button> 
                                <button class="w-1/2 py-1 rounded-full" :class="{'text-white bg-[#2563EB]':there}" @click="toggleSecondForm">Email</button>
                            </div> 
                            <div class="flex flex-col md:flex-row gap-4 pt-4 md:pt-4">
                                <input placeholder="Enter your email" type="email" class="rounded-full py-3 px-5 border border-black/20 flex-grow" v-model="store.$state.form.email" v-show="there">
                                <input placeholder="Enter your phone number" type="number" class="rounded-full py-3 px-5 border border-black/20 flex-grow" v-model="store.$state.form.phone" v-show="here"> 
                                <button class="rounded-full text text-white px-4 text-center hover:bg-accent py-2" 
                                :disabled="!isFormNotEmpty && (!isValidEmail || !isValidPhoneNumber)" :class="{'bg-gray-200':!isFormNotEmpty && (!isValidEmail || !isValidPhoneNumber),'bg-[#2563EB] hover:bg-[#2B9DD7]':isFormNotEmpty && (isValidEmail || isValidPhoneNumber)}" @click="createLead()">
                                    <p class="">Next</p>
                                </button>
                            </div>  
                            <div class="pt-8">Exride values your security. 
                                <br> <br>Please enter your
                                phone number or email to receive a one time password to login or
                                sign-up.
                            </div>
                        </div> 
                        <div class="flex flex-col font-bold gap-4 divide-solid text-sm md:text-base justify-between py-6 md:py-16 p-4 md:p-8 border border-black/20 rounded-xl md:max-w-sm">
                            <div class="flex flex-row items-center gap-3 md:gap-6">
                                <img src="~assets/images/profit.png" style="height: 32px; width: 32px"> 
                                <div>
                                    <p>Maximize Your Vehicle Value</p> 
                                    <ul class="pt-1 font-normal text-normal list-disc flex flex-col gap-1 pl-6">
                                        <li>Top Dollar for Your Car</li> 
                                        <li>Verified Buyers Pool</li> 
                                        <li>HST Trade-In Credits</li>
                                    </ul>
                                </div>
                            </div> 
                            <div class="flex flex-row items-center gap-3 md:gap-6">
                                <img src="~assets/images/extra_services.png" style="height: 32px; width: 32px"> 
                                <div>
                                    <p>Dealer Power in Your Hands</p> 
                                    <ul class="pt-1 font-normal text-normal list-disc flex flex-col gap-1 pl-6">
                                        <li>Major Banks Financing + Leasing</li> 
                                        <li>Warranties and Protection Plans</li> 
                                        <li>Registrations, Mechanical + Recon</li>
                                    </ul>
                                </div>
                            </div> 
                            <div class="flex flex-row items-center gap-3 md:gap-6">
                                <img src="~assets/images/fraud.png" style="height: 32px; width: 32px"> 
                                <div><p>Stop Scammers and Fraud</p> 
                                    <ul class="pt-1 font-normal text-normal list-disc flex flex-col gap-1 pl-6">
                                        <li>Verified Vehicle History</li> 
                                        <li>Lien Searches + Payouts</li> 
                                        <li>Verification of Funds</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row justify-center pb-8"><img src="~assets/images/partner-logos.png" alt="" class="max-w-xs md:max-w-3xl"></div>
           
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue"
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/authStore';

const store = useAppStore();
const authStore = useAuthStore();
const router = useRouter();

// const name = ref(null);

const here = ref(1);
const there = ref(0);

 const toggleFirstForm = () => {
   here.value=1;
   there.value=0;
 }

 const toggleSecondForm = () => {
   there.value=1;
   here.value=0;
 }

 const isValidEmail = computed(() => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(store.$state.form.email);
    });

    const isValidPhoneNumber = computed(() => {
      const phoneRegex = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
      return phoneRegex.test(store.$state.form.phone);
    });

 watch(()=>store.$state.form,()=>{
       localStorage.setItem('form',JSON.stringify(store.$state.form));
      
   },{deep:true})

const isFormNotEmpty = computed(()=>{
    const { phone, email } = store.$state.form;
    return phone !== '' || email!== '';
})

 async function createLead() {

const vtiger_data_seven_leads = new URLSearchParams({
  'publicid': "5f7d449b3f5216d27c3a7aea6c70ecbe",
  'name': "Vehicle Sell",
//   'firstname': formStore.$state.form.contact_info.first_name,
  'lastname': "test",
  'phone': store.$state.form.phone ?? '',
  'mobile': store.$state.form.phone ?? '',
  'email': store.$state.form.email ?? '',
});

const str = vtiger_data_seven_leads.toString();
const vtiger_seven_url = "https://exride.easypear.com/modules/Webforms/capture_test.php?" + str;

// if(!localStorage.getItem("leadid")){

await useFetch(vtiger_seven_url, {
  method: 'GET',
})
  .then(response => {
    console.log(JSON.parse(response.data.value));
    // $response = Zend_Json::encode(array('success' => false, 'error' => array('message' => $failure)));

    if(JSON.parse(response.data.value)['success']){
        localStorage.removeItem("leadid");
        localStorage.setItem("leadid", JSON.parse(response.data.value)['result']);
    }
    // else{
        authStore.setUser("login");
        localStorage.setItem('app_user', "login")

        router.push('/vehicle-details')   
    // }
  });
}

onMounted(()=>{

if(authStore.getUser){
    router.push('/vehicle-details')
}

})
</script>