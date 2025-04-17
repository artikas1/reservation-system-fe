<template>
  <v-container class="pa-6 mt-16">
    <v-card class="bg-white mx-6" style="overflow: auto">
      <div v-for="car in cars" :key="car.id">
        <v-card class="ma-2" style="border: 1px solid #15495A;">
          <v-card-text>
            <v-row>
              <!-- Car image -->
              <v-col cols="12" sm="4" lg="2" class="text-center d-flex align-center justify-center">
                <img
                  v-if="car.image"
                  :src="`data:image/jpeg;base64,${car.image}`"
                  alt="Car image"
                  style="width: 100%; max-width: 180px; border-radius: 8px; object-fit: cover; margin-top: 8px;"
                />
              </v-col>

              <!-- Car details -->
              <v-col cols="12" sm="5" lg="8">
                <div class="text-h6 mb-2">
                  {{ car.manufacturer }} {{ car.model }}
                </div>
                <div class="text-subtitle-2">
                  {{ getBodyTypeText(car.bodyType) }}<br/>
                  {{ getAddressText(car.address) }}
                </div>
              </v-col>

              <!-- Delete button -->
              <v-col cols="12" sm="3" lg="2" class="text-right my-auto">
                <v-btn
                  class="delete"
                  @click="deleteCar(car.id)"
                >
                  Ištrinti
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CarService from '@/services/CarService'
import { useToast } from 'vue-toastification'

interface CarType {
  id: string
  manufacturer: string
  model: string
  image?: string
  bodyType: string
  address: string
  deletedAt?: string | null
}

const cars = ref<CarType[]>([])
const toast = useToast()

const bodyTypeOptions = [
  { text: 'Hečbekas', value: 'HECBEKAS' },
  { text: 'Sedanas', value: 'SEDANAS' },
  { text: 'Universalas', value: 'UNIVERSALAS' },
  { text: 'Minivenas', value: 'MINIVENAS' },
]

const addressOptions = [
  { text: 'Akademijos g. 7', value: 'AKADEMIJOS_G_7' },
  { text: 'Gedimino pr. 9', value: 'GEDIMINO_PR_9' },
  { text: 'Konstitucijos pr. 12', value: 'KONSTITUCIJOS_PR_12' },
  { text: 'Neries g. 3', value: 'NERIES_G_3' },
  { text: 'Saulėtekio al. 15', value: 'SAULETEKIO_AL_15' },
]

const fetchCars = async () => {
  try {
    const allCars = await CarService.getAllCars()
    cars.value = allCars.filter((car: CarType) => !car.deletedAt)
  } catch (error) {
    toast.error('Nepavyko gauti automobilių sąrašo')
  }
}

const deleteCar = async (carId: string) => {
  if (confirm('Ar tikrai norite pašalinti šį automobilį?')) {
    try {
      await CarService.deleteCarById(carId)
      toast.success('Automobilis pašalintas sėkmingai!')
      await fetchCars()
    } catch (error) {
      toast.error('Klaida šalinant automobilį')
    }
  }
}

onMounted(fetchCars)

const getBodyTypeText = (bodyType: string): string => {
  return bodyTypeOptions.find(option => option.value === bodyType)?.text || bodyType
}

const getAddressText = (address: string): string => {
  return addressOptions.find(option => option.value === address)?.text || address
}
</script>

<style scoped>

.delete {
  background: linear-gradient(-12deg, #8b1f1f 0%, #c0392b 100%);
  border-radius: 10px;
  color: white;
}

</style>
