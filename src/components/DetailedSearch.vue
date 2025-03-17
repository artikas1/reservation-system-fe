<template>
  <v-container class="container ma-16 d-flex flex-wrap mx-auto" style="max-width: 71vw">
    <v-row class="d-flex flex-grow">
      <v-col cols="12" md="4" rounded="xl">
        <v-card color="#F1F1F1" class="mb-5">
          <v-card-text class="text-h6">
            Tipas
          </v-card-text>
          <v-select
            label="Tipas"
            :items="['Darbo vietos', 'Įranga', 'Automobiliai']"
            variant="outlined"
            class="rounded ml-5 mr-13 mb-10"
            hide-details="auto"
            density="compact"
            style="background-color: white"
          ></v-select>
        </v-card>

        <v-card color="#F1F1F1" class="mb-5">
          <v-card-text class="text-h6">
            Vieta
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

        <v-card color="#F1F1F1" class="mb-8" style="overflow: unset; z-index: 1">
          <v-card-text class="text-h6">
            Data ir laikas
          </v-card-text>
          <v-row class="d-flex">
            <v-col class="mb-10">
              <VueDatePicker
                label="Patalpų tipas"
                class="pl-6"
                v-model="date"
                locale="lt"
              ></VueDatePicker>
            </v-col>

            <v-col>
              <VueDatePicker
                class="pr-6"
                v-model="date"
                locale="lt"
              ></VueDatePicker>
            </v-col>

          </v-row>
        </v-card>

        <v-card color="#F1F1F1">
          <v-card-text class="text-h6">
            Papildomi poreikiai
          </v-card-text>

          <v-select
            v-model="value"
            :items="items2"
            variant="outlined"
            class="mx-6 mb-10"
            chips
            label="Poreikiai"
            multiple
            hide-details="auto"
            density="compact"
            style="background-color: white"
          ></v-select>
        </v-card>
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
    <!--    <VueDatePicker v-model="date" locale="lt" style="z-index: 10000"></VueDatePicker>-->

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

<script>
export default {
  data: () => ({
    items2: ['Kompiuteris', 'Monitorius', 'Web-kamera'],
    value: ['Kompiuteris', 'Monitorius', 'Web-kamera'],
  }),
}
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
    height: 540px;
  }

  .all-reservations {
    height: 360px;
  }
}

@media (min-width: 600px) and (max-width: 1279px) {
  .right-clm {
    height: 720px;
  }

  .all-reservations {
    height: 500px;
  }
}

@media (min-width: 1280px) {
  .right-clm {
    height: 680px;
  }

  .all-reservations {
    height: 500px;
  }
}
</style>
