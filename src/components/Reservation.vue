<template>
  <v-container class="container">

    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation">

      <p style="padding-top: 20px; padding-left: 20px;">
        Mano aktyvios rezervacijos
      </p>

      <!--      <v-card class="ma-10">-->
      <!--        <v-card-text>-->
      <!--          <v-row>-->
      <!--            <v-col cols="12" sm="2" md="1" class="text-center mt-3">-->
      <!--              <svg-icon type="mdi" :path="mdiChairRolling"-->
      <!--                        style="color: #27424B; height: 40px; width: 38px"></svg-icon>-->
      <!--            </v-col>-->
      <!--            <v-col cols="12" sm="6" md="7">-->
      <!--              <v-card-title class="text-subtitle-1 pb-1">-->
      <!--                Darbo vieta-->
      <!--              </v-card-title>-->
      <!--              <v-card-text class="pb-1">-->
      <!--                Saltoniškių g. 19, 2 aukštas<br>-->
      <!--                Rezervuota nuo 2023-09-18 iki 2023-10-18-->
      <!--              </v-card-text>-->
      <!--              <div style="margin-bottom: 10px; margin-left: 14px">-->
      <!--                <p class="work-tools" v-for="item in items" :key="item.title">{{ item.title }} </p>-->
      <!--              </div>-->
      <!--            </v-col>-->

      <!--            <v-col cols="12" sm="4" class="text-right my-auto">-->
      <!--              <v-btn icon class="me-2">-->
      <!--                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>-->
      <!--              </v-btn>-->
      <!--              <v-btn icon>-->
      <!--                <svg-icon type="mdi" :path="mdiClose"></svg-icon>-->
      <!--              </v-btn>-->
      <!--            </v-col>-->
      <!--          </v-row>-->
      <!--        </v-card-text>-->
      <!--      </v-card>-->

      <v-card class="ma-10" v-for="room in rooms" :key="room.id">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" md="1" class="text-center mt-3">
              <svg-icon type="mdi" :path="mdiChairRolling" style="color: #27424B; height: 40px; width: 38px"></svg-icon>
            </v-col>
            <v-col cols="12" sm="6" lg="7">
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
              <v-btn icon class="me-2">
                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
              </v-btn>
              <v-btn icon @click="deleteRoomReservation(room.id)">
                <svg-icon type="mdi" :path="mdiClose"></svg-icon>
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

      <v-card class="ma-10" v-for="equipment in equipment" :key="equipment.id">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" md="1" class="text-center mt-3">
              <svg-icon type="mdi" :path="mdiCamera" style="color: #27424B; height: 40px; width: 38px"></svg-icon>
            </v-col>
            <v-col cols="12" sm="6" lg="7">
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
              <v-btn icon class="me-2">
                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
              </v-btn>
              <v-btn icon @click="deleteEquipmentReservation(equipment.id)">
                <svg-icon type="mdi" :path="mdiClose"></svg-icon>
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

      <v-card class="ma-10" v-for="car in cars" :key="car.id">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" md="1" class="text-center mt-3">
              <svg-icon type="mdi" :path="mdiCar" style="color: #27424B; height: 40px; width: 38px"></svg-icon>
            </v-col>
            <v-col cols="12" sm="6" lg="7">
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
              <v-btn icon class="me-2">
                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
              </v-btn>
              <v-btn icon @click="deleteCarReservation(car.id)">
                <svg-icon type="mdi" :path="mdiClose"></svg-icon>
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


    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useToast} from "vue-toastification";
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiChairRolling, mdiCamera, mdiCar, mdiCommentOutline, mdiPencilOutline, mdiClose} from '@mdi/js';
import RoomService from "@/services/RoomService.ts";
import EquipmentService from "@/services/EquipmentService.ts";
import CarService from "@/services/CarService.ts";
import {formatDateTime} from "@/utils/dateFormatter";
import ReviewService from '@/services/ReviewService.ts';
import {EntityType} from "@/types/EntityType";

const rooms = ref([]);
const equipment = ref([]);
const cars = ref([]);
const commentText = ref('');

const activeCommentId = ref(null);

const reviews = ref<Record<string, { content: string, createdAt: string }[]>>({});
const toast = useToast();

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
    rooms.value = await RoomService.getRoomReservations();
    equipment.value = await EquipmentService.getEquipmentReservations();
    cars.value = await CarService.getCarReservations();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const deleteRoomReservation = async (id) => {
  try {
    await RoomService.deleteReservationByRoomReservationId(id);
    rooms.value = rooms.value.filter(room => room.id !== id);
  } catch (error) {
    console.error('Error deleting reservation:', error);
  }
};

const deleteEquipmentReservation = async (id) => {
  try {
    await EquipmentService.deleteReservationByEquipmentReservationId(id);
    equipment.value = equipment.value.filter(equipment => equipment.id !== id);
  } catch (error) {
    console.error('Error deleting equipment reservation:', error);
  }
};

const deleteCarReservation = async (id) => {
  try {
    await CarService.deleteCarReservationByCarReservationId(id);
    cars.value = cars.value.filter(car => car.id !== id);
  } catch (error) {
    console.error('Error deleting car reservation:', error);
  }
}
</script>

<style>
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

.comment {
  background: linear-gradient(-12deg, #324951 0%, #116f4b 100%);
  border-radius: 10px;
}

@media (min-width: 913px) and (max-width: 1919px) {
  .reservation {
    width: 846px;
    transition: width 0.5s;
  }
}

@media (min-width: 1920px) {
  .reservation {
    width: 1104px;
    transition: width 0.5s;
  }
}
</style>
