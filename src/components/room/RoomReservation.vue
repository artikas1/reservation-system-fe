<template>
  <v-container class="container ma-16 d-flex flex-wrap mx-auto" style="max-width: 71vw">
    <v-row class="d-flex flex-grow">
      <v-col cols="12" md="4" rounded="xl">

        <v-card color="#F1F1F1" class="mb-8" style="overflow: unset; z-index: 1"> <!-- mb-8 because of overflow -->
          <v-card-text class="text-h6 mb-3">
            Data ir laikas*
          </v-card-text>
          <v-row class="d-flex">
            <VueDatePicker
              label="Pradžios data"
              class="rounded mb-5 pl-6 pr-6"
              v-model="startDate"
              locale="lt"
              :enable-time-picker="true"
              :min-date="new Date()"
            ></VueDatePicker>

            <VueDatePicker
              label="Pabaigos data"
              class="rounded mb-10 pl-6 pr-6"
              v-model="endDate"
              locale="lt"
              :enable-time-picker="true"
              :min-date="startDate"
            ></VueDatePicker>

          </v-row>
        </v-card>

        <v-card color="#F1F1F1" class="mb-5">
          <v-card-text class="text-h6">
            Patalpų tipas*
          </v-card-text>

          <v-select
            v-model="selectedRoomType"
            :items="roomTypeOptions"
            item-title="text"
            item-value="value"
            label="Patalpų tipas"
            variant="outlined"
            class="rounded ml-5 mr-5 mb-10"
            hide-details="auto"
            density="compact"
            style="background-color: white"
            clearable
          ></v-select>

        </v-card>

        <v-card color="#F1F1F1" class="mb-0">
          <v-card-text class="text-h6">
            Vieta*
          </v-card-text>

          <v-select
            v-model="selectedAddress"
            :items="addressOptions"
            item-title="text"
            item-value="value"
            label="Adresas"
            variant="outlined"
            class="rounded mx-6 mb-10"
            hide-details="auto"
            density="compact"
            style="background-color: white"
            clearable
          ></v-select>

        </v-card>
      </v-col>

      <v-col cols="12" md="8" class="d-flex flex-column">
        <v-card color="#F1F1F1" class="flex-grow right-clm">
          <v-card-text class="text-h5">
            <v-icon ccolor="#27424B" size="32" class="mb-1" >mdi-office-building-outline</v-icon>
            Patalpos
          </v-card-text>

          <div class="d-flex justify-end">
            <v-select
              label="Filtrai"
              :items="['Rūšiuoti pagal datą', 'Rūšiuoti pagal adresą A-Z', 'Rūšiuoti pagal adresą Z-A']"
              variant="outlined"
              class="rounded mr-5 align-self-end mb-3"
              style="max-width: 140px; font-size: 12px; background-color: white"
              hide-details="auto"
              density="compact"
            ></v-select>
          </div>

          <v-card class="bg-white mx-6 all-reservations" style="overflow: auto">

            <div v-if="startDate && endDate && rooms.length > 0">
              <ul>
                <li v-for="room in rooms" :key="room.id">
                  <v-card class="ma-2" style="border-color: #15495A; border-width: 1px;">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" xs="12" sm="12" md="4" lg="4" class="text-center d-flex align-center justify-center">
                          <img
                            v-if="room.image"
                            :src="`data:image/jpeg;base64,${room.image}`"
                            alt="Room image"
                            style="width: 100%; max-width: 180px; border-radius: 8px; object-fit: cover; margin-top: 8px;"
                          />
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="5" lg="5">
                          <v-card-text class="text-h6 pa-1">
                            {{ room.name }}
                          </v-card-text>
                          <v-card-text class="text-subtitle-2 pa-1">
                            {{ room.description }}
                            <br/>
                            <strong>{{ getAddressText(room.address) }}</strong> <!-- or .replace('_', ' ') for nicer display -->
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" xs="12" sm="12" md="3" lg="3" class="text-right my-auto">
                          <v-btn class="reserve text-white" style="text-transform: none" @click="reserveRoom(room.id)">
                            <p class="mx-2">Rezervuoti</p>
                          </v-btn>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="4"
                          class="my-auto"
                          v-if="reviews[room.id]?.length > 0"
                        >
                          <v-btn @click="showComments(room.id)">
                            <p class="mx-2">Komentarai</p>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-expand-transition>
                        <div v-if="visibleCommentId === room.id" class="px-4 pb-4 pt-1 mt-6">
                          <div v-if="reviews[room.id]?.length">
                            <div
                              v-for="(review, index) in reviews[room.id]"
                              :key="index"
                              class="mb-2"
                            >
                              <div style="font-size: 12px; color: gray;">
                                {{ formatDateTime(review.createdAt) }}
                              </div>
                              <div style="font-size: 14px;">
                                {{ review.content }}
                              </div>
                              <v-divider class="my-2"></v-divider>
                            </div>
                          </div>
                        </div>
                      </v-expand-transition>
                    </v-card-text>
                  </v-card>
                </li>
              </ul>
            </div>

            <div v-else-if="startDate && endDate" class="text-center pa-6 text-subtitle-1">
              Šiuo metu nėra laisvų patalpų pagal pasirinktus kriterijus.
            </div>

            <div v-else class="text-center pa-6 text-subtitle-1">
              Pasirinkite nuo - iki laiką
            </div>

          </v-card>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useToast} from "vue-toastification";
import { useRouter } from 'vue-router';
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import RoomService from "@/services/RoomService";
import ReviewService from "@/services/ReviewService";
import {formatDateTime, formatForBackend} from "@/utils/dateFormatter";
import {EntityType} from "@/types/EntityType";

const router = useRouter();

const rooms = ref([]);
const reviews = ref<Record<string, { content: string; createdAt: string }[]>>({});
const visibleCommentId = ref<string | null>(null);

const startDate = ref();
const endDate = ref();

const toast = useToast();

const selectedRoomType = ref<string | null>(null);
const selectedAddress = ref<string | null>(null);

const roomTypeOptions = [
  {text: 'Darbo', value: 'DARBO'},
  {text: 'Susitikimų', value: 'SUSITIKIMU'},
  {text: 'Laisvalaikio', value: 'LAISVALAIKIO'},
];

const addressOptions = [
  {text: 'Akademijos g. 7', value: 'AKADEMIJOS_G_7'},
  {text: 'Gedimino pr. 9', value: 'GEDIMINO_PR_9'},
  {text: 'Konstitucijos pr. 12', value: 'KONSTITUCIJOS_PR_12'},
  {text: 'Neries g. 3', value: 'NERIES_G_3'},
  {text: 'Saulėtekio al. 15', value: 'SAULETEKIO_AL_15'}
];

const showComments = (roomId: string) => {
  visibleCommentId.value = visibleCommentId.value === roomId ? null : roomId;
};

watch([startDate, endDate, selectedRoomType, selectedAddress], async ([newStart, newEnd, newRoomType, newAddress]) => {
  if (newStart && newEnd) {
    try {
      const formattedStart = formatForBackend(startDate.value);
      const formattedEnd = formatForBackend(endDate.value);

      rooms.value = await RoomService.getAvailableRooms(formattedStart, formattedEnd, newRoomType, newAddress);
      console.log("Fetched available rooms:", rooms.value);

      //Fetch all reviews in parallel
      const reviewPromises = rooms.value.map(room =>
        ReviewService.getReviewsByEntity(room.id, EntityType.ROOM)
          .catch(error => {
            console.warn(`Failed to get reviews for room ${room.id}`, error);
            return []; // Explicitly type the fallback
          })
      );

      const allReviews = await Promise.all(reviewPromises);
      //Assign reviews to each room
      rooms.value.forEach((room, index) => {
        reviews.value[room.id] = allReviews[index];
      });

    } catch (error) {
      toast.error("Klaida gaunant patalpas");
      console.error("Error fetching available rooms:", error);
    }
  } else {
    rooms.value = [];
  }
});

const reserveRoom = async (roomId: string) => {
  try {
    if (!startDate.value || !endDate.value) {
      toast.error('Prasome pasirinkti data ir laika');
      return;
    }

    const formattedStart = formatForBackend(startDate.value);
    const formattedEnd = formatForBackend(endDate.value);

    const response = await RoomService.reserveRoom(roomId, formattedStart, formattedEnd);


    toast.success('Patalpa sėkmingai rezervuota!', {
      timeout: 3000
    });
    console.log('Reservation created:', response);

    setTimeout(() => {
      toast.info('Nepamirškite rezervuoti papildomos įrangos! Spauskite čia.', {
        timeout: 7000,
        position: "top-center",
        closeOnClick: true,
        onClick: () => {
          router.push('/EquipmentReservation');
        }
      });
    }, 3200);

    //Refresh the room list
    rooms.value = await RoomService.getAvailableRooms(formattedStart, formattedEnd, selectedRoomType.value, selectedAddress.value);

  } catch (error) {
    const status = error.response?.status;

    if (status === 409 || status === 403) {
      toast.error('Patalpa ką tik buvo rezervuota. Pasirinkite kitą laiką ar patalpą.');
    } else {
      toast.error('Rezervacijos klaida: ' + (error.response?.data?.message || error.message));
    }

    console.error('Reservation error:', error);
  }

};

const getAddressText = (addressValue: string): string => {
  const match = addressOptions.find(option => option.value === addressValue);
  return match ? match.text : addressValue;
};

</script>

<style scoped>

.reserve {
  background: linear-gradient(-12deg, #324951 0%, #116f4b 100%);
  border-radius: 10px;
}

@media only screen and (max-width: 600px) {
  .reserve {
    font-size: 8px;
  }

  .right-clm {
    height: 540px;
  }

  .all-reservations {
    height: 360px;
  }
}

@media (min-width: 600px) and (max-width: 1279px) {
  .reserve {
    font-size: 10px;
  }

  .right-clm {
    height: 720px;
  }

  .all-reservations {
    height: 500px;
  }
}

@media (min-width: 1280px) {
  .reserve {
    font-size: 12px;
  }

  .right-clm {
    height: 680px;
  }

  .all-reservations {
    height: 500px;
  }
}
</style>
