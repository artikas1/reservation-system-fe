<template>
  <v-container class="pa-6 mt-16">
    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation mt-16">

      <p style="padding-top: 20px; padding-left: 20px;" class="text-h5">
        Visos patalpos
      </p>

      <div v-for="room in rooms" :key="room.id">
        <v-card class="mt-5 ml-10 mr-10 mb-5" style="border: 1px solid #15495A;">
          <v-card-text>
            <v-row>
              <!-- Room image -->
              <v-col cols="12" sm="4" lg="2" class="text-center d-flex align-center justify-center">
                <img
                  v-if="room.image"
                  :src="`data:image/jpeg;base64,${room.image}`"
                  alt="Room image"
                  style="width: 100%; max-width: 180px; border-radius: 8px; object-fit: cover; margin-top: 8px;"
                />
              </v-col>

              <!-- Room details -->
              <v-col cols="12" sm="5" lg="8">
                <div class="text-h6 mb-2">
                  {{ room.name }}
                  <br/>
                  Kabinetas:
                  {{ room.roomNumber }}
                </div>
                <div class="text-subtitle-2">
                  {{ getRoomTypeText(room.roomType) }} kambarys<br/>
                  {{ getAddressText(room.address) }}<br/>

                  <v-col cols="12" class="pl-0 d-flex align-center">
                    <v-text-field
                      :type="showIdMap[room.id] ? 'text' : 'password'"
                      variant="outlined"
                      :model-value="room.id"
                      label="Automobilio ID"
                      dense
                      readonly
                      hide-details
                      class="flex-grow-1"
                      :append-inner-icon="showIdMap[room.id] ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append-inner="toggleIdVisibility(room.id)"
                    />
                    <v-tooltip text="Kopijuoti">
                      <template v-slot:activator="{ props }">
                        <v-icon
                          v-bind="props"
                          @click="copyToClipboard(room.id)"
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
import RoomService from '@/services/RoomService'

interface RoomType {
  id: string
  name: string
  roomNumber: string
  image?: string
  roomType: string
  address: string
  deletedAt?: string | null
}

const rooms = ref<RoomType[]>([])
const toast = useToast()

const roomTypeOptions = [
  {text: 'Darbo', value: 'DARBO'},
  {text: 'Susitikimų', value: 'SUSITIKIMU'},
  {text: 'Laisvalaikio', value: 'LAISVALAIKIO'},
];


const addressOptions = [
  { text: 'Akademijos g. 7', value: 'AKADEMIJOS_G_7' },
  { text: 'Gedimino pr. 9', value: 'GEDIMINO_PR_9' },
  { text: 'Konstitucijos pr. 12', value: 'KONSTITUCIJOS_PR_12' },
  { text: 'Neries g. 3', value: 'NERIES_G_3' },
  { text: 'Saulėtekio al. 15', value: 'SAULETEKIO_AL_15' },
]

const fetchRooms = async () => {
  try {
    const allRooms = await RoomService.getAllRooms()
    rooms.value = allRooms.filter((room: RoomType) => !room.deletedAt)
  } catch (error) {
    toast.error('Nepavyko gauti patalpų sąrašo')
  }
}

onMounted(fetchRooms)

const getRoomTypeText = (roomType: string): string => {
  return roomTypeOptions.find(option => option.value === roomType)?.text || roomType
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
