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
              <v-icon
                color="#27424B" size="48"
                @click="$router.push({ name: 'RoomList' })"
                class="hoverable-clickable"
                style="cursor: pointer"
              >
                mdi-office-building-outline
              </v-icon>
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
              <v-icon
                color="#27424B" size="48"
                @click="$router.push({ name: 'EquipmentList' })"
                class="hoverable-clickable"
                style="cursor: pointer"
              >
                mdi-camera
              </v-icon>
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
              <v-icon
                color="#27424B" size="48"
                @click="$router.push({ name: 'CarList' })"
                class="hoverable-clickable"
                style="cursor: pointer"
              >
                mdi-car-back
              </v-icon>
            </v-col>

            <v-col cols="12" sm="6" lg="7" class="d-flex align-center">
              <v-card-text class="text-h6 pa-1"
              >
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

    <v-card color="#F1F1F1" rounded="xl" class="mx-auto reservation mt-10">

      <p style="padding-top: 20px; padding-left: 20px;" class="text-h5">
        Darbo priemonės statistika
      </p>
      <v-card class="ma-10">
        <v-card-text class="mt-3">
          <v-row class="align-center">
            <v-col cols="12" xs="12" sm="4" md="4" class="ml-sm-5 mr-xs-3">
              <v-text-field
                v-model="resourceIdInput"
                :type="showId ? 'text' : 'password'"
                label="Resurso ID"
                placeholder="Įveskite ID"
                outlined
                dense
                :append-inner-icon="showId ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showId = !showId"
              />
            </v-col>

            <v-col cols="12" xs="12" sm="4" md="4" class="ml-xs-3 mr-xs-3">
              <v-text-field
                v-model="yearInput"
                label="Metai"
                placeholder="pvz. 2025"
                outlined
                dense
                type="number"
              />
            </v-col>

            <v-col cols="12" xs="12" sm="3" md="3" class="mr-xs-3">
              <v-row class="justify-end">
                <v-btn class="reserve text-white" @click="handleFetch">
                  Peržiūrėti
                </v-btn>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="ml-2">
            <v-col cols="12">
              <span v-if="resourceName" class="text-subtitle-1 font-weight-medium">Darbo priemonė: {{
                  resourceName
                }}</span>
              <br>
              <span v-if="resourceInfo.description" class="text-body-1">{{ resourceInfo.description }}</span>
            </v-col>
          </v-row>

          <v-card class="ma-5">
            <div style="width: 100%; height: 400px;">
              <Line :data="usageChartData" :options="usageChartOptions" :key="chartKey"/>
            </div>
          </v-card>
        </v-card-text>
      </v-card>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import {Doughnut} from 'vue-chartjs'
import {Line} from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'

import {ref, onMounted, reactive} from 'vue'
import StatisticService from '@/services/StatisticService'
import CarService from '@/services/CarService'
import EquipmentService from '@/services/EquipmentService'
import RoomService from '@/services/RoomService'

const showId = ref(false)

const fetchResourceName = async () => {
  resourceName.value = '...'
  resourceInfo.value = '...'

  try {
    const id = resourceIdInput.value

    try {
      const car = await CarService.getCarById(id)
      resourceName.value = `${car.manufacturer} ${car.model}`
      resourceInfo.description = `Valstybiniai numeriai - ${car.numberPlate}`
      return
    } catch (error) {
      // silently ignore
    }

    try {
      const equipment = await EquipmentService.getEquipmentById(id)
      resourceName.value = `${equipment.name} ${equipment.manufacturer}`
      resourceInfo.description = `Kodas - ${equipment.code}`
      return
    } catch (error) {
      // silently ignore
    }

    try {
      const room = await RoomService.getRoomById(id)
      resourceName.value = `${room.name}, nr.${room.roomNumber}`
      resourceInfo.description = room.description
      return
    } catch (error) {
      // silently ignore
    }

    resourceName.value = 'Resursas nerastas'
  } catch (error) {
    resourceName.value = 'Klaida gaunant pavadinimą'
  }
}

const resourceIdInput = ref('fe691876-0eaa-4403-84a2-300e8a6fc13a')
const yearInput = ref(new Date().getFullYear())
const resourceName = ref('')
const resourceInfo = reactive({
  description: ''
})

const handleFetch = () => {
  if (resourceIdInput.value && yearInput.value) {
    fetchResourceName()
    fetchUsageHistory()
  }
}

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

const chartData = ref({
  labels: ['Automobiliai', 'Įranga', 'Patalpos'],
  datasets: [{
    label: 'Rezervacijos',
    data: [],
    backgroundColor: [
      'rgb(54, 162, 235)', // blue
      'rgb(255, 205, 86)', // yellow
      'rgb(255, 99, 132)'   //violet
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
      'rgb(54, 162, 235)', // blue
      'rgb(255, 205, 86)', // yellow
      'rgb(255, 99, 132)' // violet
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
const hasUsageData = ref(false)
const chartKey = ref(0)

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
  fetchUsageHistory()
  fetchResourceName()
})

const fetchUsageHistory = async () => {
  try {
    const resourceId = resourceIdInput.value
    const year = yearInput.value // naudojame įvestą metų reikšmę

    const usage = await StatisticService.getResourceUsageHistory(resourceId, year)

    const monthNamesLt = ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis']
    const labels = usage.map(entry => monthNamesLt[parseInt(entry.month, 10) - 1])
    const data = usage.map(entry => Number(entry.hours))

    usageChartData.labels = labels
    usageChartData.datasets[0].data = data

    hasUsageData.value = data.some(h => h > 0)
  } catch (error) {
    console.error('Failed to fetch usage history', error)
    hasUsageData.value = false
  }
  chartKey.value++
}


const usageChartData = reactive({
  labels: [],
  datasets: [{
    label: 'Rezervuotos valandos',
    data: [],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
})

const usageChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  },
  scales: {
    x: {
      type: 'category',
      title: {
        display: true,
        text: 'Mėnuo'
      }
    },
    y: {
      beginAtZero: true,
      max: 744, // 31 d. * 24 val. = maksimalios galimos valandos per mėnesį
      title: {
        display: true,
        text: 'Valandos'
      }
    }
  }
})

</script>

<style scoped>

.reserve {
  background: linear-gradient(-12deg, #324951 0%, #116f4b 100%);
  border-radius: 10px;
}

</style>
