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
                  <v-btn icon="" size="small" class="me-2" v-bind="props"
                         @click="$router.push({ name: 'RoomDeletion' })">
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
                  <v-btn icon="" size="small" class="me-2" v-bind="props"
                         @click="$router.push({ name: 'EquipmentDeletion' })">
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
                  <v-btn icon="" size="small" class="me-2" v-bind="props"
                         @click="$router.push({ name: 'CarDeletion' })">
                    <v-icon color="#27424B" size="24">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    </v-card>

    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation mt-10">
      <p style="padding-top: 20px; padding-left: 20px;" class="text-h5">
        Sistemos statistika
      </p>

      <v-card class="ma-10">
        <v-card-text>
          <v-row>

            <v-col cols="12" md="6" class="d-flex flex-column align-center">
              <text class="text-h6 mb-4">Visos rezervacijos</text>

              <div style="width: 100%; height: 300px;">
                <template v-if="hasReservationData">
                  <Doughnut :data="chartData" :options="chartOptions"/>
                </template>
                <template v-else>
                  <text class="d-flex align-center justify-center" style="height: 100%; font-size: 18px; color: grey;">
                    Nėra rezervacijų duomenų
                  </text>
                </template>
              </div>
            </v-col>

            <v-col cols="12" md="6" class="d-flex flex-column align-center">
              <text class="text-h6 mb-4">Visi resursai</text>

              <div style="width: 100%; height: 300px;">
                <template v-if="hasResourceData">
                  <Doughnut :data="resourcesChartData" :options="chartOptions"/>
                </template>
                <template v-else>
                  <text class="d-flex align-center justify-center" style="height: 100%; font-size: 18px; color: grey;">
                    Nėra resursų duomenų
                  </text>
                </template>
              </div>
            </v-col>

          </v-row>
        </v-card-text>
      </v-card>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import {Doughnut} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, ArcElement} from 'chart.js'
import {ref, onMounted} from 'vue'
import StatisticService from '@/services/StatisticService'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = ref({
  labels: ['Automobiliai', 'Įranga', 'Patalpos'],
  datasets: [{
    label: 'Rezervacijos',
    data: [0, 0, 0],
    backgroundColor: [
      'rgb(54, 162, 235)', // blue
      'rgb(255, 205, 86)', // yellow
      'rgb(255, 99, 132)'  // red
    ],
    hoverOffset: 4
  }]
})

const resourcesChartData = ref({
  labels: ['Automobiliai', 'Įranga', 'Patalpos'],
  datasets: [{
    label: 'Resursai',
    data: [0, 0, 0],
    backgroundColor: [
      'rgb(75, 192, 192)', // cyan
      'rgb(255, 159, 64)', // orange
      'rgb(153, 102, 255)' // violet
    ],
    hoverOffset: 4
  }]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
})

// Bus du boolean'ai atskirai
const hasReservationData = ref(false)
const hasResourceData = ref(false)

const fetchStatistics = async () => {
  try {
    const data = await StatisticService.getReservationStatistics()
    chartData.value.datasets[0].data = [
      data.car || 0,
      data.equipment || 0,
      data.room || 0
    ]
    hasReservationData.value = (data.car + data.equipment + data.room) > 0
  } catch (error) {
    console.error('Failed to fetch reservation statistics', error)
    hasReservationData.value = false
  }
}

const fetchResources = async () => {
  try {
    const data = await StatisticService.getResourceStatistics()
    resourcesChartData.value.datasets[0].data = [
      data.cars || 0,
      data.equipment || 0,
      data.rooms || 0
    ]
    hasResourceData.value = (data.cars + data.equipment + data.rooms) > 0
  } catch (error) {
    console.error('Failed to fetch resource statistics', error)
    hasResourceData.value = false
  }
}

onMounted(() => {
  fetchStatistics()
  fetchResources()
})
</script>

<style scoped>
</style>
