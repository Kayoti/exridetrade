import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const form = ref({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    otp: '',
    vehicle_vin: '',
    all_car_info: '',
    replace_vehicle: 'No',
    replace_vehicle_details: '',
    vehicle_desc: '',
    vehicle_info: {
      year: '',
      make: '',
      model: '',
      mileage_unit: '',
      mileage: '',
      trim: '',
      options: [],
      asking_price: ''
    },
    vehicle_condition: {
      accidents: 'No',
      damages: 'No',
      damages_details: '',
      lien: 'No',
      lien_amount: '',
      lender: ''
    },
    images: {
      car_side: '',
      car_back_angle: '',
      car_front_angle: '',
      car_seats: '',
      car_dash: ''

    },
    vehicle_location: {
      location: '',
      prov: '',
      city: '',
      street_number: '',
      code: '',
      route: '',
      country: ''
    }

  })

  // reset form
  function resetForm() {
    console.log('resetting form')
    form.value = {
      phone: '',
      email: '',
      otp: '',
      vehicle_vin: '',
      all_car_info: ''
    }

    form.value.vehicle_info = {
      year: '',
      make: '',
      model: '',
      trim: '',
      mileage_unit: '',
      mileage: ''
      // options: [],
    }
  }

  return { form, resetForm }
})
