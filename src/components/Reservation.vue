<template>
  <v-container class="container">

    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation">

      <p style="padding-top: 20px; padding-left: 20px;">
        Mano aktyvios rezervacijos
      </p>

      <v-card class="mt-5 ml-10 mr-10" v-for="room in rooms" :key="room.id">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" md="3" class="text-center mt-3">
              <!--              <svg-icon type="mdi" :path="mdiChairRolling" style="color: #27424B; height: 40px; width: 38px"></svg-icon>-->
              <img
                v-if="room.room.image"
                :src="`data:image/jpeg;base64,${room.room.image}`"
                alt="Room image"
                style="width: 100%; max-width: 180px; border-radius: 6px;"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-card-text class="text-h6 pa-1">
                {{ room.room.name }}
                <span v-if="room.room.deletedAt" class="text-red"> - patalpa pašalinta iš sistemos</span>
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
            <v-col cols="12" sm="4" md="3" class="text-right my-auto">
              <v-btn icon="" class="me-2" @click="showCommentBox(room.id, room.room.id, EntityType.ROOM)">
                <svg-icon type="mdi" :path="mdiCommentOutline"></svg-icon>
              </v-btn>
              <v-btn icon="" class="me-2" @click="startEditingReservation(room, 'room')">
                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
              </v-btn>
              <v-btn icon="" @click="deleteRoomReservation(room.id)">
                <svg-icon type="mdi" :path="mdiClose"></svg-icon>
              </v-btn>
            </v-col>
            <v-col v-if="editingReservationId === `room-${room.id}`" cols="12" style="position: relative; z-index: 1">
              <v-row class="d-flex">

                <v-col cols="12" md="6">
                  <VueDatePicker
                    v-model="startDate"
                    label="Pradžios data"
                    class="rounded mb-4"
                    locale="lt"
                    :enable-time-picker="true"
                    :min-date="new Date()"
                    :disabled-dates="isDateDisabled"
                    teleport="body"
                  ></VueDatePicker>
                </v-col>

                <v-col cols="12" md="6">

                  <VueDatePicker
                    v-model="endDate"
                    label="Pabaigos data"
                    class="rounded mb-4"
                    locale="lt"
                    :enable-time-picker="true"
                    :min-date="startDate"
                    :disabled-dates="isDateDisabled"
                    teleport="body"
                  ></VueDatePicker>

                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn class="comment" color="primary" @click="updateReservation(room.id, 'room')">
                    Atnaujinti
                  </v-btn>
                </v-col>
              </v-row>
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

      <v-card class="mt-5 ml-10 mr-10" v-for="equipment in equipment" :key="equipment.id">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" md="3" class="text-center mt-3">
              <!--              <svg-icon type="mdi" :path="mdiCamera" style="color: #27424B; height: 40px; width: 38px"></svg-icon>-->
              <img
                v-if="equipment.equipment.image"
                :src="`data:image/jpeg;base64,${equipment.equipment.image}`"
                alt="Equipment image"
                style="width: 100%; max-width: 180px; border-radius: 6px;"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-card-text class="text-h6 pa-1">
                {{ equipment.equipment.name }}
                <span v-if="equipment.equipment.deletedAt" class="text-red"> - įranga pašalinta iš sistemos</span>
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
            <v-col cols="12" sm="4" md="3" class="text-right my-auto">
              <v-btn icon="" class="me-2"
                     @click="showCommentBox(equipment.id, equipment.equipment.id, EntityType.EQUIPMENT)">
                <svg-icon type="mdi" :path="mdiCommentOutline"></svg-icon>
              </v-btn>
              <v-btn icon="" class="me-2" @click="startEditingReservation(equipment, 'equipment')">
                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
              </v-btn>
              <v-btn icon="" @click="deleteEquipmentReservation(equipment.id)">
                <svg-icon type="mdi" :path="mdiClose"></svg-icon>
              </v-btn>
            </v-col>
            <v-col v-if="editingReservationId === `equipment-${equipment.id}`" cols="12"
                   style="position: relative; z-index: 1">
              <v-row class="d-flex">

                <v-col cols="12" md="6">
                  <VueDatePicker
                    v-model="startDate"
                    label="Pradžios data"
                    class="rounded mb-4"
                    locale="lt"
                    :enable-time-picker="true"
                    :min-date="new Date()"
                    :disabled-dates="isDateDisabled"
                    teleport="body"
                  ></VueDatePicker>
                </v-col>

                <v-col cols="12" md="6">

                  <VueDatePicker
                    v-model="endDate"
                    label="Pabaigos data"
                    class="rounded mb-4"
                    locale="lt"
                    :enable-time-picker="true"
                    :min-date="startDate"
                    :disabled-dates="isDateDisabled"
                    teleport="body"
                  ></VueDatePicker>

                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn class="comment" color="primary" @click="updateReservation(equipment.id, 'equipment')">
                    Atnaujinti
                  </v-btn>
                </v-col>
              </v-row>
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

      <v-card class="mt-5 ml-10 mr-10" v-for="car in cars" :key="car.id">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" md="3" class="text-center mt-2">
              <!--              <svg-icon type="mdi" :path="mdiCar" style="color: #27424B; height: 40px; width: 38px" />-->
              <img
                v-if="car.car.image"
                :src="`data:image/jpeg;base64,${car.car.image}`"
                alt="Car image"
                style="width: 100%; max-width: 180px; border-radius: 6px;"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-card-text class="text-h6 pa-1">
                {{ car.car.manufacturer }} {{ car.car.model }}
                <span v-if="car.car.deletedAt" class="text-red"> - automobilis pašalintas iš sistemos</span>
              </v-card-text>

              <v-card-text class="text-subtitle-2 pa-1">
                Valstybiniai numeriai: {{ car.car.numberPlate }}
              </v-card-text>

              <v-card-text class="text-subtitle-2 pa-1" v-if="!car.car.deletedAt">
                {{ car.car.bodyType }}
              </v-card-text>

              <v-card-text class="text-subtitle-2 pa-1">
                Rezervuota nuo {{ formatDateTime(car.reservedFrom) }}
              </v-card-text>

              <v-card-text class="text-subtitle-2 pa-1">
                Rezervuota iki {{ formatDateTime(car.reservedTo) }}
              </v-card-text>
            </v-col>

            <v-col cols="12" sm="4" md="3" class="text-right my-auto">
              <v-btn icon="" class="me-2" @click="showCommentBox(car.id, car.car.id, EntityType.CAR)">
                <svg-icon type="mdi" :path="mdiCommentOutline"></svg-icon>
              </v-btn>
              <v-btn icon="" class="me-2" @click="startEditingReservation(car, 'car')">
                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
              </v-btn>
              <v-btn icon="" @click="deleteCarReservation(car.id)">
                <svg-icon type="mdi" :path="mdiClose"></svg-icon>
              </v-btn>
            </v-col>

            <v-col v-if="editingReservationId === `car-${car.id}`" cols="12" style="position: relative; z-index: 1">
              <v-row class="d-flex">

                <v-col cols="12" md="6">
                  <VueDatePicker
                    v-model="startDate"
                    label="Pradžios data"
                    class="rounded mb-4"
                    locale="lt"
                    :enable-time-picker="true"
                    :min-date="new Date()"
                    :disabled-dates="isDateDisabled"
                    teleport="body"
                  ></VueDatePicker>
                </v-col>

                <v-col cols="12" md="6">

                  <VueDatePicker
                    v-model="endDate"
                    label="Pabaigos data"
                    class="rounded mb-4"
                    locale="lt"
                    :enable-time-picker="true"
                    :min-date="startDate"
                    :disabled-dates="isDateDisabled"
                    teleport="body"
                  ></VueDatePicker>

                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn class="comment" color="primary" @click="updateReservation(car.id, 'car')">
                    Atnaujinti
                  </v-btn>
                </v-col>
              </v-row>
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

      <div class="mb-10"/>

    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useToast} from "vue-toastification";
import VueDatePicker from '@vuepic/vue-datepicker';
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiCommentOutline, mdiPencilOutline, mdiClose} from '@mdi/js';
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

const editingReservationId = ref<string | null>(null);
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const reservedTimeRanges = ref<{ reservedFrom: string, reservedTo: string }[]>([]);

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

const startEditingReservation = async (reservation, type: 'car' | 'equipment' | 'room') => {
  const reservationKey = `${type}-${reservation.id}`;

  if (editingReservationId.value === reservationKey) {
    editingReservationId.value = null;
    return;
  }

  try {
    editingReservationId.value = reservationKey;
    startDate.value = new Date(reservation.reservedFrom);
    endDate.value = new Date(reservation.reservedTo);

    if (type === 'car') {
      reservedTimeRanges.value = await CarService.getReservedTimeRanges(reservation.car.id, reservation.id);
    } else if (type === 'equipment') {
      reservedTimeRanges.value = await EquipmentService.getReservedTimeRanges(reservation.equipment.id, reservation.id);
    } else if (type === 'room') {
      reservedTimeRanges.value = await RoomService.getReservedTimeRanges(reservation.room.id, reservation.id);
    }

  } catch (err) {
    console.error("Error starting edit mode:", err);
    toast.error("Nepavyko įkelti rezervacijos duomenų");
    editingReservationId.value = null;
  }
};

const isDateDisabled = (date: Date) => {
  return reservedTimeRanges.value.some(range => {
    const from = new Date(range.reservedFrom);
    const to = new Date(range.reservedTo);
    return date >= from && date < to;
  });
};

const updateReservation = async (reservationId: string, type: 'car' | 'equipment' | 'room') => {
  try {
    if (!startDate.value || !endDate.value) {
      toast.error('Prašome pasirinkti datas');
      return;
    }

    // Extra guard: check if the entity is deleted before allowing update
    let itemToCheck;
    if (type === 'car') {
      itemToCheck = cars.value.find(c => c.id === reservationId);
    } else if (type === 'equipment') {
      itemToCheck = equipment.value.find(e => e.id === reservationId);
    } else if (type === 'room') {
      itemToCheck = rooms.value.find(r => r.id === reservationId);
    }

    if (itemToCheck?.[type]?.deletedAt) {
      toast.error(`${type === 'car' ? 'Automobilis' : type === 'equipment' ? 'Įranga' : 'Patalpa'} buvo pašalinta(-s) iš sistemos. Rezervacijos atnaujinti negalima.`);
      return;
    }

    // Convert dates to ISO strings before sending
    const formattedStart = startDate.value.toISOString();
    const formattedEnd = endDate.value.toISOString();

    if (type === 'car') {
      await CarService.updateReservation(reservationId, formattedStart, formattedEnd);
      cars.value = await CarService.getCarReservations();
    } else if (type === 'equipment') {
      await EquipmentService.updateReservation(reservationId, formattedStart, formattedEnd);
      equipment.value = await EquipmentService.getEquipmentReservations();
    } else if (type === 'room') {
      await RoomService.updateReservation(reservationId, formattedStart, formattedEnd);
      rooms.value = await RoomService.getRoomReservations();
    }

    toast.success('Rezervacija atnaujinta sėkmingai!');
    editingReservationId.value = null;

  } catch (error) {
    toast.error('Klaida atnaujinant rezervaciją: ' + (error.response?.data?.message || error.message));
    console.error('Update error:', error);
  }
};
</script>

<style>
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

.dp__icon svg {
  width: 24px !important;
  height: 24px !important;
}

</style>
