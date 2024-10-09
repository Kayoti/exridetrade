<template>
  <div class="w-full relative">
    <div
      class="w-[280px] h-[280px] rounded-full bg-secondary absolute left-[220px] top-[550px]" :class="animation"
    ></div>
    <div
      class="w-[400px] h-[400px] rounded-full bg-primary absolute left-[230px] top-[200px]" :class="animation"
    ></div>
    <div
      class="w-[533px] h-[533px] rounded-full bg-tertiary absolute left-0 top-[150px]" :class="animation"
    ></div>
    <img
      :src="photo"
      class="relative left-0 top-[110px]" :class="animation"
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