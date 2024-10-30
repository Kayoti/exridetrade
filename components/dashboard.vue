<template>
    <div class="w-full h-full" style="background-color: white !important;">
  
      <!-- BEGINNING OF THE CONTAINER -->
      <div class=" w-full  h-full font-pnova relative ">
        <!-- <div class=" w-[8px] h-full fixed left-0 top-0 bg-tertiary"></div> -->
         
        <div class=" w-full ">
          <Header />
          <div class="flex flex-row justify-center">
            <p class="text-sm mt-[20vh] text-center text-green-500 border w-[20vw] p-3 rounded-lg" v-if="success==='ok'">Listing recorded successfully!</p>
          </div>
         
          <div class=" w-full flex justify-center items-start  ">
            
            <div class="flex flex-col gap-4 w-full  rounded-xl shadow-xl px-10 py-5 mx-[10vw] md:mx-[20vw] bg-[#1E3A8A] " :class="success==='ok'?'mt-[5vh]':'mt-[20vh]'">
                <div class="flex flex-row justify-between">
                <p class="font-bold text-[30px] text-[#fff] ">{{ lead.firstname }} {{ lead.lastname }}</p>
                <button class="bg-[#fff] p-2 rounded-full" @click="Logout()">Sign-out</button>
                </div>
                <p class=" text-[#fff] leading-none"><span v-if="lead.phone">+1 </span> {{ lead.phone }}</p>
                <p class=" text-[#fff] leading-none">{{ lead.email }}</p>
            </div>

          </div>

          <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    @click.self="closeModal"
  >
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
        <button
          @click="delProduct()"
          class="px-4 py-2 outline outline-1 outline-red-600 hover:text-white rounded hover:bg-red-600 me-2"
        >
          Delete
        </button>
        <button
          @click="closeModal"
          class="px-4 py-2 outline outline-1 outline-blue-600 hover:text-white rounded hover:bg-blue-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>

          <!-- <li v-for="product in leads" :key="lead.id" class="mb-2 p-4 border rounded shadow">
            <p><strong>ID:</strong> {{ lead.id }}</p>
          </li> -->

          <div class=" w-full flex justify-center items-start  " v-for="product in products" :key="product.id">
            <div class="flex flex-col gap-4 w-full  rounded-xl   mx-[10vw] md:mx-[20vw] border mt-[5vh]">
                <div class="flex flex-row justify-between">
                    <div class="flex flex-row justify-between">
                        <img src="https://nyqtmkpxrtbpvuzuatsa.supabase.co/storage/v1/object/public/vehicle_images/default/frontLeft.jpg" alt="Front left profile" class="w-20 h-20 rounded-xl">
                        <div class="mt-3 ms-3">
                            <p class="text-sm">{{ product[2]['product']['cf_1280'] }} {{ product[2]['product']['cf_1282'].toUpperCase() }} {{ product[2]['product']['cf_1284'].toUpperCase() }}</p>
                            <div class="flex">
                                <div class="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                                <p class="font-bold text-lg ms-2">Draft</p>
                            </div>
                            
                        </div>

                    </div>

                    <div class="flex flex-row content-center h-full flex-grow justify-end text-sm pr-4">
                        <div class="flex flex-col content-center w-20 justify-center pt-2 gap-y-2">
                            <button class="rounded-full py-1 outline outline-1 outline-blue-600 hover:bg-[#2563EB] hover:text-white w-20" @click="editProduct(product[2]['product']['productid'] )">Edit</button> 
                            <button class="rounded-full outline outline-1 outline-red-600 py-1 hover:bg-red-600 hover:text-white w-20" @click="openModal(product[2]['product']['productid'])">Delete</button>
                        </div>
                    </div>
                
                </div>
                
            </div>

          </div>

          <div class=" w-full flex justify-center    my-5">
            <a class="text-lg rounded-xl py-2 px-4 hover:bg-[#2563EB] hover:text-[#fff] text-black me-10 outline outline-[#2563EB]" @click="Listpr()" >+ Add Vehicle</a>
          </div>

          

        </div>
      </div>
    </div>
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

localStorage.removeItem('edit');
localStorage.removeItem('selProduct');

const isOpen = ref(false);

const openModal = (selProduct) => {
  
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
    // console.log(localStorage.getItem("leadid"));
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
    const fetchPromises = responseData.map((item) => {
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

const editProduct = (selProduct) => {
  console.log(selProduct)
  
  console.log(products);
  for (let item of products.value) {
    const product = item["2"].product;
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
  success.value = localStorage.getItem("success")??'';
  setTimeout(() => {
    success.value = "";
    localStorage.removeItem("success");
  }, 10000);
})

</script>