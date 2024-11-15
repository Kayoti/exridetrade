import { useAppStore } from '@/stores/app';
import axios from 'axios';
import Swal from 'sweetalert2';

export const useUtils = (emit: Function) => {
  const store = useAppStore();
  const files = ref();
  const holderInput = ref('');
  const config = useRuntimeConfig();
  const formData = new FormData();
  const router = useRouter();

 

  const handleFile = (e: any, item: string) => {
    console.log("jkkj");
    const holderPic = document.getElementById(item);

    if (!holderPic) {
      console.error(`Element with id ${item} not found.`);
      return;
    }

    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      // Get the Base64 encoded string
      const base64Image = e.target.result;

      holderPic.setAttribute("src", base64Image);

      // Assuming holderInput and store.$state.form.trade_in_form.images are properly defined
      holderInput.value = base64Image;
      store.$state.form.images[item.replaceAll('-', '_')] = base64Image;

      // Store in local storage
      localStorage.setItem('form', JSON.stringify(store.$state.form));

    };

    // Read the selected file as a Data URL (Base64)
    reader.readAsDataURL(selectedFile);

    // console.log(dataURItoBlob(store.$state.form.images["car_side"]))

    // formData.append(holderPic.name, dataURLtoFile(holderPic.src, holderPic.name));
    // formData.append(holderPic.name, selectedFile);
    // formData.append('leadid', localStorage.getItem('leadid'));

    // submitFile();
    Swal.fire({
      title: 'Success!',
      text: 'Photo uploaded successfully',
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#E1251B',
    }).then((result) => {
      if (result.isConfirmed) {
    // emit('Next');
      }
    })

  };

  const submitFile = async () => {

    try {
      const response = await axios.post('https://exride.easypear.com/test_images.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response);

      if (response.data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: 'Photo uploaded successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#E1251B',
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log(response.data.resp)
            // const recordId = localStorage.getItem('leadid') || ''; // Fallback to an empty string if null
            if (response.data.resp) {
              // Extract the first key and its value from the response
              const respKey = Object.keys(response.data.resp)[0]; // e.g., "car_side"
              const respValue = response.data.resp[respKey]; // The value associated with "car_side"
            
              // Dynamically create the new drivefile entry
              const newDrivefile = {
                [respKey]: respValue // Use the value of respKey as the key
              };
            
              // Retrieve the existing drivefiles object from localStorage (if it exists)
              let drivefiles = JSON.parse(localStorage.getItem('drivefiles'));
            
              // If drivefiles is not an object, initialize it as an empty object
              if (typeof drivefiles !== 'object' || drivefiles === null) {
                drivefiles = {};
              }
            
              // Update or add the new entry to the drivefiles object
              drivefiles[respKey] = respValue;
            
              // Store the updated object in localStorage as a JSON string
              localStorage.setItem('drivefiles', JSON.stringify(drivefiles));
            
              // Redirect after saving
              // router.push('/photos-upload');
              emit('Next');
              // window.location.reload();
            }
            



            // Create a URLSearchParams object with proper formatting
            // const vtiger_data_update_lead = new URLSearchParams();
            // vtiger_data_update_lead.append('recordId', recordId);
            // vtiger_data_update_lead.append('drivefiles', respValue);

            // const vtiger_update_url = "https://exride.easypear.com/modules/Webforms/update_lead.php?" + vtiger_data_update_lead.toString();

            // // Fetch the update URL
            // const updateResponse = await $fetch(vtiger_update_url, {
            //   method: 'GET',
            // });

            // console.log(updateResponse);

            // Navigate to the photos upload page after the update
            // setTimeout(() => {
            //   router.push('/photos-upload');
            // }, 0);
          }
        });
      }
    } catch (error) {
      console.error('Error uploading file or updating lead:', error);
    }
  };

  // Example usage:
  // handleFile(event, 'image-1');


  return {
    handleFile,
    submitFile
  }
};