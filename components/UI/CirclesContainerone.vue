<template>
  <div class="w-full relative">
    <div
      class="w-[336px] h-[336px] rounded-full bg-secondary absolute left-[80px] top-[10px]" :class="animation"
    ></div>
    <div
      class="w-[462px] h-[462px] rounded-full bg-primary absolute left-[303px] top-[30px]" :class="animation"
    ></div>
    <div
      class="w-[544px] h-[544px] rounded-full bg-tertiary absolute left-[160px] top-[250px]" :class="animation"
    ></div>
    <img
      :src="photo"
      class="relative left-[230px]" :class="animation"
      alt=""
    />
  </div>
</template>


<script setup  lang="ts">
 const props = defineProps({
        photo:{
            type:String,
        },
        animation:{
          type:String,
          default:'animation-from-bottom'
        }
 })

 


</script>



<style scoped>

@keyframes from-bottom {
  0% {
      opacity: 0;
      transform: translateY(30%)
  }

  to {
      opacity: 1;
      transform: translateY(0)
  }
}

@keyframes from-top {
    0% {
        opacity: 1;
        transform: translateY(0)
    }

    to {
        opacity: 0;
        transform: translateY(30%)
    }
}




.animation-from-bottom {
  --duration: 2s;
  animation: from-bottom var(--duration) var(--ease-fn) .2s 1 forwards;
}
.animation-from-top {
  --duration: 2s;
  animation: from-top var(--duration) var(--ease-fn) .2s 1 forwards;
}

</style>