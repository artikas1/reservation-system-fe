<template>
  <v-container class="pa-6 mt-16">
    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation mt-16">

      <p style="padding-top: 20px; padding-left: 20px;" class="text-h5">
        Visa įranga
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
                  style="width: 100%; max-width: 160px; border-radius: 8px; object-fit: cover; margin-top: 8px;"
                />
              </v-col>

              <!-- Equipment details -->
              <v-col cols="12" sm="5" lg="8">
                <div class="text-h6 mb-2">
                  {{ equipment.name }} {{ equipment.model }}
                </div>
                <div class="text-subtitle-2">
                  {{ getEquipmentTypeText(equipment.equipmentType) }}<br/>
                  {{ getAddressText(equipment.address) }}<br/>

                  <v-col cols="12" class="pl-0 d-flex align-center">
                    <v-text-field
                      :type="showIdMap[equipment.id] ? 'text' : 'password'"
                      variant="outlined"
                      :model-value="equipment.id"
                      label="Įrangos ID"
                      dense
                      readonly
                      hide-details
                      class="flex-grow-1"
                      :append-inner-icon="showIdMap[equipment.id] ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="toggleIdVisibility(equipment.id)"
                    />
                    <v-tooltip text="Kopijuoti">
                      <template v-slot:activator="{ props }">
                        <v-icon
                          v-bind="props"
                          @click="copyToClipboard(equipment.id)"
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

onMounted(fetchEquipment)

const getEquipmentTypeText = (equipmentType: string): string => {
  return equipmentTypeOptions.find(option => option.value === equipmentType)?.text || equipmentType
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
