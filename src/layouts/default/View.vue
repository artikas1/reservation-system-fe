<template>
  <v-app id="inspire">
    <v-app-bar class="bar">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="text-shades-white"></v-app-bar-nav-icon>

      <router-link to="/home" class="text-shades-white text-h6 font-weight-thin text-sm-h6 text-md-h5 text-lg-h4 router-link">
        Rezervis
      </router-link>

      <div style="font-size: 14px" class="ml-auto">
        <p class="text-shades-white text-sm-subtitle-2 text-md-subtitle-1 text-lg-h6">Vardenis Pavardenis</p>
      </div>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            <v-icon icon="mdi-account-outline" class="text-shades-white user-icon"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items3"
            :key="index"
            :value="index"
            @click="item.action && item.action()"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <div class="section">
        Pagrindinės parinktys
      </div>

      <v-card class="mx-auto">
        <v-list>
          <v-list-item :to="{name:item.to}" v-for="item in items" :key="item.value" @click="selectItem(item)">
            <v-icon :icon="item.icon" class="mr-2"></v-icon>
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-card>

      <div class="section">
        Aktualūs
      </div>

      <v-card class="mx-auto">
        <v-list>
          <v-list-item :to="{name:item.to}" v-for="item in items2" :key="item.value" @click="selectItem(item)">
            <v-icon :icon="item.icon" class="mr-2"></v-icon>
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, provide } from 'vue';

// Main component logic
const drawer = ref(null);
const selectedItem = ref(null);

const items = ref([
  {
    title: 'Patalpų rezervacija',
    value: 1,
    icon: 'mdi-office-building-outline',
    to: 'RoomReservation',
  },
  {
    title: 'Įrangos rezervacija',
    value: 2,
    icon: 'mdi-camera',
    to: 'EquipmentReservation',
  },
  {
    title: 'Automobilių rezervacija',
    value: 3,
    icon: 'mdi-car-back',
    to: 'CarReservation',
  },
]);

const items2 = ref([
  {
    title: 'Detali paieška',
    value: 1,
    icon: 'mdi-feature-search-outline',
    to: 'DetailedSearch',
  },
  {
    title: 'Rezervacijų istorija',
    value: 2,
    icon: 'mdi-history',
    to: 'ReservationHistory',
  },
]);

const logout = () => {
  localStorage.removeItem('jwtToken');
  window.location.href = '/login';
};

const items3 = ref([
  { title: 'Logout', action: logout },
]);

const selectItem = (item) => {
  selectedItem.value = item;
};

// Additional logic from the second <script> section
const showChild = ref(false);

const toggleChild = () => {
  showChild.value = !showChild.value;
};

provide('showChild', showChild);
</script>

<style>
#inspire .bar {
  background: rgb(64, 124, 146);
  background: linear-gradient(152deg, rgba(64, 124, 146, 1) 0%, rgba(33, 86, 94, 1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-icon {
  margin: 5px;
}

.section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 12px;
  color: #757575;
  background-color: #F1F1F1;
}
.v-list-item--active {
  background-color: #3b6a7b;
  color: white;
}
</style>

<style scoped>
.router-link-active {
  text-decoration: none;
}

.v-card { /*removes rounded corners from the side bar list*/
  border-radius: 0;
}

.v-list { /*removes top and bottom lip from side bar list*/
  padding: 0;
}

.router-link {
  text-decoration: none; /* Removes underline */
}
</style>
