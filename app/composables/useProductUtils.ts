// useProductUtils.ts
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

export const useProductUtils = () => {
  const store = useAppStore()
  const otherImages = ref<Blob[]>([])
  const loading = ref(false)

  // Function to convert data URI to Blob
  const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: mimeString })
  }

  // Function to handle inventory creation

  const createInventory = async () => {
    const dataInfo = JSON.parse(localStorage.getItem('dataInfo'))
    console.log(dataInfo)
    loading.value = true

    handleLoading()

    try {
      const carside = dataURItoBlob(store.$state.form.images['car_side'])
      const carfrontangle = dataURItoBlob(
        store.$state.form.images['car_front_angle']
      )
      const carbackangle = dataURItoBlob(
        store.$state.form.images['car_back_angle']
      )
      const carseats = dataURItoBlob(store.$state.form.images['car_seats'])
      const cardash = dataURItoBlob(store.$state.form.images['car_dash'])

      otherImages.value.push(carfrontangle, carbackangle, carseats, cardash)

      const formData1 = new FormData()
      formData1.append('cf_1982', 'tradin')
      formData1.append('cf_2011', 'under review')
      formData1.append('cf_1280', dataInfo['year'] ?? '')
      formData1.append('cf_1282', dataInfo['make'] ?? '')
      formData1.append('cf_1292', store.$state.form.vehicle_vin ?? '')
      formData1.append('cf_1284', dataInfo['model'] ?? '')
      formData1.append('cf_1286', dataInfo['trim'] ?? '')
      formData1.append('cf_1457', dataInfo['body_style_desc'] ?? '')
      formData1.append('cf_1461', dataInfo['transmission'] ?? '')
      formData1.append('cf_1288', dataInfo['Milage'] ?? '') // Mileage
      formData1.append(
        'productname',
        `${dataInfo['year'] ?? ''} ${dataInfo['make']?.toUpperCase() ?? ''} ${
          dataInfo['model'] ?? ''
        } ${dataInfo['trim'] ?? ''}`
      ) // Product name
      formData1.append('cf_1327', dataInfo['ABS'] ?? '') // ABS
      formData1.append(
        'cf_1329',
        dataInfo['Acceleration 0-100 km/h (s)'] ?? ''
      ) // Acceleration
      formData1.append('cf_1331', dataInfo['CO2 Emission (g/km)'] ?? '') // CO2 Emission
      formData1.append('cf_1333', dataInfo['Check Digit'] ?? '') // Check Digit
      formData1.append('cf_1335', dataInfo['drive_type_desc'] ?? '') // Drive
      formData1.append('cf_1337', dataInfo['Engine Code'] ?? '') // Engine Code
      formData1.append('cf_1339', dataInfo['Engine Compression Ratio'] ?? '') // Engine Compression Ratio
      formData1.append('cf_1341', dataInfo['Engine Cylinder Bore (mm)'] ?? '') // Engine Cylinder Bore
      formData1.append('cf_1343', dataInfo['engine_cylinder_cnt'] ?? '') // Engine Cylinders
      formData1.append('cf_1345', dataInfo['engine_block_type'] ?? '') // Engine Block Type
      formData1.append(
        'cf_1347',
        dataInfo['engine_displacement_cubic_cm'] ?? ''
      ) // Engine Displacement
      formData1.append('cf_1349', dataInfo['engine_model'] ?? '') // Engine Model
      formData1.append('cf_1351', dataInfo['Engine Oil Capacity (l)'] ?? '') // Engine Oil Capacity
      formData1.append('cf_1353', dataInfo['Engine Power (kW)'] ?? '') // Engine Power
      formData1.append('cf_1355', dataInfo['Engine RPM'] ?? '') // Engine RPM
      formData1.append('cf_1357', dataInfo['Engine Stroke (mm)'] ?? '') // Engine Stroke
      formData1.append('cf_1359', dataInfo['Engine Turbine'] ?? '') // Engine Turbine
      formData1.append('cf_1361', dataInfo['Front Overhang (mm)'] ?? '') // Front Overhang
      formData1.append('cf_1363', (dataInfo['fuel_cpcty_gallons'] ?? 0) * 3.78) // Fuel Capacity (liters)
      formData1.append('cf_1365', dataInfo['Fuel System'] ?? '') // Fuel System
      formData1.append('cf_1367', dataInfo['Made'] ?? '') // Made
      formData1.append('cf_1369', dataInfo['Market'] ?? '') // Market
      formData1.append('cf_1371', dataInfo['Max Speed (km/h)'] ?? '') // Max Speed
      formData1.append('cf_1373', dataInfo['door_cnt'] ?? '') // Number of Doors
      formData1.append('cf_1375', dataInfo['Number of Gears'] ?? '') // Number of Gears
      formData1.append('cf_1377', dataInfo['Number of Seats'] ?? '') // Number of Seats
      formData1.append(
        'cf_1379',
        dataInfo['Permitted trailer load without brakes (kg)'] ?? ''
      ) // Trailer Load
      formData1.append('cf_1381', dataInfo['manufacturer'] ?? '') // Manufacturer
      formData1.append('cf_1383', dataInfo['vehicle_type'] ?? '') // Vehicle Type
      formData1.append('cf_1385', dataInfo['Production Started'] ?? '') // Production Started
      formData1.append('cf_1387', dataInfo['Rear Overhang (mm)'] ?? '') // Rear Overhang
      formData1.append('cf_1389', dataInfo['Sequential Number'] ?? '') // Sequential Number
      formData1.append('cf_1391', dataInfo['Series'] ?? '') // Series
      formData1.append('cf_1393', dataInfo['Steering Type'] ?? '') // Steering Type
      formData1.append('cf_1395', dataInfo['Valves per Cylinder'] ?? '') // Valves per Cylinder
      formData1.append('cf_1397', dataInfo['Wheelbase (mm)'] ?? '') // Wheelbase
      formData1.append('cf_1443', dataInfo['Power Steering'] ?? '') // Power Steering
      formData1.append('cf_1445', dataInfo['Plant Country'] ?? '') // Plant Country
      formData1.append('cf_1447', dataInfo['Fuel Type - Primary'] ?? '') // Fuel Type Primary
      formData1.append('cf_1449', dataInfo['Engine Position'] ?? '') // Engine Position
      formData1.append('cf_1451', dataInfo['Manufacturer Address'] ?? '') // Manufacturer Address
      formData1.append('cf_1453', dataInfo['Front Suspension'] ?? '') // Front Suspension
      formData1.append('appKey', '40574819b71a57cc7bfe4ab6b05fcb1f')
      formData1.append('captureProduct', true) // Capture Product

      formData1.append('cf_1290', store.$state.form.vehicle_vin)
      const vinjsonstring = JSON.stringify(dataInfo, null)
      formData1.append('vinjson', vinjsonstring)

      // Handle other images
      otherImages.value.forEach((imgFile, index) => {
        const mimeType = imgFile.type
        const extension = mimeType.split('/')[1]
        formData1.append(
          `img_${index + 1}`,
          imgFile,
          `image_${index + 1}.${extension}`
        )
      })

      const response = await useFetch(
        'https://exride.easypear.com/modules/Webforms/captureProduct.php',
        {
          method: 'POST',
          body: formData1
        }
      )

      console.log(response.data)
      const data = JSON.parse(response.data.value).result
      console.log(data)
      const idParts = data.id.split('x')
      console.log(idParts)

      const attach_lead_inv = new URLSearchParams({
        token: '293o9u239du823dilY0k4RLJxN2dJFoP',
        id: localStorage.getItem('leadid'),
        inventoryid: idParts[1]
      })

      const attach_str = attach_lead_inv.toString()
      const attach_lead_url
        = 'https://exride.easypear.com/carlist.php?' + attach_str
      console.log(attach_lead_url)

      const responseAttachLead1 = await $fetch(attach_lead_url, {
        method: 'GET'
      })
      console.log(responseAttachLead1)

      const attach_lead_inv2 = new URLSearchParams({
        token:
          'jIy6ZSSH4MiScCOTLXy2z0lU8wDbIGIMMBPhFpWAL2mAo1fByOalOIuxiXAVbKaw',
        leadid: localStorage.getItem('leadid'),
        productid: idParts[1]
      })

      const attach_str2 = attach_lead_inv2.toString()
      const attach_lead_url2
        = 'https://exride.easypear.com/createLeadProd.php?' + attach_str2
      console.log(attach_lead_url2)

      const responseAttachLead2 = await $fetch(attach_lead_url2, {
        method: 'GET'
      })
      console.log(responseAttachLead2)

      handleLoading() // Clear the loading screen
      loading.value = false

      // Return success result
      return {
        success: true,
        message: 'Inventory created and lead attached successfully.',
        data: responseAttachLead2
      }
    } catch (error) {
      console.error(error)
      handleLoading() // Ensure loading screen is cleared on error
      loading.value = false

      // Return error result
      return {
        success: false,
        message: error.message || 'An error occurred while creating inventory.',
        error: error
      }
    }
  }

  async function updateInventory() {
    loading.value = true

    const invData = new URLSearchParams({
      token: 'jIy6ZSSH4MiScCOTLXy2z0lU8wDbIGIMMBPhFpWAL2mAo1fByOalOIuxiXAVbKaw',
      productid: localStorage.getItem('selProduct'),
      cf_2011: 'under review',
      cf_1290: store.$state.form.vehicle_vin,
      cf_1995: store.$state.form.replace_vehicle,
      cf_1997: store.$state.form.replace_vehicle_details,
      cf_1987: store.$state.form.vehicle_desc,
      cf_1288: store.$state.form.vehicle_info.mileage,
      cf_2007: store.$state.form.vehicle_info.asking_price,
      cf_1800: store.$state.form.vehicle_info.asking_price,
      cf_1989: store.$state.form.vehicle_condition.accidents,
      cf_1991: store.$state.form.vehicle_condition.damages,
      cf_1993: store.$state.form.vehicle_condition.damages_details,
      cf_1999: store.$state.form.vehicle_condition.lien,
      cf_2003: store.$state.form.vehicle_condition.lien_amount,
      cf_2005: store.$state.form.vehicle_condition.lender
    })

    const str_invData = invData.toString()

    await useFetch(
      'https://exride.easypear.com/updateProduct.php?' + str_invData,
      {
        method: 'GET'
      }
    ).then((response) => {
      // const data = JSON.parse(response).result;
      console.log(response)
      updateImages()
    })
  }

  async function updateImages() {
    const dataInfo = JSON.parse(localStorage.getItem('dataInfo'))
    console.log(dataInfo)
    loading.value = true

    const carside = store.$state.form.images['car_side'].startsWith(
      'data:image/'
    )
      ? dataURItoBlob(store.$state.form.images['car_side'])
      : ''
    const carfrontangle = store.$state.form.images[
      'car_front_angle'
    ].startsWith('data:image/')
      ? dataURItoBlob(store.$state.form.images['car_front_angle'])
      : ''
    const carbackangle = store.$state.form.images['car_back_angle'].startsWith(
      'data:image/'
    )
      ? dataURItoBlob(store.$state.form.images['car_back_angle'])
      : ''
    const carseats = store.$state.form.images['car_seats'].startsWith(
      'data:image/'
    )
      ? dataURItoBlob(store.$state.form.images['car_seats'])
      : ''
    const cardash = store.$state.form.images['car_dash'].startsWith(
      'data:image/'
    )
      ? dataURItoBlob(store.$state.form.images['car_dash'])
      : ''

    otherImages.value.push(carfrontangle, carbackangle, carseats, cardash)

    const formData = new FormData()

    formData.append('appKey', '40574819b71a57cc7bfe4ab6b05fcb1f')
    formData.append('updateProduct', true)
    formData.append('cf_1290', store.$state.form.vehicle_vin ?? '')
    formData.append('leadid', localStorage.getItem('selProduct'))
    formData.append(
      'main_img',
      carside || new Blob(),
      carside ? `main_image.${carside.type.split('/')[1]}` : undefined
    )
    formData.append(
      'inspect_img',
      carside || new Blob(),
      carside ? `inspect_image.${carside.type.split('/')[1]}` : undefined
    )

    for (let i = 0; i < otherImages.value.length; i++) {
      const imgFile = otherImages.value[i]

      if (imgFile && imgFile.type) {
        // Get the MIME type and extract the extension
        const mimeType = imgFile.type
        const extension = mimeType.split('/')[1] // Extracting 'jpeg', 'png', etc.

        // Append to FormData with dynamic extension
        formData.append(`img_${i + 1}`, imgFile, `image_${i + 1}.${extension}`)
      } else {
        console.warn(`Image file at index ${i} is invalid or missing type.`)
        // Optionally, append a placeholder or handle this case explicitly
        formData.append(`img_${i + 1}`, new Blob(), `image_${i + 1}`)
      }
    }

    await useFetch(
      'https://exride.easypear.com/modules/Webforms/update_cdn.php',
      {
        method: 'POST',
        body: formData
      }
    ).then((response) => {
      console.log(response)
      localStorage.setItem('success', 'ok')
      loading.value = false

      /** *      reloadNuxtApp({
        path: '/dashboard',
        ttl: 1000 // default 10000
      }) */
    })
  }

  const handleLoading = () => {
    const container = document.getElementById('main-container')
    const uContainer = document.getElementById('u-container')
    const header = document.getElementById('app-header')
    const footer = document.getElementById('app-footer')

    const existingLoadingScreen = document.getElementById('loading-screen')
    if (existingLoadingScreen) {
      existingLoadingScreen.remove()
      if (uContainer) uContainer.style.display = 'block'
      if (header) header.style.display = 'block'
      if (footer) footer.style.display = 'block'
      return
    }

    const loadingScreen = document.createElement('div')
    loadingScreen.id = 'loading-screen'
    loadingScreen.classList.add('loading-screen')

    loadingScreen.innerHTML = `
    <div class="spinner-container">
      <div class="spinner"></div>
      <p class="loading-text">UPLOADING</p>
    </div>
  `

    container.insertBefore(loadingScreen, container.firstChild)

    if (header) header.style.display = 'none'
    if (footer) footer.style.display = 'none'
    if (uContainer) uContainer.style.display = 'none'

    const style = document.createElement('style')
    style.innerHTML = `
    #loading-screen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .spinner-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      width: 110px;
      height: 110px;
      animation: spin 1s linear infinite;
    }

    .loading-text {
      position: absolute;
      color: white;
      font-size: 16px;
      z-index: 10;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    #main-container {
      position: relative;
    }
  `
    document.head.appendChild(style)

    /**    setTimeout(() => {
      const loadingScreenElement = document.getElementById('loading-screen')
      if (loadingScreenElement) {
        loadingScreenElement.remove()
      }

      if (uContainer) uContainer.style.display = 'block'
      if (header) header.style.display = 'block'
      if (footer) footer.style.display = 'block'
    }, 3000) */
  }

  return { dataURItoBlob, createInventory, updateInventory, loading }
}
