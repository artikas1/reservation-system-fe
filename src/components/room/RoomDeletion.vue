<template>
  <v-container class="pa-6 mt-16">
    <v-card class="bg-white mx-6" style="overflow: auto">
      <div v-for="room in rooms" :key="room.id">
        <v-card class="ma-2" style="border: 1px solid #15495A;">
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
                  {{ getAddressText(room.address) }}
                </div>
              </v-col>

              <!-- Delete button -->
              <v-col cols="12" sm="3" lg="2" class="text-right my-auto">
                <v-btn
                  class="delete"
                  @click="deleteRoom(room.id)"
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

const deleteRoom = async (roomId: string) => {
  if (confirm('Ar tikrai norite pašalinti šią patalpą?')) {
    try {
      await RoomService.deleteRoomById(roomId)
      toast.success('Patalpa pašalinta sėkmingai!')
      await fetchRooms()
    } catch (error) {
      toast.error('Klaida šalinant patalpą')
    }
  }
}

onMounted(fetchRooms)

const getRoomTypeText = (roomType: string): string => {
  return roomTypeOptions.find(option => option.value === roomType)?.text || roomType
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
