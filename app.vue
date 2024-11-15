<template>
  <div class="h-full">
    <NuxtLayout>
      <Header v-if="step > 2" />
      <div class=" mt-[20vh] " :class="(step > 2 && step < 9) ? 'flex flex-col md:flex-row justify-center items-center md:items-start md:justify-around mx-[10vw]' : ''">
      <div v-if="step > 2 && step < 9" class="flex flex-col rounded-xl border-2 items-center   mb-2 md:me-2 p-5 hidden md:block" >
    
        <div class="border border-2  py-1  p-2 rounded-xl w-40 mt-3 " :class="step===3?'bg-[#0ea5e9] border-[#0ea5e9] text-[#fff]':''">
              <!-- <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div> -->
              <p class="font-bold text-sm ">Vehicle Upload</p>
          </div>

          <div class="border border-2  p-2 rounded-xl w-40 mt-3 "  :class="step===4?'bg-[#0ea5e9] border-[#0ea5e9] text-[#fff]':''">
              <!-- <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div> -->
              <p class="font-bold text-sm ">General Info</p>
          </div>

          <div class="border border-2  p-2 rounded-xl w-40 mt-3 "  :class="step===5?'bg-[#0ea5e9] border-[#0ea5e9] text-[#fff]':''">
              <!-- <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div> -->
              <p class="font-bold text-sm ">Lien</p>
          </div>

          <div class="border border-2  p-2 rounded-xl w-40 mt-3 "  :class="step===6?'bg-[#0ea5e9] border-[#0ea5e9] text-[#fff]':''">
              <!-- <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div> -->
              <p class="font-bold text-sm ">Asking Price</p>
          </div>

          <div class="border border-2  p-2 rounded-xl w-40 mt-3 "  :class="step===7?'bg-[#0ea5e9] border-[#0ea5e9] text-[#fff]':''">
              <!-- <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div> -->
              <p class="font-bold text-sm ">Photos Upload</p>
          </div>

          <div class="border border-2  p-2 rounded-xl w-40 mt-3 "  :class="step===8?'bg-[#0ea5e9] border-[#0ea5e9] text-[#fff]':''">
              <!-- <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div> -->
              <p class="font-bold text-sm ">Review</p>
          </div>

      </div>
      <div >
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
        <Step7 :key="step" v-if="step === 9" v-bind:final-image="imag" @openCameraModal="openCameraModal" @Next="Next" @Back="Back"   />
      </transition>
     
      <div class="flex justify-end  mt-5" >
        <button  class="outline outline-2  outline-[#facc15] hover:bg-[#facc15] text-[#facc15] hover:text-[#fff] p-3 rounded-3xl cursor-auto mb-3 me-3" v-if="step > 3 && step < 8 && edit" @click="draftInventory()">Save Draft</button>
      </div>
      
      
      <!-- <Step1 v-if="step === 1" @Next="Next" @Back="Back"  />
                  <Step2 v-if="step === 2" @Next="Next" @Back="Back"  /> -->
    </div>
    </div>
   
    <Footer />
    <CameraModal @finalImage="finalImage" ref="CameraModalRef" />
    
  </NuxtLayout>
  </div>
  <!-- <Footer /> -->
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

import CameraModal from "@/components/UI/CameraModal.vue";

import { useAuthStore } from '@/stores/authStore';

import { useAppStore } from '@/stores/app.js';

const store = useAppStore();
const step = ref(2);
const CameraModalRef = ref(null)
const Direction = useDirection();
const router = useRouter();
const animation = ref('animation-from-bottom')
const authStore = useAuthStore();
const imag = ref('');
// const otherImages = ref<Blob[]>([]);
const loading = ref(false);
const edit = ref(false);
console.log(edit);

//  const dataURItoBlob = (dataURI: string) => {
//     const byteString = atob(dataURI.split(',')[1]);
//     const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: mimeString });
//   };

// const createInventory = () => {
//   const dataInfo = JSON.parse(localStorage.getItem("dataInfo"));
//     console.log(dataInfo);
//     loading.value=true;

//     const carside = dataURItoBlob(store.$state.form.images["car_side"]);
//     const carfrontangle = dataURItoBlob(store.$state.form.images["car_front_angle"]);
//     const carbackangle = dataURItoBlob(store.$state.form.images["car_back_angle"]);
//     const carseats = dataURItoBlob(store.$state.form.images["car_seats"]);
//     const cardash = dataURItoBlob(store.$state.form.images["car_dash"]);

//     otherImages.value.push(carfrontangle, carbackangle, carseats, cardash);

    

//     const formData1 = new FormData();

//     formData1.append( 'cf_1982', 'tradin');
//     formData1.append('cf_2011', 'under review');
//     formData1.append( 'cf_1280', dataInfo['year'] ? dataInfo['year'] : '');
//     formData1.append('cf_1282', dataInfo['make'] ? dataInfo['make'] : '');
//     formData1.append('cf_1292', store.$state.form.vehicle_vin??'');
//     formData1.append('cf_1284', dataInfo['model'] ? dataInfo['model'] : '');
//     formData1.append('cf_1286', dataInfo['trim'] ? dataInfo['trim'] : '');
//     formData1.append('cf_1457', dataInfo['body_style_desc'] ? dataInfo['body_style_desc'] : '');
//     formData1.append('cf_1461', dataInfo['transmission'] ? dataInfo['transmission'] : '');
//     formData1.append('cf_1288', dataInfo['Milage'] ? dataInfo['Milage'] : ''); // milage
//     formData1.append('productname', dataInfo['year'] ? dataInfo['year'] : '' + ' ' + (dataInfo['make'] ? dataInfo['make'] : '').toUpperCase() + ' ' + dataInfo['model'] ? dataInfo['model'] : '' + ' ' + dataInfo['trim'] ? dataInfo['trim'] : ''); //productname 
//     formData1.append('cf_1327', dataInfo['ABS'] ? dataInfo['ABS'] : ''); // ABS
//     formData1.append('cf_1329', dataInfo['Acceleration 0-100 km/h (s)'] ? dataInfo['Acceleration 0-100 km/h (s)'] : ''); // Acceleration 0-100 km/h (s)
//     formData1.append('cf_1331', dataInfo['CO2 Emission (g/km)'] ? dataInfo['CO2 Emission (g/km)'] : ''); // CO2 Emission (g/km)
//     formData1.append('cf_1333',  dataInfo['Check Digit'] ? dataInfo['Check Digit'] : ''); // Check Digit
//     formData1.append('cf_1335', dataInfo['drive_type_desc'] ? dataInfo['drive_type_desc'] : ''); // Drive
//     formData1.append('cf_1337', dataInfo['Engine Code'] ? dataInfo['Engine Code'] : ''); // Engine Code
//     formData1.append('cf_1339', dataInfo['Engine Compression Ratio'] ? dataInfo['Engine Compression Ratio'] : ''); // Engine Compression Ratio
//     formData1.append('cf_1341', dataInfo['Engine Cylinder Bore (mm)'] ? dataInfo['Engine Cylinder Bore (mm)'] : ''); // Engine Cylinder Bore (mm)
//     formData1.append('cf_1343', dataInfo['engine_cylinder_cnt'] ? dataInfo['engine_cylinder_cnt'] : ''); // Engine Cylinders
//     formData1.append('cf_1345', dataInfo['engine_block_type'] ? dataInfo['engine_block_type'] : ''); // Engine Cylinders Position
//     formData1.append('cf_1347', dataInfo['engine_displacement_cubic_cm'] ? dataInfo['engine_displacement_cubic_cm'] : ''); // Engine Displacement (ccm)
//     formData1.append('cf_1349', dataInfo['engine_model'] ? dataInfo['engine_model'] : ''); // Engine Model
//     formData1.append('cf_1351', dataInfo['Engine Oil Capacity (l)'] ? dataInfo['Engine Oil Capacity (l)'] : ''); // Engine Oil Capacity (l)
//     formData1.append('cf_1353', dataInfo['Engine Power (kW)'] ? dataInfo['Engine Power (kW)'] : ''); // Engine Power (kW)
//     formData1.append('cf_1355', dataInfo['Engine RPM'] ? dataInfo['Engine RPM'] : ''); // Engine RPM
//     formData1.append('cf_1357', dataInfo['Engine Stroke (mm)'] ? dataInfo['Engine Stroke (mm)'] : ''); // Engine Stroke (mm)
//     formData1.append('cf_1359', dataInfo['Engine Turbine'] ? dataInfo['Engine Turbine'] : ''); // Engine Turbine
//     formData1.append('cf_1361', dataInfo['Front Overhang (mm)'] ? dataInfo['Front Overhang (mm)'] : ''); // Front Overhang (mm)
//     formData1.append('cf_1363', dataInfo['fuel_cpcty_gallons'] ? dataInfo['fuel_cpcty_gallons'] * 3.78 : ''); // Fuel Capacity (l)
//     formData1.append('cf_1365', dataInfo['Fuel System'] ? dataInfo['Fuel System'] : ''); // Fuel System
//     formData1.append('cf_1367', dataInfo['Made'] ? dataInfo['Made'] : ''); // Made
//     formData1.append('cf_1369', dataInfo['Market'] ? dataInfo['Market'] : ''); // Market
//     formData1.append('cf_1371', dataInfo['Max Speed (km/h)'] ? dataInfo['Max Speed (km/h)'] : ''); // Max Speed (km/h)
//     formData1.append('cf_1373', dataInfo['door_cnt'] ? dataInfo['door_cnt'] : ''); // Number of Doors
//     formData1.append('cf_1375', dataInfo['Number of Gears'] ? dataInfo['Number of Gears'] : ''); // Number of Gears
//     formData1.append('cf_1377', dataInfo['Number of Seats'] ? dataInfo['Number of Seats'] : ''); // Number of Seats
//     formData1.append('cf_1379', dataInfo['Permitted trailer load without brakes (kg)'] ? dataInfo['Permitted trailer load without brakes (kg)'] : ''); // Permitted trailer load without brakes (kg)
//     formData1.append('cf_1381', dataInfo['manufacturer'] ? dataInfo['manufacturer'] : ''); // Plant Company
//     formData1.append('cf_1383', dataInfo['vehicle_type'] ? dataInfo['vehicle_type'] : ''); // Product Type
//     formData1.append('cf_1385', dataInfo['Production Started'] ? dataInfo['Production Started'] : ''); // Production Started
//     formData1.append('cf_1387', dataInfo['Rear Overhang (mm)'] ? dataInfo['Rear Overhang (mm)'] : ''); // Rear Overhang (mm)
//     formData1.append('cf_1389', dataInfo['Sequential Number'] ? dataInfo['Sequential Number'] : ''); // Sequential Number
//     formData1.append('cf_1391', dataInfo['Series'] ? dataInfo['Series'] : ''); // Series
//     formData1.append('cf_1393', dataInfo['Steering Type'] ? dataInfo['Steering Type'] : ''); // Steering Type
//     formData1.append('cf_1395', dataInfo['Valves per Cylinder'] ? dataInfo['Valves per Cylinder'] : ''); // Valves per Cylinder
//     formData1.append('cf_1397', dataInfo['Wheelbase (mm)'] ? dataInfo['Wheelbase (mm)'] : ''); // Wheelbase (mm)
//     formData1.append('cf_1443', dataInfo['Power Steering'] ? dataInfo['Power Steering'] : ''); // 	Power Steering   
//     formData1.append('cf_1445', dataInfo['Plant Country'] ? dataInfo['Plant Country'] : ''); // 	Plant Country 
//     formData1.append('cf_1447', dataInfo['Fuel Type - Primary'] ? dataInfo['Fuel Type - Primary'] : ''); // 	Fuel Type - Primary 
//     formData1.append('cf_1449', dataInfo['Engine Position'] ? dataInfo['Engine Position'] : ''); // 	Engine Position  
//     formData1.append('cf_1451', dataInfo['Manufacturer Address'] ? dataInfo['Manufacturer Address'] : ''); // 	Manufacturer Address 
//     formData1.append('cf_1453', dataInfo['Front Suspension'] ? dataInfo['Front Suspension'] : '');
//     formData1.append('appKey', "40574819b71a57cc7bfe4ab6b05fcb1f");
//     formData1.append('captureProduct', true); // 	Front Suspension
//     formData1.append('cf_1290', store.$state.form.vehicle_vin);
//     var vinjsonstring = JSON.stringify(dataInfo, null);
//     formData1.append("vinjson", vinjsonstring);
//     formData1.append('main_img', carside, `main_image.${carside.type.split('/')[1]}`);
//     formData1.append('inspect_img', carside, `inspect_image.${carside.type.split('/')[1]}`);

//     formData1.append('cf_1995', store.$state.form.replace_vehicle ?? '');
//     formData1.append('cf_1997', store.$state.form.replace_vehicle_details ?? '');
//     formData1.append('cf_1987', store.$state.form.vehicle_desc ?? '');
//     formData1.append('cf_1288', store.$state.form.vehicle_info.mileage ?? '');
//     formData1.append('cf_2007', store.$state.form.vehicle_info.asking_price ?? '');
//     formData1.append('cf_1989', store.$state.form.vehicle_condition.accidents ?? '');
//     formData1.append('cf_1991', store.$state.form.vehicle_condition.damages ?? '');
//     formData1.append('cf_1993', store.$state.form.vehicle_condition.damages_details ?? '');
//     formData1.append('cf_1999', store.$state.form.vehicle_condition.lien ?? '');
//     formData1.append('cf_2003', store.$state.form.vehicle_condition.lien_amount ?? '');
//     formData1.append('cf_2005', store.$state.form.vehicle_condition.lender ?? '');

//     for (let i = 0; i < otherImages.value.length; i++) {
//   const imgFile = otherImages.value[i];

//   // Get the MIME type and extract the extension
//   const mimeType = imgFile.type;
//   const extension = mimeType.split('/')[1]; // Extracting 'jpeg', 'png', etc.

//   // Append to FormData with dynamic extension
//   formData1.append(`img_${i + 1}`, imgFile, `image_${i + 1}.${extension}`);
// }
//     $fetch("https://exride.easypear.com/modules/Webforms/captureProduct.php", {
//     method: 'POST',
//     body: formData1,
//   }).then( response => {
//     console.log(response);
//     const data = JSON.parse(response).result;
//     console.log(data);
//     const idParts = data.id.split('x');
//     console.log(idParts);
//     const attach_lead_inv = new URLSearchParams({
//       'token': "293o9u239du823dilY0k4RLJxN2dJFoP",
//       'id': localStorage.getItem('leadid'),
//       'inventoryid': idParts[1],
//     });

//         const attach_str = attach_lead_inv.toString();

//         const attach_lead_url = "https://exride.easypear.com/carlist.php?" + attach_str;
//         console.log(attach_lead_url)

//         $fetch(attach_lead_url, {
//             method: 'GET',
//         }).then(response => {
//           const attach_lead_inv2 = new URLSearchParams({
//             'token': "jIy6ZSSH4MiScCOTLXy2z0lU8wDbIGIMMBPhFpWAL2mAo1fByOalOIuxiXAVbKaw",
//             'leadid': localStorage.getItem('leadid'),
//             'productid': idParts[1],
//           });

//           const attach_str2 = attach_lead_inv2.toString();

//           const attach_lead_url2 = "https://exride.easypear.com/createLeadProd.php?" + attach_str2;
//         console.log(attach_lead_url2)

//         $fetch(attach_lead_url2, {
//             method: 'GET',
//         }).then(response => {
//           console.log(response);
//           localStorage.setItem("success", "ok");
//           loading.value=false;
//           reloadNuxtApp({
//           path: "/",
//           ttl: 100, // default 10000
//         });
//         })
//     });

//   });

// }

const draftInventory = () => {
  const dataInfo = JSON.parse(localStorage.getItem("dataInfo"));
    console.log(dataInfo);
    loading.value=true;
  
    const formData1 = new FormData();

    formData1.append( 'cf_1982', 'tradin');
    formData1.append('cf_2011', 'draft');
    formData1.append( 'cf_1280', dataInfo['year'] ? dataInfo['year'] : '');
    formData1.append('cf_1282', dataInfo['make'] ? dataInfo['make'] : '');
    formData1.append('cf_1292', store.$state.form.vehicle_vin??'');
    formData1.append('cf_1284', dataInfo['model'] ? dataInfo['model'] : '');
    formData1.append('cf_1286', dataInfo['trim'] ? dataInfo['trim'] : '');
    formData1.append('cf_1457', dataInfo['body_style_desc'] ? dataInfo['body_style_desc'] : '');
    formData1.append('cf_1461', dataInfo['transmission'] ? dataInfo['transmission'] : '');
    formData1.append('cf_1288', dataInfo['Milage'] ? dataInfo['Milage'] : ''); // milage
    formData1.append('productname', dataInfo['year'] ? dataInfo['year'] : '' + ' ' + (dataInfo['make'] ? dataInfo['make'] : '').toUpperCase() + ' ' + dataInfo['model'] ? dataInfo['model'] : '' + ' ' + dataInfo['trim'] ? dataInfo['trim'] : ''); //productname 
    formData1.append('cf_1327', dataInfo['ABS'] ? dataInfo['ABS'] : ''); // ABS
    formData1.append('cf_1329', dataInfo['Acceleration 0-100 km/h (s)'] ? dataInfo['Acceleration 0-100 km/h (s)'] : ''); // Acceleration 0-100 km/h (s)
    formData1.append('cf_1331', dataInfo['CO2 Emission (g/km)'] ? dataInfo['CO2 Emission (g/km)'] : ''); // CO2 Emission (g/km)
    formData1.append('cf_1333',  dataInfo['Check Digit'] ? dataInfo['Check Digit'] : ''); // Check Digit
    formData1.append('cf_1335', dataInfo['drive_type_desc'] ? dataInfo['drive_type_desc'] : ''); // Drive
    formData1.append('cf_1337', dataInfo['Engine Code'] ? dataInfo['Engine Code'] : ''); // Engine Code
    formData1.append('cf_1339', dataInfo['Engine Compression Ratio'] ? dataInfo['Engine Compression Ratio'] : ''); // Engine Compression Ratio
    formData1.append('cf_1341', dataInfo['Engine Cylinder Bore (mm)'] ? dataInfo['Engine Cylinder Bore (mm)'] : ''); // Engine Cylinder Bore (mm)
    formData1.append('cf_1343', dataInfo['engine_cylinder_cnt'] ? dataInfo['engine_cylinder_cnt'] : ''); // Engine Cylinders
    formData1.append('cf_1345', dataInfo['engine_block_type'] ? dataInfo['engine_block_type'] : ''); // Engine Cylinders Position
    formData1.append('cf_1347', dataInfo['engine_displacement_cubic_cm'] ? dataInfo['engine_displacement_cubic_cm'] : ''); // Engine Displacement (ccm)
    formData1.append('cf_1349', dataInfo['engine_model'] ? dataInfo['engine_model'] : ''); // Engine Model
    formData1.append('cf_1351', dataInfo['Engine Oil Capacity (l)'] ? dataInfo['Engine Oil Capacity (l)'] : ''); // Engine Oil Capacity (l)
    formData1.append('cf_1353', dataInfo['Engine Power (kW)'] ? dataInfo['Engine Power (kW)'] : ''); // Engine Power (kW)
    formData1.append('cf_1355', dataInfo['Engine RPM'] ? dataInfo['Engine RPM'] : ''); // Engine RPM
    formData1.append('cf_1357', dataInfo['Engine Stroke (mm)'] ? dataInfo['Engine Stroke (mm)'] : ''); // Engine Stroke (mm)
    formData1.append('cf_1359', dataInfo['Engine Turbine'] ? dataInfo['Engine Turbine'] : ''); // Engine Turbine
    formData1.append('cf_1361', dataInfo['Front Overhang (mm)'] ? dataInfo['Front Overhang (mm)'] : ''); // Front Overhang (mm)
    formData1.append('cf_1363', dataInfo['fuel_cpcty_gallons'] ? dataInfo['fuel_cpcty_gallons'] * 3.78 : ''); // Fuel Capacity (l)
    formData1.append('cf_1365', dataInfo['Fuel System'] ? dataInfo['Fuel System'] : ''); // Fuel System
    formData1.append('cf_1367', dataInfo['Made'] ? dataInfo['Made'] : ''); // Made
    formData1.append('cf_1369', dataInfo['Market'] ? dataInfo['Market'] : ''); // Market
    formData1.append('cf_1371', dataInfo['Max Speed (km/h)'] ? dataInfo['Max Speed (km/h)'] : ''); // Max Speed (km/h)
    formData1.append('cf_1373', dataInfo['door_cnt'] ? dataInfo['door_cnt'] : ''); // Number of Doors
    formData1.append('cf_1375', dataInfo['Number of Gears'] ? dataInfo['Number of Gears'] : ''); // Number of Gears
    formData1.append('cf_1377', dataInfo['Number of Seats'] ? dataInfo['Number of Seats'] : ''); // Number of Seats
    formData1.append('cf_1379', dataInfo['Permitted trailer load without brakes (kg)'] ? dataInfo['Permitted trailer load without brakes (kg)'] : ''); // Permitted trailer load without brakes (kg)
    formData1.append('cf_1381', dataInfo['manufacturer'] ? dataInfo['manufacturer'] : ''); // Plant Company
    formData1.append('cf_1383', dataInfo['vehicle_type'] ? dataInfo['vehicle_type'] : ''); // Product Type
    formData1.append('cf_1385', dataInfo['Production Started'] ? dataInfo['Production Started'] : ''); // Production Started
    formData1.append('cf_1387', dataInfo['Rear Overhang (mm)'] ? dataInfo['Rear Overhang (mm)'] : ''); // Rear Overhang (mm)
    formData1.append('cf_1389', dataInfo['Sequential Number'] ? dataInfo['Sequential Number'] : ''); // Sequential Number
    formData1.append('cf_1391', dataInfo['Series'] ? dataInfo['Series'] : ''); // Series
    formData1.append('cf_1393', dataInfo['Steering Type'] ? dataInfo['Steering Type'] : ''); // Steering Type
    formData1.append('cf_1395', dataInfo['Valves per Cylinder'] ? dataInfo['Valves per Cylinder'] : ''); // Valves per Cylinder
    formData1.append('cf_1397', dataInfo['Wheelbase (mm)'] ? dataInfo['Wheelbase (mm)'] : ''); // Wheelbase (mm)
    formData1.append('cf_1443', dataInfo['Power Steering'] ? dataInfo['Power Steering'] : ''); // 	Power Steering   
    formData1.append('cf_1445', dataInfo['Plant Country'] ? dataInfo['Plant Country'] : ''); // 	Plant Country 
    formData1.append('cf_1447', dataInfo['Fuel Type - Primary'] ? dataInfo['Fuel Type - Primary'] : ''); // 	Fuel Type - Primary 
    formData1.append('cf_1449', dataInfo['Engine Position'] ? dataInfo['Engine Position'] : ''); // 	Engine Position  
    formData1.append('cf_1451', dataInfo['Manufacturer Address'] ? dataInfo['Manufacturer Address'] : ''); // 	Manufacturer Address 
    formData1.append('cf_1453', dataInfo['Front Suspension'] ? dataInfo['Front Suspension'] : '');
    formData1.append('appKey', "40574819b71a57cc7bfe4ab6b05fcb1f");
    formData1.append('captureProduct', true); // 	Front Suspension
    formData1.append('cf_1290', store.$state.form.vehicle_vin??'');
    var vinjsonstring = JSON.stringify(dataInfo, null);
    formData1.append("vinjson", vinjsonstring);

    formData1.append('cf_1995', store.$state.form.replace_vehicle ?? '');
    formData1.append('cf_1997', store.$state.form.replace_vehicle_details ?? '');
    formData1.append('cf_1987', store.$state.form.vehicle_desc ?? '');
    formData1.append('cf_1288', store.$state.form.vehicle_info.mileage ?? '');
    formData1.append('cf_2007', store.$state.form.vehicle_info.asking_price ?? '');
    formData1.append('cf_1989', store.$state.form.vehicle_condition.accidents ?? '');
    formData1.append('cf_1991', store.$state.form.vehicle_condition.damages ?? '');
    formData1.append('cf_1993', store.$state.form.vehicle_condition.damages_details ?? '');
    formData1.append('cf_1999', store.$state.form.vehicle_condition.lien ?? '');
    formData1.append('cf_2003', store.$state.form.vehicle_condition.lien_amount ?? '');
    formData1.append('cf_2005', store.$state.form.vehicle_condition.lender ?? '');

    
    $fetch("https://exride.easypear.com/modules/Webforms/captureProduct.php", {
    method: 'POST',
    body: formData1,
  }).then( response => {
    console.log(response);
    const data = JSON.parse(response).result;
    console.log(data);
    const idParts = data.id.split('x');
    console.log(idParts);
    const attach_lead_inv = new URLSearchParams({
      'token': "293o9u239du823dilY0k4RLJxN2dJFoP",
      'id': localStorage.getItem('leadid'),
      'inventoryid': idParts[1],
    });

        const attach_str = attach_lead_inv.toString();

        const attach_lead_url = "https://exride.easypear.com/carlist.php?" + attach_str;
        console.log(attach_lead_url)

        $fetch(attach_lead_url, {
            method: 'GET',
        }).then(response => {
          const attach_lead_inv2 = new URLSearchParams({
            'token': "jIy6ZSSH4MiScCOTLXy2z0lU8wDbIGIMMBPhFpWAL2mAo1fByOalOIuxiXAVbKaw",
            'leadid': localStorage.getItem('leadid'),
            'productid': idParts[1],
          });

          const attach_str2 = attach_lead_inv2.toString();

          const attach_lead_url2 = "https://exride.easypear.com/createLeadProd.php?" + attach_str2;
        console.log(attach_lead_url2)

        $fetch(attach_lead_url2, {
            method: 'GET',
        }).then(response => {
          console.log(response);
          localStorage.setItem("success", "ok");
          loading.value=false;
          reloadNuxtApp({
          path: "/",
          ttl: 100, // default 10000
        });
        })
    });

  });

}

const Next = () => {
  localStorage.getItem('edit')?edit.value=false:edit.value=true;
  console.log(edit)
  if (step.value < 9) {
    if (step.value === 6 && localStorage.getItem('edit')) {
      step.value+=3;
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
  
  
  if (!localStorage.getItem("app_user")){
step.value=1
  }
  window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      console.log('Back button clicked!');

   
      // Back();
      window.history.pushState(null, null, window.location.href);
    };
})



</script>
