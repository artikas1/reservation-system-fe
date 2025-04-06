<template>
  <v-container class="container">
    <v-responsive class="d-flex align-center text-center fill-height" style="margin-top: 10.41vw">
      <div class="d-flex flex-wrap justify-center align-center">
        <!-- First button pair -->
        <div class="d-flex">
          <v-btn :to="{ name: 'RoomReservation' }" class="btn mx-2 mb-4" stacked>
            <svg-icon type="mdi" :path="mdiOfficeBuildingOutline" class="text-white icon"></svg-icon>
            Patalpų rezervacija
          </v-btn>

          <v-btn :to="{ name: 'EquipmentReservation' }" class="btn mx-2 mb-4" stacked>
            <svg-icon type="mdi" :path="mdiCamera" class="text-white icon"></svg-icon>
            Įrangos rezervacija
          </v-btn>
        </div>

        <!-- Second button pair -->
        <div class="d-flex">
          <v-btn :to="{ name: 'CarReservation' }" class="btn mx-2 mb-4" stacked>
            <svg-icon type="mdi" :path="mdiCarBack" class="text-white icon"></svg-icon>
            Automobilių rezervacija
          </v-btn>

          <v-btn :to="{ name: 'ReservationHistory' }" class="btn mx-2 mb-4" stacked>
            <svg-icon type="mdi" :path="mdiHistory" class="text-white icon"></svg-icon>
            Rezervacijų istorija
          </v-btn>
        </div>
      </div>

    </v-responsive>
  </v-container>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiOfficeBuildingOutline, mdiCamera, mdiCarBack, mdiHistory} from '@mdi/js';

</script>

<style scoped>

#inspire .btn {
  background: rgb(64, 124, 146);
  background: linear-gradient(28deg, rgba(18, 91, 136, 0.93) 0%, rgba(46, 148, 161, 0.89) 55%, #1b8fa6 100%);
  color: white;
  font-size: 16px;
  border-radius: 20px;
  text-transform: none;
  transition: width 0.5s, height 0.5s, font-size 0.5s;
}

.icon {
  width: 78px;
  height: 78px;
  margin-bottom: 20px;
  transition: width 0.5s, height 0.5s, font-size 0.5s;
}

@media only screen and (max-width: 600px) {
  #inspire .btn {
    width: 140px;
    height: 140px;
    font-size: 12px;
  }

  .icon {
    width: 55px;
    height: 55px;
    margin-bottom: 20px;
  }
}

@media (min-width: 600px) and (max-width: 1279px) {
  #inspire .btn {
    width: 200px;
    height: 200px;
    font-size: 16px;
  }

  .icon {
    width: 78px;
    height: 78px;
    margin-bottom: 20px;
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  #inspire .btn {
    width: 200px;
    height: 200px;
    font-size: 16px;
  }

  .icon {
    width: 78px;
    height: 78px;
    margin-bottom: 20px;
  }
}

@media (min-width: 1920px) {
  #inspire .btn {
    width: 260px;
    height: 260px;
    font-size: 21px;
  }

  .icon {
    width: 101px;
    height: 101px;
    margin-bottom: 20px;
  }
}
</style>


