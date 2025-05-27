<template>
  <v-container class="container ma-16 mx-auto max" style=" max-width: 71vw">
    <v-card color="#F1F1F1" class="mb-5" style="overflow: unset; z-index: 1">
      <v-card-text class="text-h6">
        Rezervacijų istorija
      </v-card-text>
      <div class="d-flex flex-wrap mb-5 pa-2 ml-4" style="gap: 10px">

        <v-select
          v-model="selectedType"
          label="Rezervacijų tipas"
          :items="['Patalpos', 'Automobiliai', 'Įranga']"
          variant="outlined"
          style="min-width: 100px; max-width: 200px; height: 40px; background-color: white"
          hide-details="auto"
          density="compact"
          class="rounded"
          clearable
        />

        <v-select
          v-model="selectedStatus"
          label="Būsena"
          :items="['Aktyvi', 'Pasibaigusi', 'Atšaukta']"
          variant="outlined"
          style="min-width: 140px; max-width: 200px; height: 40px; background-color: white"
          hide-details="auto"
          density="compact"
          class="rounded"
          clearable
        ></v-select>

        <!--        <div style="flex-basis: 100%; height: 0;"></div>-->

        <VueDatePicker
          label="Pradžios data"
          class="rounded"
          style="min-width: 140px; max-width: 200px;"
          v-model="startDate"
          locale="lt"
          :enable-time-picker="true"
          :min-date="new Date()"
        ></VueDatePicker>

        <VueDatePicker
          label="Pabaigos data"
          class="rounded mb-10"
          style="min-width: 140px; max-width: 200px;"
          v-model="endDate"
          locale="lt"
          :enable-time-picker="true"
          :min-date="startDate"
        ></VueDatePicker>

      </div>
    </v-card>

    <v-row>
      <v-col cols="12" class="d-flex flex-column">
        <v-card color="#F1F1F1" class="flex-grow right-clm" style="z-index: 0">
          <div v-if="rooms.length > 0 || equipment.length > 0 || cars.length > 0">
            <v-card class="ml-10 mr-10 mt-5 mb-5" v-for="room in rooms" :key="room.id">
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="2" md="1" class="text-center mt-3">
                    <svg-icon type="mdi" :path="mdiChairRolling"
                              style="color: #27424B; height: 40px; width: 38px"></svg-icon>
                  </v-col>
                  <v-col cols="12" sm="6" lg="7">
                    <v-card-text class="text-body-1 pa-1 d-flex align-center">
                      <svg-icon
                        type="mdi"
                        :path="mdiCircleSlice8"
                        :style="{ color: statusColors[room.reservationStatus], width: '14px', height: '14px', marginRight: '8px' }"
                      />
                      {{ statusDisplayNames[room.reservationStatus] }}
                    </v-card-text>
                    <v-card-text class="text-h6 pa-1">
                      {{ room.room.name }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      Aukštas:
                      {{ room.room.floor }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      Kabinetas:
                      {{ room.room.roomNumber }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      {{ room.room.description }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      Rezervuota nuo {{ formatDateTime(room.reservedFrom) }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      Rezervuota iki {{ formatDateTime(room.reservedTo) }}
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="4" class="text-right my-auto">
                    <v-btn icon="" class="me-2" @click="showCommentBox(room.id, room.room.id, EntityType.ROOM)">
                      <svg-icon type="mdi" :path="mdiCommentOutline"></svg-icon>
                    </v-btn>
                  </v-col>
                  <v-col v-if="activeCommentId === room.id" class="text-right">
                    <v-textarea
                      v-model="commentText"
                      label="Jūsų komentaras"
                      auto-grow
                      rows="3"
                      class="mt-4"
                      outlined
                      dense
                    />
                    <v-btn class="comment" color="primary" @click="submitComment(room.room.id, EntityType.ROOM)">
                      <p class="mx-2">Komentuoti</p>
                    </v-btn>
                    <v-col class="text-left">
                      <div v-if="reviews[room.id]?.length">
                        <div v-for="(review, index) in reviews[room.id]" :key="index" class="mb-2">
                          <div style="font-size: 12px; color: gray;">{{ formatDateTime(review.createdAt) }}</div>
                          <div style="font-size: 14px;">{{ review.content }}</div>
                          <v-divider class="my-2"></v-divider>
                        </div>
                      </div>
                      <div v-else class="text-caption" style="color: gray;">Komentarų nėra.</div>
                    </v-col>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="ml-10 mr-10 mt-5 mb-5" v-for="equipment in equipment" :key="equipment.id">
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="2" md="1" class="text-center mt-3">
                    <svg-icon type="mdi" :path="mdiCamera" style="color: #27424B; height: 40px; width: 38px"></svg-icon>
                  </v-col>
                  <v-col cols="12" sm="6" lg="7">
                    <v-card-text class="text-body-1 pa-1 d-flex align-center">
                      <svg-icon
                        type="mdi"
                        :path="mdiCircleSlice8"
                        :style="{ color: statusColors[equipment.reservationStatus], width: '14px', height: '14px', marginRight: '8px' }"
                      />
                      {{ statusDisplayNames[equipment.reservationStatus] }}
                    </v-card-text>
                    <v-card-text class="text-h6 pa-1">
                      {{ equipment.equipment.name }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      {{ equipment.equipment.manufacturer }}
                      {{ equipment.equipment.model }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      Rezervuota nuo {{ formatDateTime(equipment.reservedFrom) }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      Rezervuota iki {{ formatDateTime(equipment.reservedTo) }}
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="4" class="text-right my-auto">
                    <v-btn icon="" class="me-2"
                           @click="showCommentBox(equipment.id, equipment.equipment.id, EntityType.EQUIPMENT)">
                      <svg-icon type="mdi" :path="mdiCommentOutline"></svg-icon>
                    </v-btn>
                  </v-col>
                  <v-col v-if="activeCommentId === equipment.id" class="text-right">
                    <v-textarea
                      v-model="commentText"
                      label="Jūsų komentaras"
                      auto-grow
                      rows="3"
                      class="mt-4"
                      outlined
                      dense
                    />
                    <v-btn class="comment" color="primary"
                           @click="submitComment(equipment.equipment.id, EntityType.EQUIPMENT)">
                      <p class="mx-2">Komentuoti</p>
                    </v-btn>
                    <v-col class="text-left">
                      <div v-if="reviews[equipment.id]?.length">
                        <div v-for="(review, index) in reviews[equipment.id]" :key="index" class="mb-2">
                          <div style="font-size: 12px; color: gray;">{{ formatDateTime(review.createdAt) }}</div>
                          <div style="font-size: 14px;">{{ review.content }}</div>
                          <v-divider class="my-2"></v-divider>
                        </div>
                      </div>
                      <div v-else class="text-caption" style="color: gray;">Komentarų nėra.</div>
                    </v-col>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="ml-10 mr-10 mt-5 mb-5" v-for="car in cars" :key="car.id">
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="2" md="1" class="text-center mt-3">
                    <svg-icon type="mdi" :path="mdiCar" style="color: #27424B; height: 40px; width: 38px"></svg-icon>
                  </v-col>
                  <v-col cols="12" sm="6" lg="7">
                    <v-card-text class="text-body-1 pa-1 d-flex align-center">
                      <svg-icon
                        type="mdi"
                        :path="mdiCircleSlice8"
                        :style="{ color: statusColors[car.reservationStatus], width: '14px', height: '14px', marginRight: '8px' }"
                      />
                      {{ statusDisplayNames[car.reservationStatus] }}
                    </v-card-text>
                    <v-card-text class="text-h6 pa-1">
                      {{ car.car.manufacturer }} {{ car.car.model }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      Valstybiniai numeriai: {{ car.car.numberPlate }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      {{ car.car.bodyType }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      Rezervuota nuo {{ formatDateTime(car.reservedFrom) }}
                    </v-card-text>
                    <v-card-text class="text-subtitle-2 pa-1">
                      Rezervuota iki {{ formatDateTime(car.reservedTo) }}
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="4" class="text-right my-auto">
                    <v-btn icon="" class="me-2" @click="showCommentBox(car.id, car.car.id, EntityType.CAR)">
                      <svg-icon type="mdi" :path="mdiCommentOutline"></svg-icon>
                    </v-btn>
                  </v-col>
                  <v-col v-if="activeCommentId === car.id" class="text-right">
                    <v-textarea
                      v-model="commentText"
                      label="Jūsų komentaras"
                      auto-grow
                      rows="3"
                      class="mt-4"
                      outlined
                      dense
                    />
                    <v-btn class="comment" color="primary" @click="submitComment(car.car.id, EntityType.CAR)">
                      <p class="mx-2">Komentuoti</p>
                    </v-btn>
                    <v-col class="text-left">
                      <div v-if="reviews[car.id]?.length">
                        <div v-for="(review, index) in reviews[car.id]" :key="index" class="mb-2">
                          <div style="font-size: 12px; color: gray;">{{ formatDateTime(review.createdAt) }}</div>
                          <div style="font-size: 14px;">{{ review.content }}</div>
                          <v-divider class="my-2"></v-divider>
                        </div>
                      </div>
                      <div v-else class="text-caption" style="color: gray;">Komentarų nėra.</div>
                    </v-col>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <br>
          </div>

          <div v-else class="text-center pa-6 text-subtitle-1">
            Rezervacijų istorija tuščia
          </div>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import {mdiCamera, mdiCar, mdiChairRolling, mdiCommentOutline, mdiCircleSlice8} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import {onMounted, ref, watch} from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {EntityType} from "@/types/EntityType";
import {formatDateTime} from "@/utils/dateFormatter";
import RoomService from "@/services/RoomService";
import EquipmentService from "@/services/EquipmentService";
import CarService from "@/services/CarService";
import ReviewService from "@/services/ReviewService";
import {useToast} from "vue-toastification";

const startDate = ref();
const endDate = ref();

const rooms = ref([]);
const equipment = ref([]);
const cars = ref([]);
const commentText = ref('');

const activeCommentId = ref(null);

const reviews = ref<Record<string, { content: string, createdAt: string }[]>>({});
const toast = useToast();

const selectedType = ref<string | null>(null);
const selectedStatus = ref<string | null>(null);

const statusDisplayNames = {
  AKTYVI: 'Aktyvi',
  PASIBAIGUSI: 'Pasibaigusi',
  ATŠAUKTA: 'Atšaukta'
};

const statusColors = {
  AKTYVI: '#4CAF50',      // green
  ATŠAUKTA: '#F44336',    // red
  PASIBAIGUSI: '#9E9E9E'  // grey
};

const showCommentBox = async (reservationId: string, entityId: string, entityType: EntityType) => {
  activeCommentId.value = activeCommentId.value === reservationId ? null : reservationId;

  if (activeCommentId.value) {
    reviews.value[reservationId] = [];
    try {
      const data = await ReviewService.getReviewsByEntity(entityId, entityType);
      reviews.value[reservationId] = Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching comments:", error);
      reviews.value[reservationId] = [];
    }
  }
};

const submitComment = async (entityId: string, entityType: EntityType) => {
  try {
    const response = await ReviewService.createReview(
      commentText.value,
      entityId,
      entityType,
      true
    );
    toast.success('Komentaras paliktas!');
    console.log('Comment submitted!', response);
    activeCommentId.value = null;
    commentText.value = '';
  } catch (error) {
    console.error('Klaida siunčiant komentarą', error);
  }
};

onMounted(async () => {
  try {
    rooms.value = await RoomService.getAllRoomHistoryReservations();
    equipment.value = await EquipmentService.getAllEquipmentHistoryReservations();
    cars.value = await CarService.getAllCarHistoryReservations();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const formatDate = (date?: Date) => date ? date.toISOString() : undefined;

watch([selectedStatus, selectedType, startDate, endDate], async ([newStatus, newType]) => {
  const formattedStatus = newStatus?.toUpperCase() || undefined;
  const formattedStart = formatDate(startDate.value);
  const formattedEnd = formatDate(endDate.value);

  if (!newType || newType === 'Patalpos') {
    rooms.value = await RoomService.getAllRoomHistoryReservations(formattedStatus, formattedStart, formattedEnd);
  } else {
    rooms.value = [];
  }

  if (!newType || newType === 'Įranga') {
    equipment.value = await EquipmentService.getAllEquipmentHistoryReservations(formattedStatus, formattedStart, formattedEnd);
  } else {
    equipment.value = [];
  }

  if (!newType || newType === 'Automobiliai') {
    cars.value = await CarService.getAllCarHistoryReservations(formattedStatus, formattedStart, formattedEnd);
  } else {
    cars.value = [];
  }
});

</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .right-clm {
    min-height: auto;
  }

  .all-reservations {
    min-height: 486px;
  }
}

@media (min-width: 600px) and (max-width: 1279px) {
  .right-clm {
    min-height: auto;
  }

  .all-reservations {
    min-height: 648px;
  }
}

@media (min-width: 1280px) {
  .right-clm {
    height: auto;
  }

  .all-reservations {
    min-height: 612px;
  }
}
</style>
