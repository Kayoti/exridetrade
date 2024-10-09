<template>
      <div class=" w-full flex flex-col items-start space-y-2 fieldWrapper ">
                <label :for="label" class=" text-[#fafafa] text-sm font-bold font-pnova" :class="{'invisible':label === 'none'}">{{label}}</label>
                <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" name="" :id="label" class=" w-full input outline-none focus:ring ring-[#36bbbc] rounded-lg bg-[#fff] border border-[#d9d9d9] text-[gray] h-[48px] p-2">
                    <option value="" disabled selected>{{placeholder}}</option>
                    <option :value="year"  v-for="(year,index,key) in options" :key="key">{{year}}</option>
                </select>
      </div>
</template>



<script setup>
defineProps(['modelValue','label','options','placeholder'])
defineEmits(['update:modelValue'])
</script>

<style scoped>
.fieldWrapper select{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E);
    background-position: right .7rem top 50%;
    background-repeat: no-repeat;
    background-size: .65rem auto;
}
</style>