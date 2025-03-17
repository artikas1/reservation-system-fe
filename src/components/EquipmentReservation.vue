<template>
  <v-container class="container ma-16 d-flex flex-wrap mx-auto" style="max-width: 71vw">
    <v-row class="d-flex flex-grow">
      <v-col cols="12" md="4" rounded="xl">
        <v-card color="#F1F1F1" class="mb-5">
          <v-card-text class="text-h6">
            Įrangos tipas*
          </v-card-text>
          <v-select
            label="Įrangos tipas"
            :items="['Nešiojamas kompiuteris', 'Plančetinis kompiuteris', 'Web-kamera', 'Projektorius', 'Klaviatura', 'Pelė']"
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

        <v-card color="#F1F1F1" class="mb-5" style="overflow: unset; z-index: 1">
          <v-card-text class="text-h6">
            Data ir laikas*
          </v-card-text>
          <v-row class="d-flex mb-10">

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
      </v-col>

      <v-col cols="12" md="8" class="d-flex flex-column">
        <v-card color="#F1F1F1" class="flex-grow right-clm">
          <v-card-text class="text-h5">
            Įranga
          </v-card-text>
          <div class="d-flex justify-end">
            <v-select
              label="Filtrai"
              :items="['Rūšiuoti pagal datą', 'Rūšiuoti pagal adresą A-Z', 'Rūšiuoti pagal adresą Z-A']"
              variant="outlined"
              class="rounded ml-5 mr-5 align-self-end mb-3"
              style="max-width: 140px; font-size: 12px; background-color: white"
              hide-details="auto"
              density="compact"
            ></v-select>
          </div>

          <v-card class="bg-white mx-6 all-reservations" style="overflow: auto">

            <ul>
              <li v-for="equipment in equipment" :key="equipment.id">
                <v-card class="ma-2" style="border-color: #15495A; border-width: 1px;">
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="2" lg="1" class="text-center mt-3">
                        <svg-icon type="mdi" :path="mdiCamera"
                                  style="color: #27424B; height: 40px; width: 38px"></svg-icon>
                      </v-col>
                      <v-col cols="12" sm="6" lg="7">
                        <v-card-text class="text-h6 pa-1">
                          {{ equipment.name }}
                        </v-card-text>
                        <v-card-text class="text-subtitle-2 pa-1">
                          {{ equipment.manufacturer }}
                          {{ equipment.model }}
                        </v-card-text>
                        <div class="pa-1">
                          <p class="work-tools" v-for="item in item" :key="item.title">{{ item.title }} </p>
                        </div>
                      </v-col>

                      <v-col cols="12" sm="4" class="text-right my-auto">
                        <v-btn class="reserve text-white" style="text-transform: none">
                          <p class="mx-2">Rezervuoti</p>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </li>
            </ul>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {mdiCamera} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {onMounted, ref} from "vue";
import EquipmentService from "@/Services/EquipmentService";

const date = ref();
const equipment = ref([]);

// Fetch cars when the component is mounted
onMounted( async () => {
  try {
    equipment.value = await EquipmentService.getEquipment();
    console.log('Fetched equipment:', equipment.value);
  } catch (error) {
    console.error('Error fetching equipment:', error);
  }
});

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
    min-height: 540px;
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
    min-height: 720px;
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
    min-height: 680px;
  }

  .all-reservations {
    height: 500px;
  }
}
</style>
