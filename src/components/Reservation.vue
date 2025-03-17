<template>
  <v-container class="container">
    <!--    <v-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2">-->
    <!--      <v-card color="#F1F1F1" rounded="xl" class="mx-auto">-->
    <!--        <v-row>-->
    <!--          <v-col cols="12">-->
    <!--            <p style="padding-top: 20px; padding-left: 20px;">-->
    <!--              Mano aktyvios rezervacijos-->
    <!--            </p>-->
    <!--            <v-card class="ma-10">-->
    <!--              <v-card-text>-->
    <!--                <v-row>-->
    <!--                  <v-col cols="12" sm="2" md="1" class="text-center mt-3">-->
    <!--                    <svg-icon type="mdi" :path="mdiChairRolling"-->
    <!--                              style="color: #27424B; height: 40px; width: 38px"></svg-icon>-->
    <!--                  </v-col>-->
    <!--                  <v-col cols="12" sm="6" md="7">-->
    <!--                    <v-card-title class="text-subtitle-1 pb-1">-->
    <!--                      Darbo vieta-->
    <!--                    </v-card-title>-->
    <!--                    <v-card-text class="pb-1">-->
    <!--                      Saltoniškių g. 19, 2 aukštas<br>-->
    <!--                      Rezervuota nuo 2023-09-18 iki 2023-10-18-->
    <!--                    </v-card-text>-->
    <!--                    <div style="margin-bottom: 10px; margin-left: 14px">-->
    <!--                      <p class="work-tools" v-for="item in items" :key="item.title">{{ item.title }} </p>-->
    <!--                    </div>-->
    <!--                  </v-col>-->

    <!--                  <v-col cols="12" md="4" class="text-right my-auto">-->
    <!--                    <v-btn icon class="me-2">-->
    <!--                      <svg-icon type="mdi" :path="mdiPencilOutline"></svg-icon>-->
    <!--                    </v-btn>-->
    <!--                    <v-btn icon>-->
    <!--                      <svg-icon type="mdi" :path="mdiClose"></svg-icon>-->
    <!--                    </v-btn>-->
    <!--                  </v-col>-->
    <!--                </v-row>-->
    <!--              </v-card-text>-->
    <!--            </v-card>-->
    <!--          </v-col>-->
    <!--        </v-row>-->
    <!--      </v-card>-->
    <!--    </v-col>-->
    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation">
      <p style="padding-top: 20px; padding-left: 20px;">
        Mano aktyvios rezervacijos
      </p>
      <v-card class="ma-10">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" md="1" class="text-center mt-3">
              <svg-icon type="mdi" :path="mdiChairRolling"
                        style="color: #27424B; height: 40px; width: 38px"></svg-icon>
            </v-col>
            <v-col cols="12" sm="6" md="7">
              <v-card-title class="text-subtitle-1 pb-1">
                Darbo vieta
              </v-card-title>
              <v-card-text class="pb-1">
                Saltoniškių g. 19, 2 aukštas<br>
                Rezervuota nuo 2023-09-18 iki 2023-10-18
              </v-card-text>
              <div style="margin-bottom: 10px; margin-left: 14px">
                <p class="work-tools" v-for="item in items" :key="item.title">{{ item.title }} </p>
              </div>
            </v-col>

            <v-col cols="12" sm="4" class="text-right my-auto">
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
  </v-container>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiChairRolling, mdiPencilOutline, mdiClose} from '@mdi/js';
import {ref} from "vue";

const items = ref([
  {
    title: 'Kompiuteris',
    value: 1,
  },
  {
    title: 'Monitorius',
    value: 2,
  },
]);

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


