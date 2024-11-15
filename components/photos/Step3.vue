<template>
    <div class="w-full h-full" style="background-color: white !important;">
  
  <!-- BEGINNING OF THE CONTAINER -->

      <Header v-bind:loading="loading"/>
      <div class=" w-full flex justify-center items-center">
        

        <div  class="text-center flex flex-col justify-center items-center">
          <img src="~assets/images/spinning-loading.gif"  class="w-45"/>
          
          <div class="mb-[30vh]">
            <p class="text-3xl font-bold">Hang tight! </p>
            <p class="text-lg font-bold">We're creating your listing, so this might take a moment.</p>
          </div>
          
        </div>

        <!-- <div class=" max-h-[90%] p-8 md:p-12 overflow-y-auto rounded-xl shadow-xl md:max-w-3xl mt-3" v-if="!loading">
            <h2 class="text-2xl font-bold text-center w-full pt-2">Vehicle Uploaded Successfully !</h2> 
            <p class="pt-1 text-center text-sm font-semibold pb-2 px-4">The vehicle details were succesfully uploaded.Our team will get back to you soon</p>
           
        </div> -->

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


const store = useAppStore();
const otherImages = ref<Blob[]>([]);
const loading = ref(false);
// const emit = defineEmits(['createInventory']);

 const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };


const createInventory = () => {
  const dataInfo = JSON.parse(localStorage.getItem("dataInfo"));
    console.log(dataInfo);
    loading.value=true;

    const carside = dataURItoBlob(store.$state.form.images["car_side"]);
    const carfrontangle = dataURItoBlob(store.$state.form.images["car_front_angle"]);
    const carbackangle = dataURItoBlob(store.$state.form.images["car_back_angle"]);
    const carseats = dataURItoBlob(store.$state.form.images["car_seats"]);
    const cardash = dataURItoBlob(store.$state.form.images["car_dash"]);

    otherImages.value.push(carfrontangle, carbackangle, carseats, cardash);

    

    const formData1 = new FormData();

    formData1.append( 'cf_1982', 'tradin');
    formData1.append('cf_2011', 'under review');
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
    formData1.append('cf_1290', store.$state.form.vehicle_vin);
    var vinjsonstring = JSON.stringify(dataInfo, null);
    formData1.append("vinjson", vinjsonstring);
    formData1.append('main_img', carside, `main_image.${carside.type.split('/')[1]}`);
    formData1.append('inspect_img', carside, `inspect_image.${carside.type.split('/')[1]}`);

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

    for (let i = 0; i < otherImages.value.length; i++) {
  const imgFile = otherImages.value[i];

  // Get the MIME type and extract the extension
  const mimeType = imgFile.type;
  const extension = mimeType.split('/')[1]; // Extracting 'jpeg', 'png', etc.

  // Append to FormData with dynamic extension
  formData1.append(`img_${i + 1}`, imgFile, `image_${i + 1}.${extension}`);
}
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

const updateInventory = () => {
    loading.value=true;
    
    const invData = new URLSearchParams({
    'token': "jIy6ZSSH4MiScCOTLXy2z0lU8wDbIGIMMBPhFpWAL2mAo1fByOalOIuxiXAVbKaw",
    'productid': localStorage.getItem('selProduct'),
    'cf_2011': 'under review',
    'cf_1290': store.$state.form.vehicle_vin,
    'cf_1995': store.$state.form.replace_vehicle,
    'cf_1997': store.$state.form.replace_vehicle_details,
    'cf_1987': store.$state.form.vehicle_desc,
    'cf_1288': store.$state.form.vehicle_info.mileage,
    'cf_2007': store.$state.form.vehicle_info.asking_price,
    'cf_1989': store.$state.form.vehicle_condition.accidents,
    'cf_1991': store.$state.form.vehicle_condition.damages,
    'cf_1993': store.$state.form.vehicle_condition.damages_details,
    'cf_1999': store.$state.form.vehicle_condition.lien,
    'cf_2003': store.$state.form.vehicle_condition.lien_amount,
    'cf_2005': store.$state.form.vehicle_condition.lender
    })

    const str_invData = invData.toString();
    

    $fetch("https://exride.easypear.com/updateProduct.php?"+str_invData, {
    method: 'GET',
  }).then( response => {

    // const data = JSON.parse(response).result;
    console.log(response);
    localStorage.setItem("success", "ok");
          loading.value=false;
          reloadNuxtApp({
          path: "/",
          ttl: 1000, // default 10000
        });
  })

}




onMounted(() => {
  if(localStorage.getItem("edit")){
    updateInventory();
  }else{
    createInventory();
  }
  
})
</script>