<script setup lang="ts">
import {computed, ref} from 'vue';

const show = ref(false);

const props = defineProps({
  cars: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(['filter']);

const statuses = computed(() => {
  // return props.cars.map(car => car.bodyType);
  return [...new Set(props.cars.map(car => car.bodyType))];
});

const filter = (e) => {
  emit('filter', e.target.value);
}
</script>

<template>

  <v-card color="#F1F1F1" class="mb-5">
    <v-card-text class="text-h6">
      Automobilių tipas*
    </v-card-text>
    <v-select
      label="Automobilių tipas"
      multiple
      :items="statuses"
      variant="outlined"
      class="rounded ml-5 mr-13 mb-10"
      hide-details="auto"
      density="compact"
      style="background-color: white"
      @change="filter"
    ></v-select>
  </v-card>

  <div class="relative flex items-center w-full px-4">
    <button @click="show = !show"
            class="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900">
      Filter
    </button>
    <div v-if="show" class="absolute top-12 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow">
      <ul class="space-y-2 text-sm">
        <li v-for="(bodyType, index) in statuses">
          <input :id="`filter_option_${index}`" @change="filter" type="checkbox" :value="bodyType"
                 class="w-4 h-4 bg-gray-300 rounded text-amber">
          <label :for="`filter_option_${index}`" class="ml-2 text-sm font-medium text-gray-900">{{ bodyType }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
