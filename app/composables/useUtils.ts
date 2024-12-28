import axios from 'axios'
import { useAppStore } from '@/stores/app'

export const useUtils = (emit: (event: string) => void) => {
  const store = useAppStore()
  const formData = new FormData()

  const handleFile = (e: any, item: string) => {
    const holderPic = document.getElementById(item)

    if (!holderPic) {
      console.error(`Element with id ${item} not found.`)
      return
    }

    const selectedFile = e.target.files[0]

    if (!selectedFile) {
      console.error('No file selected.')
      return
    }

    const reader = new FileReader()

    reader.onload = async (e) => {
      // Get the Base64 encoded string
      const base64Image = e.target.result as string
      holderPic.setAttribute('src', base64Image)

      // Store the image in the state
      store.$state.form.images[item.replaceAll('-', '_')] = base64Image
      localStorage.setItem('form', JSON.stringify(store.$state.form))

      // Call submitFile to handle the image upload
      await submitFile(selectedFile, item)
    }

    // Read the selected file as a Data URL (Base64)
    reader.readAsDataURL(selectedFile)
  }

  const submitFile = async (file: File, item: string) => {
    formData.append(item, file)

    try {
      const response = await axios.post(
        'https://exride.easypear.com/test_images.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (response.data.status === 'success') {
        // Success message using standard alert
        alert('Photo uploaded successfully')

        const respKey = Object.keys(response.data.resp)[0]
        const respValue = response.data.resp[respKey]

        // Update drivefiles in localStorage
        const drivefiles = JSON.parse(localStorage.getItem('drivefiles')) || {}
        drivefiles[respKey] = respValue
        localStorage.setItem('drivefiles', JSON.stringify(drivefiles))

        // Emit 'Next' to trigger next step
        emit('Next')
      }
    } catch (error) {
      console.error('Error uploading file or updating lead:', error)
      // Error message using standard alert
      alert('Something went wrong. Please try again later.')
    }
  }

  return {
    handleFile,
    submitFile
  }
}
