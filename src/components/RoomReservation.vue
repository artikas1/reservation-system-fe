<template>
  <v-container class="container ma-16 d-flex flex-wrap mx-auto" style="max-width: 71vw">
    <v-row class="d-flex flex-grow">
      <v-col cols="12" md="4" rounded="xl">
        <v-card color="#F1F1F1" class="mb-5">
          <v-card-text class="text-h6">
            Patalpų tipas*
          </v-card-text>
          <v-select
            label="Patalpų tipas"
            :items="['Darbo vietos', 'Darbo vietos1', 'Darbo vietos2', 'Darbo vietos3', 'Darbo vietos4', 'Darbo vietos5']"
            variant="outlined"
            class="rounded ml-5 mr-13 mb-10"
            hide-details="auto"
            density="compact"
            style="background-color: white"
          ></v-select>
        </v-card>

        <v-card color="#F1F1F1" class="mb-5">
          <v-card-text class="text-h6">
            Vieta*
          </v-card-text>

          <v-text-field
            label="Apskritis"
            variant="outlined"
            class="rounded mx-6 mb-5"
            hide-details="auto"
            density="compact"
            style="background-color: white"
          ></v-text-field>

          <v-text-field
            label="Adresas"
            variant="outlined"
            class="rounded mx-6 mb-10"
            hide-details="auto"
            density="compact"
            style="background-color: white"
          ></v-text-field>
        </v-card>

        <v-card color="#F1F1F1" class="mb-8" style="overflow: unset; z-index: 1"> <!-- mb-8 because of overflow -->
          <v-card-text class="text-h6">
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

        <!--        <v-card color="#F1F1F1">-->
        <!--          <v-card-text class="text-h6">-->
        <!--            Papildomi poreikiai-->
        <!--          </v-card-text>-->

        <!--          <v-select-->
        <!--            v-model="value"-->
        <!--            :items="items2"-->
        <!--            variant="outlined"-->
        <!--            class="mx-6 mb-10"-->
        <!--            chips-->
        <!--            label="Poreikiai"-->
        <!--            multiple-->
        <!--            hide-details="auto"-->
        <!--            density="compact"-->
        <!--            style="background-color: white"-->
        <!--          ></v-select>-->
        <!--        </v-card>-->
      </v-col>

      <v-col cols="12" md="8" class="d-flex flex-column">
        <v-card color="#F1F1F1" class="flex-grow right-clm">
          <v-card-text class="text-h5">
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

            <div v-if="startDate && endDate">
              <ul>
                <li v-for="room in rooms" :key="room.id">
                  <v-card class="ma-2" style="border-color: #15495A; border-width: 1px;">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="2" lg="1" class="text-center mt-3">
                          <svg-icon type="mdi" :path="mdiChairRolling"
                                    style="color: #27424B; height: 40px; width: 38px"></svg-icon>
                        </v-col>
                        <v-col cols="12" sm="6" lg="7">
                          <v-card-text class="text-h6 pa-1">
                            {{ room.name }}
                          </v-card-text>
                          <v-card-text class="text-subtitle-2 pa-1">
                            {{ room.description }}
                          </v-card-text>
                          <!--                        <div class="pa-1">-->
                          <!--                          <p class="work-tools" v-for="item in items" :key="item.title">{{ item.title }} </p>-->
                          <!--                        </div>-->
                        </v-col>

                        <v-col cols="12" sm="4" class="text-right my-auto">
                          <v-btn class="reserve text-white" style="text-transform: none" @click="reserveRoom(room.id)">
                            <p class="mx-2">Rezervuoti</p>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </li>
              </ul>
            </div>

            <div v-else class="text-center pa-6 text-subtitle-1">
              Pasirinkite nuo - iki laiką
            </div>

          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <!--    <VueDatePicker v-model="date" locale="lt" style="z-index: 10000"></VueDatePicker>-->

  </v-container>
</template>

<script setup lang="ts">
import {mdiChairRolling} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import {onMounted, ref, watch} from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import RoomService from "@/services/RoomService.ts";
import {useToast} from "vue-toastification";

const rooms = ref([]);
const toast = useToast();
const startDate = ref();
const endDate = ref();

watch([startDate, endDate], async ([newStart, newEnd]) => {
  if (newStart && newEnd) {
    try {
      const isoStart = newStart.toISOString();
      const isoEnd = newEnd.toISOString();
      rooms.value = await RoomService.getAvailableRooms(isoStart, isoEnd);
      console.log("Fetched available rooms:", rooms.value);
    } catch (error) {
      toast.error("Klaida gaunant automobilius");
      console.error("Error fetching available rooms:", error);
    }
  } else {
    rooms.value = [];
  }
});

onMounted(async () => {
  try {
    rooms.value = await RoomService.getRooms();
    console.log('Fetched rooms:', rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
});

const reserveRoom = async (roomId: string) => {
  try {
    if (!startDate.value || !endDate.value) {
      toast.error('Prasome pasirinkti data ir laika');
      return;
    }

    const response = await RoomService.reserveRoom(
      roomId,
      startDate.value,
      endDate.value
    );

    toast.success('Patalpa sekmingai rezervuota!');
    console.log('Reservation created:', response);

    // Refresh the room list
    rooms.value = await RoomService.getAvailableRooms(
      startDate.value.toISOString(),
      endDate.value.toISOString()
    );

  } catch (error) {
    toast.error('Rezervacijos klaida: ' + (error.response?.data?.message || error.message));
    console.error('Reservation error:', error);
  }
};

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
