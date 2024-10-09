<template>
  <div class="w-full relative">
    <div
      class="w-[590px] h-[590px] rounded-full bg-secondary absolute left-[0px] top-[100px] z-20 overflow-hidden" :class="animation"
    >
    <img :src="photo" class=" absolute left-[70px] top-[70px] animation-from-bottom"  alt="">
    </div>
    <div
      class="w-[417px] h-[417px] rounded-full bg-primary absolute left-[250px] top-[570px]" :class="animation"
    ></div>
    <div
      class="w-[283px] h-[283px] rounded-full bg-tertiary absolute left-[130px] top-[660px] z-10" :class="animation"
    ></div>
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