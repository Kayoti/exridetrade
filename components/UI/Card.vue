<template>
    <div class=" w-full bg-[#39a1a3] rounded-lg py-[16px] px-6 space-y-4">
            <div class=" w-full flex items-center justify-between">
                <span class=" text-xs font-bold font-pnova text-white">MY VEHICLE:</span>
                <div class=" flex items-start gap-2">
                    <button @click="openEditModal" class=" text-[#fafafa] bg-[rgba(40,114,111,.4)] text-xs font-normal font-pnova py-1 px-[10px] rounded-sm">Edit</button>
                    <button @click="openResetModal" class=" text-[#fafafa] bg-[rgba(40,114,111,.4)] text-xs font-normal font-pnova py-1 px-[10px] rounded-sm">Reset</button>
                </div>
            </div>
              <div class=" w-full flex items-center space-x-4">
                    <img src="https://cdn.canadauto.com/consumer/pelorous-car-icon.png" alt="">
                    <p class=" text-white font-bold text-[28px] leading-[25px] font-pnova">
                        {{store.$state.form.vehicle_info.make}} 
                        <span class=" font-normal">{{store.$state.form.vehicle_info.model}}</span>
                    </p>
             </div>
             <div class=" w-full flex items-center gap-[6px] pt-2">
                <div class=" bg-[rgba(40,114,111,.6)] text-[#fafafa] rounded-sm flex items-center gap-1 text-sm font-semibold font-pnova py-1 px-[10px]">
                   <img src="https://cdn.canadauto.com/consumer/date_range.svg" alt="">
                    <span>{{store.$state.form.vehicle_info.year}}</span>
                </div>
                 <div class=" bg-[rgba(40,114,111,.6)] text-[#fafafa] rounded-sm flex items-center gap-1 text-sm font-semibold font-pnova py-1 px-[10px]">
                   <img src="https://cdn.canadauto.com/consumer/speedometer.svg" alt="">
                    <span>{{store.$state.form.vehicle_info.mileage}} {{store.$state.form.vehicle_info.mileage_unit}}</span>
                </div>
                 <div class=" bg-[rgba(40,114,111,.6)] text-[#fafafa] rounded-sm flex items-center gap-1 text-sm font-semibold font-pnova py-1 px-[10px]">
                   <img src="https://cdn.canadauto.com/consumer/location_on.svg" alt="">
                    <span>{{store.$state.form.vehicle_info.postal_code}}</span>
                </div>
             </div>
    </div>
    <!-- <ResetModal ref="ResetModalRef" /> -->
    <VehicleEditModal ref="VehicleEditModalRef" />
</template>

<script setup>
 import { useAppStore } from '@/stores/app';
 const store = useAppStore();
//  import ResetModal from "@/components/UI/ResetModal.vue"
 import VehicleEditModal from "@/components/UI/VehicleEditModal.vue"
//  const ResetModalRef = ref(null)
 const VehicleEditModalRef = ref(null)
 
//  const openResetModal = () => {
//     ResetModalRef.value.Open();
//  }
 const openEditModal = () => {
    VehicleEditModalRef.value.Open();
 }
</script>