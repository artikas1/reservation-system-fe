<template>
  <v-container class="container ma-16 d-flex flex-wrap mx-auto" style="max-width: 71vw">
    <v-row class="d-flex flex-grow">
      <v-col cols="12" md="4" rounded="xl">
        <v-card color="#F1F1F1" class="mb-5">
          <v-card-text class="text-h6">
            Automobilių tipas*
          </v-card-text>
          <v-select
            label="Automobilių tipas"
            multiple
            :items="[ 'Sedanas', 'Universalas', 'Hečbekas', 'Minivenas']"
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
      </v-col>

      <v-col cols="12" md="8" class="d-flex flex-column">
        <v-card color="#F1F1F1" class="flex-grow right-clm">
          <v-card-text class="text-h5">
            Automobiliai
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

            <div v-if="startDate && endDate">
              <ul>
                <li v-for="car in cars" :key="car.id">
                  <v-card class="ma-2" style="border-color: #15495A; border-width: 1px;">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="2" lg="1" class="text-center mt-3">
                          <svg-icon type="mdi" :path="mdiCarBack"
                                    style="color: #27424B; height: 40px; width: 38px"></svg-icon>
                        </v-col>
                        <v-col cols="12" sm="6" lg="7">
                          <v-card-text class="text-h6 pa-1">
                            {{ car.manufacturer }} {{ car.model }}
                          </v-card-text>

                          <v-tooltip location="top">
                            <template #activator="{ props }">
                              <svg-icon
                                v-if="car.isEcoFriendly"
                                v-bind="props"
                                type="mdi"
                                :path="mdiSprout"
                                style="color: green; margin-left: 8px; height: 24px; width: 24px;"
                              />
                            </template>
                            <span>Ekologiškesnis pasirinkimas</span>
                          </v-tooltip>

                          <v-card-text class="text-subtitle-2 pa-1">
                            {{ car.bodyType }}
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" sm="4" class="text-right my-auto">
                          <v-btn class="reserve text-white" style="text-transform: none" @click="reserveCar(car.id)">
                            <p class="mx-2">Rezervuoti</p>
                          </v-btn>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="4"
                          class="my-auto"
                          v-if="reviews[car.id]?.length > 0"
                        >
                          <v-btn @click="showComments(car.id)">
                            <p class="mx-2">Komentarai</p>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-expand-transition>
                        <div v-if="visibleCommentId === car.id" class="px-4 pb-4 pt-1 mt-6">
                          <div v-if="reviews[car.id]?.length">
                            <div
                              v-for="(review, index) in reviews[car.id]"
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
import {useToast} from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiCarBack, mdiSprout} from "@mdi/js";
import CarService from "@/services/CarService.ts";
import ReviewService from "@/services/ReviewService";
import { formatDateTime } from "@/utils/dateFormatter";
import { EntityType } from "@/types/EntityType";

const cars = ref([]);
const reviews = ref<Record<string, { content: string; createdAt: string }[]>>({});
const visibleCommentId = ref<string | null>(null);

const startDate = ref();
const endDate = ref();

const toast = useToast();

const showComments = (carId: string) => {
  visibleCommentId.value = visibleCommentId.value === carId ? null : carId;
};

watch([startDate, endDate], async ([newStart, newEnd]) => {
  if (newStart && newEnd) {
    try {
      const isoStart = newStart.toISOString();
      const isoEnd = newEnd.toISOString();

      //Fetch available cars
      cars.value = await CarService.getAvailableEcoCars(isoStart, isoEnd);
      console.log("Fetched available cars:", cars.value);

      //Fetch all reviews in parallel
      const reviewPromises = cars.value.map(car =>
        ReviewService.getReviewsByEntity(car.id, EntityType.CAR)
          .catch(error => {
            console.warn(`Failed to get reviews for car ${car.id}`, error);
            return [] as Review[]; // Explicitly type the fallback
          })
      );

      const allReviews = await Promise.all(reviewPromises);

      //Assign reviews to each car
      cars.value.forEach((car, index) => {
        reviews.value[car.id] = allReviews[index];
      });

    } catch (error) {
      toast.error("Klaida gaunant automobilius");
      console.error("Error fetching available cars:", error);
    }
  } else {
    cars.value = [];
  }
});

const reserveCar = async (carId: string) => {
  try {
    if (!startDate.value || !endDate.value) {
      toast.error('Prasome pasirinkti data ir laika');
      return;
    }

    const response = await CarService.reserveCar(
      carId,
      startDate.value,
      endDate.value
    );

    toast.success('Automobilis sekmingai rezervuotas!');
    console.log('Reservation created:', response);

    // Refresh the car list
    cars.value = await CarService.getAvailableEcoCars(
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
