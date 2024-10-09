<template>
  <div class="w-full h-full" style="background-color: white !important;">

    <!-- BEGINNING OF THE CONTAINER -->
    <div class=" w-full  h-full font-pnova relative ">
      <!-- <div class=" w-[8px] h-full fixed left-0 top-0 bg-tertiary"></div> -->
       
      <div class=" w-full ">
        <Header />
        <div class=" w-full flex justify-center items-center h-screen">

          <div class="flex flex-col gap-4 max-w-64">
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
                <option v-for="model in model" :key="model" :value="model">{{ model }}</option>
            </select>

            <button class="rounded-full py-3 text-white w-full" :disabled="!isFormNotEmpty" :class="{'bg-gray-200':!isFormNotEmpty,'bg-[#2563EB] hover:bg-[#2B9DD7]':isFormNotEmpty}" @click="$emit('Next')">Start Upload</button>
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
    console.log(dataInfo);

    const formData1 = new FormData();

    formData1.append( 'cf_1982', 'Tradin');
    formData1.append( 'cf_1280', dataInfo['year'] ? dataInfo['year'] : '');
    formData1.append('cf_1282', dataInfo['make'] ? dataInfo['make'] : '');
    formData1.append('cf_1292', store.$state.form.vehicle_vin);
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
    formData1.append('cf_1290', store.$state.form.vehicle_vin);
    var vinjsonstring = JSON.stringify(dataInfo, null);
    formData1.append("vinjson", vinjsonstring); 

    $fetch("https://exride.easypear.com/modules/Webforms/captureProduct.php", {
    method: 'POST',
    body: formData1,
  }).then( response => {

    const data = JSON.parse(response).result;
    console.log(data);
    const idParts = data.id.split('x');

    const attach_lead_inv = new URLSearchParams({
      'token': "293o9u239du823dilY0k4RLJxN2dJFoP",
      'id': localStorage.getItem('leadid'),
      'inventoryid': idParts[1],
    });

        const attach_str = attach_lead_inv.toString();

        const attach_lead_url = "https://exride.easypear.com/carlist.php?" + attach_str;

        $fetch(attach_lead_url, {
            method: 'GET',
        }).then(response => {
          console.log(response);
    });

  });
//       formData1.forEach((value, key) => {
//     console.log(key + ': ' + value);
// });

    // store.$state.form.all_car_info = response.data;

    store.$state.form.vehicle_info.year = dataInfo.year;
    store.$state.form.vehicle_info.make = dataInfo.make.toLowerCase().charAt(0).toUpperCase() + dataInfo.make.toLowerCase().slice(1);

    if (store.$state.form.vehicle_info.make) {
    nextTick(async () => {
     fillModel(store.$state.form.vehicle_info.make);
    })
  }

    store.$state.form.vehicle_info.model = dataInfo.model.toLowerCase().charAt(0).toUpperCase() + dataInfo.model.toLowerCase().slice(1);

    console.log(store);

    disp.value =  dataInfo.year + ' ' + dataInfo.make + ' '+ store.$state.form.vehicle_info.model;
//     setTimeout(() => {
//   router.push('/onboarding/vehicle-info')
// }, 0)
    
  }).catch(e => { 
    isError.value = true;
  })
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
     useFetch(modelurl + make + "?api_token=" + apiToken).then((response) => {
        Object.values(response.data.value).forEach(i => model.value.push(i.model))
        console.log(model);
     })
  }
}

const onChangeMake = () => {
  store.$state.form.vehicle_info.model = ''

  fillModel(store.$state.form.vehicle_info.make)
}


watch(() => [store.$state.form.vehicle_info, store.$state.form.vehicle_vin], () => {
  localStorage.setItem('form', JSON.stringify(store.$state.form))
}, { deep: true })

const isFormNotEmpty = computed(() => {
  const  year = store.$state.form.vehicle_info.year;
  const  make = store.$state.form.vehicle_info.make;
  const  model = store.$state.form.vehicle_info.model;
  
  return year !== '' && make !== '' && model !== '' ;

 })


</script>