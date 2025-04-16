<template>
  <v-container class="container">

    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation mt-16">

      <p style="padding-top: 20px; padding-left: 20px;" class="text-h5">
        Resursų valdymas
      </p>


      <v-card class="mt-10 ml-10 mr-10 mb-5">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" lg="1" class="text-center mt-3 mb-3">
              <v-icon color="#27424B" size="48">mdi-office-building-outline</v-icon>
            </v-col>

            <v-col cols="12" sm="6" lg="7" class="d-flex align-center">
              <v-card-text class="text-h6 pa-1">
                Patalpų valdymas
              </v-card-text>
            </v-col>

            <v-col cols="12" sm="4" class="text-right my-auto">
              <v-tooltip text="Pridėti naują" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon="" size="small" class="me-2" v-bind="props"
                         @click="$router.push({ name: 'RoomCreation' })">
                    <v-icon color="#27424B" size="24">mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Koreguoti" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon="" size="small" class="me-2" v-bind="props"
                         @click="$router.push({ name: 'RoomCreation' })">
                    <v-icon color="#27424B" size="24">mdi-cog</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Pašalinti" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon="" size="small" class="me-2" v-bind="props">
                    <v-icon color="#27424B" size="24">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="ml-10 mr-10 mb-5">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" lg="1" class="text-center mt-3 mb-3">
              <v-icon color="#27424B" size="48">mdi-camera</v-icon>
            </v-col>

            <v-col cols="12" sm="6" lg="7" class="d-flex align-center">
              <v-card-text class="text-h6 pa-1">
                Įrangos valdymas
              </v-card-text>
            </v-col>

            <v-col cols="12" sm="4" class="text-right my-auto">
              <v-tooltip text="Pridėti naują" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon="" size="small" class="me-2" v-bind="props"
                         @click="$router.push({ name: 'EquipmentCreation' })">
                    <v-icon color="#27424B" size="24">mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Koreguoti" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon="" size="small" class="me-2" v-bind="props">
                    <v-icon color="#27424B" size="24">mdi-cog</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Pašalinti" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon="" size="small" class="me-2" v-bind="props">
                    <v-icon color="#27424B" size="24">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="ml-10 mr-10 mb-10">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="2" lg="1" class="text-center mt-3 mb-3">
              <v-icon color="#27424B" size="48">mdi-car-back</v-icon>
            </v-col>

            <v-col cols="12" sm="6" lg="7" class="d-flex align-center">
              <v-card-text class="text-h6 pa-1">
                Automobilių valdymas
              </v-card-text>
            </v-col>

            <v-col cols="12" sm="4" class="text-right my-auto">
              <v-tooltip text="Pridėti naują" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon="" size="small" class="me-2" v-bind="props"
                         @click="$router.push({ name: 'CarCreation' })">
                    <v-icon color="#27424B" size="24">mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Koreguoti" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon="" size="small" class="me-2" v-bind="props">
                    <v-icon color="#27424B" size="24">mdi-cog</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Pašalinti" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn icon="" size="small" class="me-2" v-bind="props">
                    <v-icon color="#27424B" size="24">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">


</script>

<style scoped>

</style>
