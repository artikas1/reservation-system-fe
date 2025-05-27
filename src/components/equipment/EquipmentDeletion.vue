<template>
  <v-container class="pa-6 mt-16">
    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation">

      <p style="padding-top: 20px; padding-left: 20px;" class="text-h5">
        Įrangos valdymas
      </p>

      <div v-for="equipment in equipment" :key="equipment.id">
        <v-card class="mt-5 ml-10 mr-10 mb-5" style="border: 1px solid #15495A;">
          <v-card-text>
            <v-row>
              <!-- Equipment image -->
              <v-col cols="12" sm="4" lg="2" class="text-center d-flex align-center justify-center">
                <img
                  v-if="equipment.image"
                  :src="`data:image/jpeg;base64,${equipment.image}`"
                  alt="Equipment image"
                  style="width: 100%; max-width: 180px; border-radius: 8px; object-fit: cover; margin-top: 8px;"
                />
              </v-col>

              <!-- Equipment details -->
              <v-col cols="12" sm="5" lg="8">
                <div class="text-h6 mb-2">
                  {{ equipment.name }} {{ equipment.model }}
                </div>
                <div class="text-subtitle-2">
                  {{ getEquipmentTypeText(equipment.equipmentType) }}<br/>
                  {{ getAddressText(equipment.address) }}
                </div>
              </v-col>

              <!-- Delete button -->
              <v-col cols="12" sm="3" lg="2" class="text-right my-auto">
                <v-btn
                  class="delete"
                  @click="deleteEquipment(equipment.id)"
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
import { useToast } from 'vue-toastification'
import EquipmentService from "@/services/EquipmentService";

interface CarType {
  id: string
  name: string
  model: string
  image?: string
  equipmentType: string
  address: string
  deletedAt?: string | null
}

const equipment = ref<CarType[]>([])
const toast = useToast()

const equipmentTypeOptions = [
  {text: 'Klaviatura', value: 'KLAVIATURA'},
  {text: 'Nešiojamas kompiuteris', value: 'NESIOJAMAS_KOMPIUTERIS'},
  {text: 'Pelė', value: 'PELE'},
  {text: 'Plančetinis kompiuteris', value: 'PLANCETINIS_KOMPIUTERIS'},
  {text: 'Projektorius', value: 'PROJEKTORIUS'},
  {text: 'Radio', value: 'RADIO'},
  {text: 'Web kamera', value: 'WEB_KAMERA'},
]

const addressOptions = [
  { text: 'Akademijos g. 7', value: 'AKADEMIJOS_G_7' },
  { text: 'Gedimino pr. 9', value: 'GEDIMINO_PR_9' },
  { text: 'Konstitucijos pr. 12', value: 'KONSTITUCIJOS_PR_12' },
  { text: 'Neries g. 3', value: 'NERIES_G_3' },
  { text: 'Saulėtekio al. 15', value: 'SAULETEKIO_AL_15' },
]

const fetchEquipment = async () => {
  try {
    const allEquipment = await EquipmentService.getAllEquipment()
    equipment.value = allEquipment.filter((equipment: EquipmentType) => !equipment.deletedAt)
  } catch (error) {
    toast.error('Nepavyko gauti įrangos sąrašo')
  }
}

const deleteEquipment = async (equipmentId: string) => {
  if (confirm('Ar tikrai norite pašalinti šią įrangą?')) {
    try {
      await EquipmentService.deleteEquipmentById(equipmentId)
      toast.success('Įranga pašalinta sėkmingai!')
      await fetchEquipment()
    } catch (error) {
      toast.error('Klaida šalinant įranga')
    }
  }
}

onMounted(fetchEquipment)

const getEquipmentTypeText = (equipmentType: string): string => {
  return equipmentTypeOptions.find(option => option.value === equipmentType)?.text || equipmentType
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
