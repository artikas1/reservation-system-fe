<template>
  <v-container class="container">
    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation mt-16">

      <p style="padding-top: 20px; padding-left: 20px;" class="text-h5">
        Visi Automobiliai
      </p>

      <div v-for="car in cars" :key="car.id">
        <v-card class="mt-5 ml-10 mr-10 mb-5" style="border: 1px solid #15495A;">
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
                  {{ getAddressText(car.address) }}<br/>

                  <v-col cols="12" class="pl-0 d-flex align-center">
                    <v-text-field
                      :type="showIdMap[car.id] ? 'text' : 'password'"
                      variant="outlined"
                      :model-value="car.id"
                      label="Automobilio ID"
                      dense
                      readonly
                      hide-details
                      class="flex-grow-1"
                      :append-inner-icon="showIdMap[car.id] ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="toggleIdVisibility(car.id)"
                    />
                    <v-tooltip text="Kopijuoti">
                      <template v-slot:activator="{ props }">
                        <v-icon
                          v-bind="props"
                          @click="copyToClipboard(car.id)"
                          class="pl-6"
                        >
                          mdi-content-copy
                        </v-icon>
                      </template>
                    </v-tooltip>
                  </v-col>

                </div>
              </v-col>


            </v-row>
          </v-card-text>
        </v-card>
      </div>

      <br>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import CarService from '@/services/CarService'
import {useToast} from 'vue-toastification'

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
  {text: 'Hečbekas', value: 'HECBEKAS'},
  {text: 'Sedanas', value: 'SEDANAS'},
  {text: 'Universalas', value: 'UNIVERSALAS'},
  {text: 'Minivenas', value: 'MINIVENAS'},
]

const addressOptions = [
  {text: 'Akademijos g. 7', value: 'AKADEMIJOS_G_7'},
  {text: 'Gedimino pr. 9', value: 'GEDIMINO_PR_9'},
  {text: 'Konstitucijos pr. 12', value: 'KONSTITUCIJOS_PR_12'},
  {text: 'Neries g. 3', value: 'NERIES_G_3'},
  {text: 'Saulėtekio al. 15', value: 'SAULETEKIO_AL_15'},
]

const fetchCars = async () => {
  try {
    const allCars = await CarService.getAllCars()
    cars.value = allCars.filter((car: CarType) => !car.deletedAt)
  } catch (error) {
    toast.error('Nepavyko gauti automobilių sąrašo')
  }
}

onMounted(fetchCars)

const getBodyTypeText = (bodyType: string): string => {
  return bodyTypeOptions.find(option => option.value === bodyType)?.text || bodyType
}

const getAddressText = (address: string): string => {
  return addressOptions.find(option => option.value === address)?.text || address
}

const showIdMap = ref<Record<string, boolean>>({})

const toggleIdVisibility = (id: string) => {
  showIdMap.value[id] = !showIdMap.value[id]
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('ID nukopijuotas!')
  } catch (err) {
    toast.error('Nepavyko nukopijuoti ID')
  }
}
</script>

<style scoped>

</style>
