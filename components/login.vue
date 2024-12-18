<template>

    <div class="w-full h-full">
        <Header />
        <!-- BEGINNING OF THE CONTAINER -->
        <div class=" w-full  h-full font-pnova relative bg-[#FFF]">
            <!-- <div class=" w-[8px] h-full fixed left-0 top-0 bg-tertiary"></div> -->

            <div class=" w-full mt-32">

                <div class="flex flex-col-reverse gap-2 md:gap-8">
                    <!-- <div class="p-4 md:p-8 grid place-content-center w-full">
                        <h3 class="text-2xl md:text-5xl font-bold pb-8 flex flex-row items-center justify-center gap-8 w-full">
                            <p class="text-center">How Much is Your Vehicle Worth?</p>
                        </h3> 
                        <div class="rounded-xl flex flex-col md:flex-row gap-4 w-full">
                            <input placeholder="Enter your VIN number" type="text" class="rounded-full py-3 px-5 flex-grow border border-black/20 shadow-xl w-full"> 
                            <button class="rounded-full px-4 py-3 bg-[#2563EB] text-white font-bold shadow-xl hover:-translate-x-0.5 hover:-translate-y-1 transition-all duration-200">Calculate</button>
                        </div> 
                    </div> -->

                    <div class="flex flex-col md:flex-row gap-8 justify-start md:justify-center">
                        <div class="p-8 border border-black/20 rounded-xl md:w-fit md:max-w-sm " v-if="!signup">
                            <div class="flex flex-col justify-center items-center pt-2" style="">
                                <img src="~assets/images/exride_logo.png" alt="exride logo" style="width: 50%;">
                                <h3 class="font-bold md:text-xl pt-1 text-center">Login or Sign-Up</h3>
                            </div>
                            <!-- <div class="mt-4 flex flex-row justify-center border rounded-full bg-gray-200">
                                <button class="w-1/2 rounded-full" :class="{ 'text-white bg-[#2563EB]': here }"
                                    @click="toggleFirstForm">
                                    Phone
                                </button>
                                <button type="button"
                                    class="w-1/2 py-2.5 rounded-full text-white inline-flex items-center justify-center "
                                    :class="{ 'text-white bg-[#2563EB]': there }" @click="toggleSecondForm">
                                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor" viewBox="0 0 18 19">
                                        <path fill-rule="evenodd"
                                            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    Google
                                </button>
                            </div> -->


                            <div class="flex flex-col md:flex-row gap-4 pt-4 md:pt-4">

                                <!--                  <input placeholder="Enter your email" type="email"
                                    class="rounded-full py-3 px-5 border border-black/20 flex-grow"
                                    v-model="store.$state.form.email" v-show="there">-->

                                <div class="relative inline-flex w-full" v-show="here">
                                    <button type="button"
                                        class="px-2 border-y border-s rounded-s-full border-black/20 bg-gray-100 hover:bg-gray-200 focus:outline-none ">
                                        +1
                                    </button>
                                    <input placeholder="Enter your phone number" type="number"
                                        class="rounded-e-full py-3 px-5 border border-s-0 border-black/20 flex-grow"
                                        v-model="store.$state.form.phone">
                                </div>
                                <button class="rounded-full text text-white px-2 text-center hover:bg-accent py-2 "
                                    :disabled="!isFormNotEmpty && (!isValidEmail || !isValidPhoneNumber)"
                                    :class="{ 'bg-gray-200': !isFormNotEmpty && (!isValidEmail || !isValidPhoneNumber), 'bg-[#2563EB] hover:bg-[#2B9DD7]': isFormNotEmpty && (isValidEmail || isValidPhoneNumber) }"
                                    @click="sendOtp('create', '')" v-if="here">
                                    <p class="" v-if="!otpsent">Next</p>
                                    <p class="" v-if="otpsent">Resend</p>
                                </button>

                                <button class="rounded-full text text-white px-2 text-center hover:bg-accent py-2 "
                                    :disabled="!isFormNotEmpty && (!isValidEmail || !isValidPhoneNumber)"
                                    :class="{ 'bg-gray-200': !isFormNotEmpty && (!isValidEmail || !isValidPhoneNumber), 'bg-[#2563EB] hover:bg-[#2B9DD7]': isFormNotEmpty && (isValidEmail || isValidPhoneNumber) }"
                                    @click="" v-if="there">
                                    <p class="">Next</p>
                                </button>
                            </div>

                            <div v-show="here && otpsent" class="mt-4">
                                <div v-if="success" class="bg-[#BBF7D0] p-4 rounded-full text-center">
                                    <p>{{ success }}</p>
                                </div>
                                <div v-if="err" class="bg-[#fecaca] p-4 rounded-full text-center">
                                    <p>{{ err }}</p>
                                </div>
                                <div v-if="err1" class="bg-[#fecaca] p-4 rounded-full text-center">
                                    <p>{{ err1 }}</p>
                                </div>
                                <div class="flex flex-col md:flex-row gap-4 pt-4 md:pt-4" v-if="!err && here">
                                    <input placeholder="Enter your OTP" type="text"
                                        class="rounded-full py-3 px-5 border border-black/20 flex-grow"
                                        v-model="store.$state.form.otp">


                                    <button
                                        class="rounded-full text text-white px-4 text-center bg-[#2563EB] hover:bg-[#2B9DD7] py-2"
                                        @click="sendOtp('verify', store.$state.form.otp)">
                                        <p class="">Verify</p>
                                    </button>
                                </div>
                            </div>
                            <div class="flex jusyify-center mt-5">
                                <button class="gsi-material-button rounded-button" id="googleSignin"
                                    @click="toggleSecondForm">
                                    <div class="gsi-material-button-state"></div>
                                    <div class="gsi-material-button-content-wrapper flex gap-2">
                                        <div class="gsi-material-button-icon">
                                            <svg class="google-logo" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <path fill="#EA4335"
                                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                                                </path>
                                                <path fill="#4285F4"
                                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                                                </path>
                                                <path fill="#FBBC05"
                                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                                                </path>
                                                <path fill="#34A853"
                                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                                                </path>
                                                <path fill="none" d="M0 0h48v48H0z"></path>
                                            </svg>
                                        </div>
                                        <span class="gsi-material-button-contents">Sign in with Google</span>
                                        <span style="display: none;">Sign in with Google</span>
                                    </div>
                                </button>
                            </div>

                            <!-- CSS -->



                            <!-- <div class="pt-8">Exride values your security. 
                                <button class="rounded-full text text-white px-4 text-center hover:bg-accent py-2 "  v-if="!isGoogleAuth"
                                    :disabled="!isFormNotEmpty && (!isValidEmail || !isValidPhoneNumber)"
                                    :class="{ 'bg-gray-200': !isFormNotEmpty && (!isValidEmail || !isValidPhoneNumber), 'bg-[#2563EB] hover:bg-[#2B9DD7]': isFormNotEmpty && (isValidEmail || isValidPhoneNumber) }"
                                    @click="checkLead()">
                                    <p class="">Next</p>
                                </button>
                            </div> -->
                            <div class="pt-8 text-center text-sm">Exride values your security.
                                <br>Please enter your
                                phone number or email to receive a one time password to login or
                                sign-up.
                            </div>
                        </div>

                        <div class="p-8 border border-black/20 rounded-xl md:w-fit md:max-w-sm " v-if="signup">
                            <div class="flex flex-col justify-center items-center pt-2" style="">
                                <img src="~assets/images/exride_logo.png" alt="exride logo" style="width: 50%;">
                                <h3 class="font-bold md:text-xl pt-1 text-center">Login or Sign-Up</h3>
                            </div>
                            <!-- <div class="mt-4 flex flex-row justify-center border rounded-full bg-gray-200">
                                <button class="w-1/2 rounded-full " :class="{'text-white bg-[#2563EB]':here}" @click="toggleFirstForm">Phone</button> 
                                <button class="w-1/2 py-1 rounded-full" :class="{'text-white bg-[#2563EB]':there}" @click="toggleSecondForm">Email</button>
                            </div>  -->
                            <div class=" gap-4 pt-4 md:pt-4">
                                <input placeholder="Enter your first name" type="text"
                                    class="rounded-full mb-2 py-3 px-5 border border-black/20 flex-grow w-full"
                                    v-model="store.$state.form.firstname">
                                <input placeholder="Enter your last name" type="text"
                                    class="rounded-full py-3 px-5 border border-black/20 flex-grow w-full"
                                    v-model="store.$state.form.lastname">
                                <div class="relative inline-flex w-full my-2">
                                    <button type="button"
                                        class="px-2 border-y border-s rounded-s-full border-black/20 bg-gray-100 hover:bg-gray-200 focus:outline-none ">
                                        +1
                                    </button>
                                    <input placeholder="Enter your phone number" type="number"
                                        class="rounded-e-full py-3 px-5 border border-s-0 border-black/20 flex-grow"
                                        v-model="store.$state.form.phone">
                                </div>
                                <input placeholder="Enter your email" type="email"
                                    class="rounded-full py-3 px-5 border border-black/20 flex-grow w-full mb-2"
                                    v-model="store.$state.form.email">

                                <div class="flex items-end flex-row ">
                                    <!-- <span class="w-8 h-8 flex items-center justify-center bg-[#007580] px-2 py-1 text-[#fff] text-sm rounded-l-md">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5-5m2-5a7 7 0 10-14 0 7 7 0 0014 0z" />
    </svg>
  </span> -->
                                    <GMapAutocomplete
                                        class=" h-[50px] rounded-full w-full  border border-black/20  placeholder-gray-400    px-2 "
                                        placeholder="Your Home Address" :value=Name @place_changed="setPlace" :options="{
                                            componentRestrictions: {
                                                country: ['CA'],
                                            },
                                            strictBounds: true
                                        }">
                                    </GMapAutocomplete>
                                </div>
                                <!-- <p class="text-sm bg-[#f1f5f9] text-center">{{ Name }}</p> -->


                            </div>
                            <button type="button" class="w-full rounded-full  mt-2 py-2" :disabled="!signupNotEmpty"
                                :class="{ 'text-white bg-[#2563EB]': signupNotEmpty, 'bg-gray-200': !signupNotEmpty }"
                                @click="createLead()">Continue</button>
                        </div>
                        <div
                            class="flex flex-col font-bold gap-4 divide-solid text-sm md:text-base justify-between py-6 md:py-16 p-4 md:p-8 border border-black/20 rounded-xl md:max-w-sm">
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
                                <div>
                                    <p>Stop Scammers and Fraud</p>
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

                <div class="flex flex-row justify-center pb-8"><img src="~assets/images/partner-logos.png" alt=""
                        class="max-w-xs md:max-w-3xl"></div>

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
const emit = defineEmits(['next'])
const { signInWithGoogle, auth, onAuthStateChanged } = useFirebaseAuth();
const firebaseUser = ref()

// const name = ref(null);



const here = ref(1);
const there = ref(0);
const signup = ref(false);
const otpsent = ref(false);
const Name = ref(null);
const success = ref("");
const err = ref("");
const err1 = ref("");
const isGoogleAuth = ref(false)

const toggleFirstForm = () => {
    here.value = 1;
    there.value = 0;
}

const toggleSecondForm = async () => {
    // Call the signInWithGoogle function when the button is clicked
    try {
        there.value = 1;
        here.value = 0;
        isGoogleAuth.value = true
        await signInWithGoogle(); // Call the Google sign-in function
    } catch (error) {
        console.error("Error during Google sign-in:", error);
    }
};

//@ts-ignore
onMounted(() => onAuthStateChanged(auth, (user) => {
    if (user) {
        firebaseUser.value = user;
        console.log('User logged in:', user);

        //@ts-ignore
        store.$state.form.email = user?.email;
        //@ts-ignore
        store.$state.form.phone = user?.phoneNumber;
        //@ts-ignore
        store.$state.form.mobile = user?.phoneNumber;

        if (user?.displayName) {
            const nameParts = user.displayName.split(' ');

            //@ts-ignore
            store.$state.form.firstname = nameParts[0];
            //@ts-ignore
            store.$state.form.lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        } else {
            //@ts-ignore
            store.$state.form.firstname = '';
            //@ts-ignore
            store.$state.form.lastname = '';
        }

        checkLead();
    } else {
        console.log('No user is logged in');
    }
}));

const isValidEmail = computed(() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(store.$state.form.email);
});

const isValidPhoneNumber = computed(() => {
    const phoneRegex = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
    return phoneRegex.test(store.$state.form.phone);
});

watch(() => store.$state.form, () => {
    localStorage.setItem('form', JSON.stringify(store.$state.form));

}, { deep: true })

const isFormNotEmpty = computed(() => {
    const { phone, email } = store.$state.form;
    return phone !== '' || email !== '';
})

const signupNotEmpty = computed(() => {
    const firstname = store.$state.form.firstname;
    const lastname = store.$state.form.lastname;
    const email = store.$state.form.email;
    const phone = store.$state.form.phone;

    return firstname !== '' && lastname !== '' && phone !== '' && email !== '' && store.$state.form.vehicle_location.prov !== '';
})

const setPlace = (addressData) => {
    const adr_data = addressData['address_components'];
    for (let i = 0; i < adr_data.length; i++) {

        if (adr_data[i]['types'][0] === 'locality') {
            store.$state.form.vehicle_location.city = adr_data[i]['long_name'];
        } else if (adr_data[i]['types'][0] === 'administrative_area_level_1') {
            store.$state.form.vehicle_location.prov = adr_data[i]['short_name'];
        } else if (adr_data[i]['types'][0] === 'postal_code') {
            store.$state.form.vehicle_location.code = adr_data[i]['long_name'];
        } else if (adr_data[i]['types'][0] === 'route') {
            store.$state.form.vehicle_location.route = adr_data[i]['long_name'];
        } else if (adr_data[i]['types'][0] === 'street_number') {
            store.$state.form.vehicle_location.street_number = adr_data[i]['long_name'];
        } else if (adr_data[i]['types'][0] === 'country') {
            store.$state.form.vehicle_location.country = adr_data[i]['short_name']; // or use 'short_name' if you prefer the country code
        }
    }
    Name.value = addressData['formatted_address'];

    store.$state.form.vehicle_location.location = Name.value;
    localStorage.setItem('form', JSON.stringify(store.$state.form))
    // console.log(Name);

}

async function sendOtp(checker, cody) {
    console.log(cody)

    const formData1 = new FormData();

    // localStorage.setItem("lead")

    formData1.append("smschecker", checker);
    formData1.append("smstoken", "9647");
    formData1.append("smscode", cody);
    formData1.append("smsphone", store.$state.form.phone);

    useFetch("https://exride.easypear.com/sms/otp.php", {
        // headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded' // Set the content type to 'application/x-www-form-urlencoded'.
        //         },
        method: 'POST',
        body: formData1
    }).then((response) => {
        otpsent.value = true;
        console.log(response.data);
        try {
            if (JSON.parse(response.data.value) === 'pending') {

                success.value = 'We have sent a code to your phone +1' + store.$state.form.phone;
                err.value = '';
                console.log(err)
            } else if (JSON.parse(response.data.value) === 'approved') {
                success.value = '';
                success.value = 'OTP code succefully verified!';
                err.value = '';
                checkLead()
            }
        } catch {
            success.value = '';
            err.value = '';
            err1.value = ''
            if (checker === "create") {
                err.value = 'Error sending OTP. Please double check your information.';
            } else {
                err1.value = 'Error verifying OTP. Please double check your information.';
            }
            console.log(err)
        }
    })
}


async function checkLead() {
    const formData = new FormData();
    console.log(formData)
    if (store.$state.form.email) {
        formData.append('mode', 'getLeadByEmail');
        formData.append('email', store.$state.form.email);


        useFetch("https://exride.easypear.com/modules/TradeInPortal/process.php",
            {
                method: 'POST',
                body: formData,
            }).then(async (response) => {
                console.log(JSON.parse(response.data.value).data)
                // localStorage.setItem("lead")

                if (!JSON.parse(response.data.value).data || JSON.parse(response.data.value).data.length === 0) {

                    /**                    if (firebaseUser) {
                                            signup.value = true;
                                          ///  await createLead();
                                        } else {
                                            signup.value = true;
                                        } */
                    signup.value = true;

                } else {
                    authStore.setUser("login");
                    localStorage.setItem('app_user', "login");
                    localStorage.setItem('leadid', JSON.parse(response.data.value).data["leadid"]);

                    emit('next')
                }

            })

    } else if (store.$state.form.phone) {
        formData.append('mode', 'getLeadByPhone');
        formData.append('phone', store.$state.form.phone);

        useFetch("https://exride.easypear.com/modules/TradeInPortal/process.php",
            {
                method: 'POST',
                body: formData,
            }).then((response) => {



                if (!JSON.parse(response.data.value).data || JSON.parse(response.data.value).data.length === 0) {


                    signup.value = true;
                    console.log(signup);
                } else {
                    authStore.setUser("login");
                    localStorage.setItem('app_user', "login");
                    localStorage.setItem('leadid', JSON.parse(response.data.value).data["crmid"]);

                    emit('next')
                }

            })
    }
    else {
        console.log("Invalid user data")
    }


}

async function createLead() {
    const vtiger_data_seven_leads = new URLSearchParams({
        'publicid': "5f7d449b3f5216d27c3a7aea6c70ecbe",
        'name': "Vehicle Sell",
        'firstname': store.$state.form.firstname,
        'lastname': store.$state.form.lastname,
        'phone': store.$state.form.phone ?? '',
        'mobile': store.$state.form.phone ?? '',
        'email': store.$state.form.email ?? '',
        'cf_939': store.$state.form.vehicle_location.location ?? '',
        'city': store.$state.form.vehicle_location.city ?? '',
        'state': store.$state.form.vehicle_location.prov ?? '',
        'code': store.$state.form.vehicle_location.code ?? '',
        'lane': store.$state.form.vehicle_location.street_number ?? '' + ' ' + store.$state.form.vehicle_location.route ?? '',
        'country': store.$state.form.vehicle_location.country ?? '',
        'cf_1684': store.$state.form.vehicle_location.prov ?? '',
    });

    const str = vtiger_data_seven_leads.toString();
    const vtiger_seven_url = "https://exride.easypear.com/modules/Webforms/capture_test.php?" + str;

    // if(!localStorage.getItem("leadid")){

    $fetch(vtiger_seven_url, {
        method: 'GET',
    })
        .then(response => {
            console.log(response);
            // $response = Zend_Json::encode(array('success' => false, 'error' => array('message' => $failure)));

            localStorage.removeItem("leadid");
            localStorage.setItem("leadid", JSON.parse(response)['result']);
            authStore.setUser("login");
            localStorage.setItem('app_user', "login");
            emit('next')

        });
}


onMounted(() => {


    if (authStore.getUser) {
        emit('next')
    }

})
</script>

<style>
.rounded-button {
    border-radius: 25px;
    padding: 10px 20px;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-left: 15%;
}

.gsi-material-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.google-logo {
    width: 20px;
    /* Adjust the size here */
    height: 20px;
}
</style>