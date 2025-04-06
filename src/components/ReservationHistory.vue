<template>
  <v-container class="container ma-16 mx-auto" style=" max-width: 71vw">
    <v-card color="#F1F1F1" class="mb-5" style="overflow: unset; z-index: 1">
      <v-card-text class="text-h6">
        Rezervacijų istorija
      </v-card-text>
      <div class="d-flex flex-wrap mb-5 pa-2 ml-4" style="gap: 10px">

        <v-select
          label="Rezervaciju tipas"
          :items="['Patalpos', 'Automobiliai', 'Įranga']"
          variant="outlined"
          style="min-width: 100px; max-width: 140px; height: 40px; background-color: white"
          hide-details="auto"
          density="compact"
          class="rounded"
        ></v-select>

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

        <VueDatePicker
          class="dateSize"
          v-model="date"
          locale="lt"
          style="min-width: 100px; max-width: 140px;"
        ></VueDatePicker>

        <VueDatePicker
          class="dateSize mb-5"
          v-model="date"
          locale="lt"
          style="min-width: 100px; max-width: 140px"
        ></VueDatePicker>
      </div>
    </v-card>

    <v-row>
      <v-col cols="12" class="d-flex flex-column">
        <v-card color="#F1F1F1" class="flex-grow right-clm" style="z-index: 0">
          <v-card class="bg-white mx-6 all-reservations mt-6" style="overflow: auto">

            <v-card class="ma-10" v-for="room in rooms" :key="room.id">
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="2" md="1" class="text-center mt-3">
                    <svg-icon type="mdi" :path="mdiChairRolling" style="color: #27424B; height: 40px; width: 38px"></svg-icon>
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
                    <v-btn icon class="me-2" @click="showCommentBox(room.id, room.room.id, EntityType.ROOM)">
                      <svg-icon type="mdi" :path="mdiCommentOutline"></svg-icon>
                    </v-btn>
                  </v-col>
                  <!--                  <v-col v-if="activeCommentId === room.id" class="text-right">-->
                  <!--                    <v-textarea-->
                  <!--                      v-model="commentText"-->
                  <!--                      label="Jūsų komentaras"-->
                  <!--                      auto-grow-->
                  <!--                      rows="3"-->
                  <!--                      class="mt-4"-->
                  <!--                      outlined-->
                  <!--                      dense-->
                  <!--                    />-->
                  <!--                    <v-btn class="comment" color="primary" @click="submitComment(room.room.id, EntityType.ROOM)">-->
                  <!--                      <p class="mx-2">Komentuoti</p>-->
                  <!--                    </v-btn>-->
                  <!--                    <v-col class="text-left">-->
                  <!--                      <div v-if="reviews[room.id]?.length">-->
                  <!--                        <div v-for="(review, index) in reviews[room.id]" :key="index" class="mb-2">-->
                  <!--                          <div style="font-size: 12px; color: gray;">{{ formatDateTime(review.createdAt) }}</div>-->
                  <!--                          <div style="font-size: 14px;">{{ review.content }}</div>-->
                  <!--                          <v-divider class="my-2"></v-divider>-->
                  <!--                        </div>-->
                  <!--                      </div>-->
                  <!--                      <div v-else class="text-caption" style="color: gray;">Komentarų nėra.</div>-->
                  <!--                    </v-col>-->
                  <!--                  </v-col>-->
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="ma-10" v-for="equipment in equipment" :key="equipment.id">
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
                    <v-btn icon class="me-2" @click="showCommentBox(equipment.id, equipment.equipment.id, EntityType.EQUIPMENT)">
                      <svg-icon type="mdi" :path="mdiCommentOutline"></svg-icon>
                    </v-btn>
                  </v-col>
                  <!--                  <v-col v-if="activeCommentId === equipment.id" class="text-right">-->
                  <!--                    <v-textarea-->
                  <!--                      v-model="commentText"-->
                  <!--                      label="Jūsų komentaras"-->
                  <!--                      auto-grow-->
                  <!--                      rows="3"-->
                  <!--                      class="mt-4"-->
                  <!--                      outlined-->
                  <!--                      dense-->
                  <!--                    />-->
                  <!--                    <v-btn class="comment" color="primary" @click="submitComment(equipment.equipment.id, EntityType.EQUIPMENT)">-->
                  <!--                      <p class="mx-2">Komentuoti</p>-->
                  <!--                    </v-btn>-->
                  <!--                    <v-col class="text-left">-->
                  <!--                      <div v-if="reviews[equipment.id]?.length">-->
                  <!--                        <div v-for="(review, index) in reviews[equipment.id]" :key="index" class="mb-2">-->
                  <!--                          <div style="font-size: 12px; color: gray;">{{ formatDateTime(review.createdAt) }}</div>-->
                  <!--                          <div style="font-size: 14px;">{{ review.content }}</div>-->
                  <!--                          <v-divider class="my-2"></v-divider>-->
                  <!--                        </div>-->
                  <!--                      </div>-->
                  <!--                      <div v-else class="text-caption" style="color: gray;">Komentarų nėra.</div>-->
                  <!--                    </v-col>-->
                  <!--                  </v-col>-->
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="ma-10" v-for="car in cars" :key="car.id">
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
                    <v-btn icon class="me-2" @click="showCommentBox(car.id, car.car.id, EntityType.CAR)">
                      <svg-icon type="mdi" :path="mdiCommentOutline"></svg-icon>
                    </v-btn>
                  </v-col>
<!--                  <v-col v-if="activeCommentId === car.id" class="text-right">-->
<!--                    <v-textarea-->
<!--                      v-model="commentText"-->
<!--                      label="Jūsų komentaras"-->
<!--                      auto-grow-->
<!--                      rows="3"-->
<!--                      class="mt-4"-->
<!--                      outlined-->
<!--                      dense-->
<!--                    />-->
<!--                    <v-btn class="comment" color="primary" @click="submitComment(car.car.id, EntityType.CAR)">-->
<!--                      <p class="mx-2">Komentuoti</p>-->
<!--                    </v-btn>-->
<!--                    <v-col class="text-left">-->
<!--                      <div v-if="reviews[car.id]?.length">-->
<!--                        <div v-for="(review, index) in reviews[car.id]" :key="index" class="mb-2">-->
<!--                          <div style="font-size: 12px; color: gray;">{{ formatDateTime(review.createdAt) }}</div>-->
<!--                          <div style="font-size: 14px;">{{ review.content }}</div>-->
<!--                          <v-divider class="my-2"></v-divider>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                      <div v-else class="text-caption" style="color: gray;">Komentarų nėra.</div>-->
<!--                    </v-col>-->
<!--                  </v-col>-->
                </v-row>
              </v-card-text>
            </v-card>

          </v-card>
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

const date = ref();

const rooms = ref([]);
const equipment = ref([]);
const cars = ref([]);

const selectedStatus = ref<string | null>(null);

const commentText = ref('');

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

onMounted(async () => {
  try {
    rooms.value = await RoomService.getAllRoomHistoryReservations();
    equipment.value = await EquipmentService.getAllEquipmentHistoryReservations();
    cars.value = await CarService.getAllCarHistoryReservations();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

watch(selectedStatus, async (newStatus) => {
  try {
    const formattedStatus = newStatus?.toUpperCase() || undefined;

    rooms.value = await RoomService.getAllRoomHistoryReservations(formattedStatus);
    equipment.value = await EquipmentService.getAllEquipmentHistoryReservations(formattedStatus);
    cars.value = await CarService.getAllCarHistoryReservations(formattedStatus);
  } catch (error) {
    console.error('Error fetching filtered reservations:', error);
  }
});

</script>

<style scoped>
.work-tools {
  display: inline-block;
  background-color: #27424C;
  color: white;
  border-radius: 20px;
  font-size: 9px;
  font-family: 'Inter', sans-serif;
  padding: 4px 10px;
  margin-right: 4px;
}

@media only screen and (max-width: 600px) {
  .right-clm {
    min-height: 540px;
  }

  .all-reservations {
    min-height: 486px;
  }
}

@media (min-width: 600px) and (max-width: 1279px) {
  .right-clm {
    min-height: 720px;
  }

  .all-reservations {
    min-height: 648px;
  }
}

@media (min-width: 1280px) {
  .right-clm {
    height: 680px;
  }

  .all-reservations {
    min-height: 612px;
  }
}
</style>

<style>
.dateSize .dp__input {
  height: 40px !important;
}
</style>
