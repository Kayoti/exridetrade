<template>
      <div class=" w-full flex flex-col items-start space-y-2">
                <label :for="label" class=" text-[#fafafa] text-sm font-bold font-pnova" :class="{'invisible':label === 'none'}">{{label}}</label>
                <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" name="" :id="label" :placeholder="placeholder" class=" w-full input outline-none focus:ring ring-[#36bbbc] rounded-lg bg-[#fff] border border-[#d9d9d9] text-black h-[48px] p-2">
      </div>
</template>



<script setup>
defineProps(['modelValue','label','type','placeholder'])
defineEmits(['update:modelValue'])
</script>