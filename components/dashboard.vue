<template>
  <Header />
  <!-- <div class="" style="background-color: white !important;"> -->

  <div class="flex flex-col md:flex-row justify-around mx-5 sm:mx-0" v-show="logedin">

    <div v-if="isOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      @click.self="closeModal">
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center border-b pb-3">
          <h3 class="text-lg font-semibold"></h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div class="py-4">
          <!-- Modal content goes here -->
          <p>Are you sure you want to delete this listing?</p>
        </div>
        <div class="flex justify-end pt-2">
          <button @click="delProduct()"
            class="px-4 py-2 outline outline-1 outline-red-600 hover:text-white rounded hover:bg-red-600 me-2">
            Delete
          </button>
          <button @click="closeModal"
            class="px-4 py-2 outline outline-1 outline-blue-600 hover:text-white rounded hover:bg-blue-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col rounded-xl border-2 items-center h-[70vh]  my-4">

      <div class="bg-[#0ea5e9] w-11/12 h-20 rounded-lg mt-5"></div>

      <p class="font-bold text-[24px] mt-">{{ lead.firstname }} {{ lead.lastname }}</p>


      <div
        class="border border-2 text-center hover:border-red-600 py-1 hover:text-red-600 p-2 rounded-xl w-40 mt-3 cursor-pointer">

        <p class="font-bold text-sm ms-2" @click="Logout()">SIGN OUT</p>
      </div>





      <!-- <button class="bg-[#fff] p-2 rounded-full" >Sign-out</button> -->

      <p class="text-center text-sm text-gray-400 mt-3">Email</p>
      <p class="text-center font-bold text-sm"><span v-if="!lead.email">N/A </span>{{ lead.email }}</p>

      <p class="text-center text-sm text-gray-400 mt-3">Phone</p>
      <p class="text-center font-bold text-sm"><span v-if="lead.phone">+1 </span> <span v-if="!lead.phone">N/A </span>{{
        lead.phone }}</p>

      <p class="text-center text-sm text-gray-400 mt-3">Address</p>
      <p class="text-center font-bold text-sm w-1/2"><span v-if="!lead.cf_939">N/A </span>{{ lead.cf_939 }}</p>

    </div>

    <div class=" w-full flex justify-center items-center w-full md:hidden">
    <a class="text-lg rounded-xl py-2 px-4 hover:bg-[#fff] bg-[#0ea5e9] text-[#fff] hover:text-[#0ea5e9] mt-5 hover:outline hover:outline-[#0ea5e9] cursor-pointer"
      @click="Listpr()">+ Add Vehicle</a>
  </div>

    <div class="mt-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 " :class="{'md:grid-cols-1':products.length==1,'md:grid-cols-2':products.length==2, 'md:grid-cols-3':products.length>=3}">

      <div class="" v-for="product in products" :key="product.id">


        <div class="border border-2 w-70 rounded-xl p-3 ">
          <div class="w-full">
  <img
    :src="product[2]['images'] ? product[2]['images']['main'] + '/public' : 'https://nyqtmkpxrtbpvuzuatsa.supabase.co/storage/v1/object/public/vehicle_images/default/frontLeft.jpg'"
    alt="Front left profile"
    class="w-full h-auto max-h-[28vh] sm:max-h-[20vh] object-cover rounded-xl">
</div>

          <div class="mt-5  ">
            <p class="text-sm text-center font-bold mb-3">{{ product[2]['product']['cf_1280'] }} {{
              product[2]['product']['cf_1282'].toUpperCase() }} {{ product[2]['product']['cf_1284'].toUpperCase() }} {{ product[2]['product']['cf_1286'].toUpperCase() }}</p>

            <div class="flex items-center justify-center">
              <hr class="border-t border-2 border-gray-300 flex-grow" />
              <div class="border text-center text-[#fff] p-1 rounded-full w-40 bg-[#f97316]"
                v-if="product[2]['product']['cf_2011']==='under review'">
                <!-- <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div> -->
                <p class="font-bold text-sm ms-2">Under Review</p>
              </div>

              <div class="border text-center text-[#fff] p-1 rounded-full w-40 bg-[#22c55e]"
                v-if="product[2]['product']['cf_2011']==='publish'">
                <!-- <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div> -->
                <p class="font-bold text-sm ms-2">Published</p>
              </div>

              <div class="border text-center text-[#fff] p-1 rounded-full w-40 bg-[#dc2626]"
                v-if="product[2]['product']['cf_2011']==='draft'">
                <!-- <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div> -->
                <p class="font-bold text-sm ms-2">Draft</p>
              </div>

              <hr class="border-t border-2 border-gray-300 flex-grow" />
            </div>

            <p class="text-center text-sm text-gray-400 mt-3">Mileage</p>
            <p class="text-center font-bold text-sm">{{ product[2]['product']['cf_1288'] }} KM</p>

            <p class="text-center text-sm text-gray-400 mt-3">Asking Price</p>
            <p class="text-center font-bold text-sm">$ {{ product[2]['product']['cf_2007'] }} CAD</p>

          </div>

          <div class="flex flex-row h-full justify-around text-sm  mt-5">

            <button
              class="rounded-full py-1 outline outline-1 outline-[#0ea5e9] hover:bg-[#0ea5e9] text-[#0ea5e9] hover:text-white w-20"
              @click="editProduct(product[2]['product']['productid'] )">Edit</button>
            <button
              class="rounded-full outline outline-1 outline-red-600 py-1 text-red-600 hover:bg-red-600 hover:text-white w-20"
              @click="openModal(product[2]['product']['productid'])">Delete</button>

          </div>

        </div>



      </div>
    </div>
    <div class=" w-full md:flex justify-center items-center w-full hidden">
    <a class="text-lg rounded-xl py-2 px-4 hover:bg-[#fff] bg-[#0ea5e9] text-[#fff] hover:text-[#0ea5e9] mt-5 hover:outline hover:outline-[#0ea5e9] cursor-pointer"
      @click="Listpr()">+ Add Vehicle</a>
  </div>
    </div>
    
   
  </div>
 

  <!-- </div> -->
</template>

<script setup lang="ts">
import { reloadNuxtApp } from "nuxt/app";
import { useAppStore } from '@/stores/app';

const logedin = ref(false);
const router = useRouter();
const lead = ref({});
const products = ref([]);
const success = ref("");
const store = useAppStore();
const emit = defineEmits(['next'])
const delProd = ref("")
const { firebaseLogout } = useFirebaseAuth();


const isOpen = ref(false);

const openModal = (selProduct: string) => {
  
  delProd.value = selProduct;
  isOpen.value = true;
  console.log(delProd)
};

const closeModal = () => {
  isOpen.value = false;
};

const delProduct= () => {
  const delData = new URLSearchParams({
    'token': "jIy6ZSSH4MiScCOTLXy2z0lU8wDbIGIMMBPhFpWAL2mAo1fByOalOIuxiXAVbKaw",
    'productid': delProd.value,
    })

    const str_delData = delData.toString();
    console.log(str_delData)

    $fetch("https://exride.easypear.com/delProduct.php?"+str_delData, {
    method: 'GET',
  }).then( response => {

    // const data = JSON.parse(response).result;
    console.log(response);

          reloadNuxtApp({
          path: "/",
          ttl: 1000, // default 10000
        });
  })
}

 async function getLead() {
    const formData = new FormData();
     console.log(localStorage.getItem("leadid"));
    const leadid = localStorage.getItem("leadid");

            formData.append('mode', 'getLeadById');
            formData.append('leadid',  leadid);
        

        $fetch("https://exride.easypear.com/modules/TradeInPortal/process.php",
        {
            method: 'POST',
            body: formData,
        }).then((response) => {
            console.log(JSON.parse(response))
            if(JSON.parse(response)['status'] === "success"){
                lead.value =  JSON.parse(response)['data'];
                console.log(lead);
                
            }

            const get_lead_inv = new URLSearchParams({
            'token': "jIy6ZSSH4MiScCOTLXy2z0lU8wDbIGIMMBPhFpWAL2mAo1fByOalOIuxiXAVbKaw",
            'leadid': localStorage.getItem('leadid'),
          });

          const get_str = get_lead_inv.toString();

          const get_lead_url = "https://exride.easypear.com/getLeadProd.php?" + get_str;
        console.log(get_lead_url)

        $fetch(get_lead_url, {
            method: 'GET',
        }).then(response => {
          console.log(JSON.parse(response))
          const responseData = JSON.parse(response);

  // Check if there are items
  if (responseData.length) {
    // Prepare an array of Promises to handle all fetch requests
    const fetchPromises = responseData.map((item: { product_id: any; }) => {
      const get_inv = new URLSearchParams({
        'token': "jIy6ZSSH4MiScCOTLXy2z0lU8wDbIGIMMBPhFpWAL2mAo1fByOalOIuxiXAVbKaw",
        'productid': item.product_id,
      });

      const get_str = get_inv.toString();
      const get_inv_url = "https://exride.easypear.com/getProduct.php?" + get_str;

      // Fetch for each product
      return $fetch(get_inv_url, {
        method: 'GET',
      }).then((productResponse) => JSON.parse(productResponse));
    });

    // Once all the fetches are completed, update the `products` array
    Promise.all(fetchPromises).then((allProducts) => {
      products.value = products.value.concat(allProducts);
      console.log('Fetched products:', products.value);
    }).catch((error) => {
      console.error('Error fetching products:', error);
    });
  }


        })


        })
}
getLead();

const editProduct = (selProduct: string) => {
  console.log(selProduct)
  
  console.log(products);
  for (let item of products.value) {
    const product = item["2"].product;
    const images = item["2"].images;
    console.log( images)
    if (product.productid === selProduct ) {
      console.log(product);

      store.$state.form.vehicle_vin = product['cf_1290'];
      store.$state.form.replace_vehicle = product['cf_1995'];
      store.$state.form.replace_vehicle_details = product['cf_1997'];
      store.$state.form.vehicle_desc = product['cf_1987'];
      store.$state.form.vehicle_info.mileage = product['cf_1288'];
      store.$state.form.vehicle_info.asking_price = product['cf_2007'],
      store.$state.form.vehicle_condition.accidents= product['cf_1989'],
      store.$state.form.vehicle_condition.damages= product['cf_1991'],
      store.$state.form.vehicle_condition.damages_details = product['cf_1993'];
      store.$state.form.vehicle_condition.lien = product['cf_1999'];
      store.$state.form.vehicle_condition.lien_amount = product['cf_2003'],
      store.$state.form.vehicle_condition.lender = product['cf_2005'];
      store.$state.form.vehicle_info.year = product['cf_1280'];
      store.$state.form.vehicle_info.make = product['cf_1282'];
      store.$state.form.vehicle_info.model = product['cf_1284'];
      store.$state.form.vehicle_info.trim = product['cf_1286'];
      store.$state.form.images.car_side = images?images['main'] + '/public':'';
      store.$state.form.images.car_front_angle =  images?images['1'] + '/public':'';
      store.$state.form.images.car_back_angle =  images?images['2'] + '/public':'';
      store.$state.form.images.car_seats =  images?images['3'] + '/public':'';
      store.$state.form.images.car_dash =  images?images['4'] + '/public':'';

      console.log(store.$state.form.vehicle_info.model);

      localStorage.setItem('form', JSON.stringify(store.$state.form));
      localStorage.setItem('edit', '1');
      localStorage.setItem('selProduct', selProduct);
      emit('Next');

    }
  }

}

const Logout = () => {
  localStorage.removeItem("app_user")
  firebaseLogout()
  localStorage.removeItem("leadid")


  logedin.value = false;
  router.currentRoute

  reloadNuxtApp({
  path: "/",
  ttl: 1000, // default 10000
});
 }

 const Listpr = () => {
    emit('Next');
 }

onMounted(()=>{
  if (localStorage.getItem("app_user")==="login") {
  logedin.value = true;
}
  localStorage.setItem('form', JSON.stringify(store.$state.form))
  localStorage.removeItem('edit');
localStorage.removeItem('selProduct');
  success.value = localStorage.getItem("success")??'';
  setTimeout(() => {
    success.value = "";
    localStorage.removeItem("success");
  }, 10000);
})

</script>