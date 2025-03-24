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
              <v-btn icon class="me-2">
                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
              </v-btn>
              <v-btn icon @click="deleteRoomReservation(room.room.id)">
                <svg-icon type="mdi" :path="mdiClose"></svg-icon>
              </v-btn>
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
              <v-btn icon class="me-2">
                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
              </v-btn>
              <v-btn icon @click="deleteEquipmentReservation(equipment.equipment.id)">
                <svg-icon type="mdi" :path="mdiClose"></svg-icon>
              </v-btn>
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
              <v-btn icon class="me-2">
                <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
              </v-btn>
              <v-btn icon @click="deleteCarReservation(car.car.id)">
                <svg-icon type="mdi" :path="mdiClose"></svg-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-card>

  </v-container>
</template>

<script setup>
import {onMounted, ref} from "vue";
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiChairRolling, mdiCamera, mdiCar, mdiPencilOutline, mdiClose} from '@mdi/js';
import RoomService from "@/services/RoomService.ts";
import EquipmentService from "@/services/EquipmentService.ts";
import CarService from "@/services/CarService.ts";
import { formatDateTime } from "@/utils/dateFormatter";

const rooms = ref([]);
const equipment = ref([]);
const cars = ref([]);

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
    await RoomService.deleteReservationByRoomId(id);
    rooms.value = rooms.value.filter(room => room.room.id !== id);
  } catch (error) {
    console.error('Error deleting reservation:', error);
  }
};

const deleteEquipmentReservation = async (id) => {
  try {
    await EquipmentService.deleteReservationByEquipmentId(id);
    equipment.value = equipment.value.filter(equipment => equipment.equipment.id !== id);
  } catch (error) {
    console.error('Error deleting equipment reservation:', error);
  }
};

const deleteCarReservation = async (id) => {
  try {
    await CarService.deleteCarReservationByCarId(id);
    cars.value = cars.value.filter(car => car.car.id !== id);
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


