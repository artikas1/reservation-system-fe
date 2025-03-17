<template>
  <v-app>
    <default-view class="app-container"/>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultView from './View.vue'
</script>

<style>
.app-container {
  background: rgb(38, 70, 82);
  background: linear-gradient(147deg, rgba(38, 70, 82, 1) 0%, rgba(39, 66, 75, 1) 40%, rgba(0, 80, 106, 1) 100%);
  min-height: 100%; /* Set a minimum height to cover the entire viewport */
}
</style>
