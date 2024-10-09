<template>
<div v-if="show" class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
  <div class="fixed inset-0 bg-black bg-opacity-30  transition-opacity"></div>

  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
     
      <div class="relative transform overflow-hidden rounded-[4px] bg-white text-left px-[35px] py-6   transition-all sm:my-8 sm:w-full sm:max-w-lg" style="box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);">
         <div class=" w-full flex flex-col items-center space-y-2 pt-4">
          <div id="app" class="web-camera-container">
  <!-- <div class="camera-button">
      <button type="button" class="button is-rounded" :class="{ 'is-primary' : !isCameraOpen, 'is-danger' : isCameraOpen}" @click="toggleCamera">
        <span v-if="!isCameraOpen">Open Camera</span>
        <span v-else>Close Camera</span>
    </button>
  </div> -->
  
  <div v-show="isCameraOpen && isLoading" class="camera-loading">
    <ul class="loader-circle">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
  
  <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ 'flash' : isShotPhoto }">
    
    <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div>
      
    <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>
    
    <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
  </div>
  
  <!-- <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
    <button type="button" class="button" @click="takePhoto">
      <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
    </button>
  </div> -->
  
  <!-- <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
    <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
      Download
    </a>
  </div> -->
</div>
         </div>
         <div class=" w-full grid grid-cols-3 gap-8 pt-10">
          <UIBaseButton @click="Close" class=" h- w- py-2 rounded-lg  bg-[#E1251B] text-center text-sm text-white font-semibold border-primary  duration-300">Cancel</UIBaseButton>
          <UIBaseButton v-if="!isPhotoTaken" @click="takePhoto" class=" h- w- py-2   rounded-lg  bg-[#007580] text-center text-sm text-white font-semibold border-primary  duration-300"> Capture Image</UIBaseButton>
          <UIBaseButton v-if="isPhotoTaken && isCameraOpen"  @click="finalImage" class=" h- w- py-2   rounded-lg  bg-[#007580] text-center text-sm text-white font-semibold border-primary  duration-300"> Looks Good!</UIBaseButton>
          <UIBaseButton  v-if="isPhotoTaken && isCameraOpen" @click="takePhoto" class=" h- w- py-2   rounded-lg  bg-[#7239ea] text-center text-sm text-white font-semibold border-primary  duration-300"> Capture Again</UIBaseButton>
           
         </div>
      </div>
    </div>
  </div>
</div>

</template>


<script setup>
 import { useAppStore } from '@/stores/app';
 const store = useAppStore();
 const Direction = useDirection();
 const router = useRouter();

 const isCameraOpen = ref(false);
const isPhotoTaken = ref(false);
const isShotPhoto = ref(false);
const isLoading = ref(false);
const link = ref('#');
const canvas = ref(null);
const camera = ref(null);
 const show = ref(false);

 const emit= defineEmits(["finalImage"]);

//  const toggleCamera = () => {
//       if(isCameraOpen.value) {
//         isCameraOpen.value = false;
//         isPhotoTaken.value = false;
//         isShotPhoto.value = false;
//         stopCameraStream();
//       } else {
//         isCameraOpen.value = true;
//         createCameraElement();
//       }
//     }
    
    const createCameraElement = () => {
      isLoading.value = true;
      
      const constraints = (window.constraints = {
				audio: false,
				video: true
			});


			navigator.mediaDevices
				.getUserMedia(constraints)
				.then(stream => {
          isLoading.value = false;
          // console.log(stream)
					camera.value.srcObject = stream;
          console.log(camera.value.srcObject)
				})
				.catch(error => {
          isLoading.value = false;
					alert("May the browser didn't support or there is some errors.");
				});
    }
    
    const stopCameraStream = () => {
      let tracks = camera.value.srcObject.getTracks();
      
			tracks.forEach(track => {
				track.stop();
			});
    }
    
   const  takePhoto = () => {
    console.log(isPhotoTaken);
      if(!isPhotoTaken.value) {
        isShotPhoto.value = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          isShotPhoto.value = false;
        }, FLASH_TIMEOUT);
      }
      
      isPhotoTaken.value = !isPhotoTaken.value;

      console.log(camera.value);
      
      const context = canvas.value.getContext('2d');
      console.log(context);
      context.drawImage(camera.value, 0, 0, 450, 337.5);
      console.log(context);
    }
    
    const finalImage = () => {
      console.log("jhj");
      
      const download = document.getElementById("downloadPhoto");
      const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg");
      console.log(canvas);

      emit("finalImage", canvas);
      Close();
      // $('.active-image').find('img').attr('src', imageData)
    // .replace("image/jpeg", "image/octet-stream");
    // console.log(canvas);
      // download.setAttribute("href", canvas);
    }

 const Open = () => {
  isCameraOpen.value = true;
        createCameraElement();
    show.value = true;
 }
 const Close = () => {
    show.value = false;
    isCameraOpen.value = false;
        isPhotoTaken.value = false;
        isShotPhoto.value = false;
        stopCameraStream();
 }
//  const StartOver = () => {
//    Direction.value = 1;
//    if(localStorage.getItem('form')){
//      localStorage.removeItem('form')
//      store.resetForm();
//    }
//     Close();
//     router.push('/')
//  }
 defineExpose({
    show,
    Close,
    Open
 })
</script>

