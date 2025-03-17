<template>
  <v-container class="container ma-16 mx-auto" style=" max-width: 71vw">
    <v-card color="#F1F1F1" class="mb-5" style="overflow: unset; z-index: 1">
      <v-card-text class="text-h6">
        Mano rezervacijos
      </v-card-text>
      <div class="d-flex flex-wrap mb-5 pa-2 ml-4" style="gap: 10px">

        <v-select
          label="Patalpų tipas"
          :items="['Darbo vietos', 'Darbo vietos1', 'Darbo vietos2', 'Darbo vietos3', 'Darbo vietos4', 'Darbo vietos5']"
          variant="outlined"
          style="min-width: 100px; max-width: 140px; height: 40px; background-color: white"
          hide-details="auto"
          density="compact"
          class="rounded"
        ></v-select>

        <v-select
          label="Būsena"
          :items="['Būsena1', 'Būsena2', 'Būsena3', 'Būsena4', 'Būsena5']"
          variant="outlined"
          style="min-width: 100px; max-width: 140px; height: 40px; background-color: white"
          hide-details="auto"
          density="compact"
          class="rounded"
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
            <v-card class="ma-2" style="border-color: #15495A; border-width: 1px; overflow: unset">
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="2" md="1" class="text-center mt-3">
                    <svg-icon type="mdi" :path="mdiChairRolling"
                              style="color: #27424B; height: 40px; width: 38px">
                    </svg-icon>
                  </v-col>
                  <v-col cols="12" sm="6" md="7">
                    <v-card-text class="text-subtitle-2 pa-1">
                      Saltoniškių g. 19, 2 aukštas
                    </v-card-text>
                    <v-card-text class="text-h6 pa-1">
                      Darbo vieta
                    </v-card-text>
                    <v-card-text class="text-subtitle-4 pa-1">
                      Rezervuota nuo 2023-09-18 iki 2023-10-18
                    </v-card-text>
                    <div class="pa-1">
                      <p class="work-tools" v-for="item in items" :key="item.title">{{ item.title }} </p>
                    </div>
                  </v-col>

                  <v-col cols="12" md="4" class="text-right my-auto">
                    <v-btn icon class="me-2 text-left">
                      <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
                    </v-btn>
                    <v-btn icon class="text-right">
                      <svg-icon type="mdi" :path="mdiClose"></svg-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card class="ma-2" style="border-color: #15495A; border-width: 1px; overflow: unset">
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="2" md="1" class="text-center mt-3">
                    <svg-icon type="mdi" :path="mdiCamera"
                              style="color: #27424B; height: 40px; width: 38px"></svg-icon>
                  </v-col>
                  <v-col cols="12" sm="6" md="7">
                    <v-card-text class="text-h6 pa-1">
                      Nešiojamas kompiuteris
                    </v-card-text>
                    <v-card-text class="text-subtitle-4 pa-1">
                      Rezervuota nuo 2023-09-18 iki 2023-10-18
                    </v-card-text>
                  </v-col>

                  <v-col cols="12" md="4" class="text-right my-auto">
                    <v-btn icon class="me-2">
                      <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>
                    </v-btn>
                    <v-btn icon>
                      <svg-icon type="mdi" :path="mdiClose"></svg-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {mdiCamera, mdiChairRolling, mdiClose, mdiPencilOutline} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import {ref} from "vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();

const items = ref([
  {
    title: 'Kompiuteris',
    value: 1,
  },
  {
    title: 'Monitorius',
    value: 2,
  }
]);
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
