<template>
  <v-container
    class="pa-6 mt-16"
    style="max-width: 600px;
    background-color: #f8f8f8;
    border-radius: 12px"
  >
    <v-form @submit.prevent="submitForm" ref="formRef">
      <v-text-field
        v-model="form.manufacturer"
        label="Gamintojas"
        variant="outlined"
        hint="Pvz. BMW"
        required
      />

      <v-text-field
        v-model="form.model"
        label="Modelis"
        variant="outlined"
        hint="Pvz. 530d xDrive"
        required
      />

      <v-text-field
        v-model="form.vin"
        label="VIN"
        variant="outlined"
        hint="Pvz. WBAJE5C56JB123456"
        required
      />

      <v-text-field
        v-model="form.fuel"
        label="Kuro tipas"
        variant="outlined"
        hint="Pvz. Benzinas, Dyzelis"
        required
      />

      <v-text-field
        v-model="form.manufacturerDate"
        label="Pagaminimo data"
        variant="outlined"
        hint="Pvz. 2018-01-01"
        required
      />

      <v-text-field
        v-model="form.engineCapacity"
        label="Variklio tūris (cc)"
        variant="outlined"
        hint="Pvz. 2993"
        required
      />

      <v-text-field
        v-model="form.numberPlate"
        label="Valstybiniai numeriai"
        variant="outlined"
        hint="Pvz. AAA111"
        required
      />

      <v-select
        v-model="form.bodyType"
        label="Body Type"
        variant="outlined"
        :items="bodyTypeOptions"
        required
      />

      <v-select
        v-model="form.address"
        label="Address"
        variant="outlined"
        :items="addressOptions"
        required
      />

      <v-text-field
        v-model="form.averageFuelConsumption"
        label="Vidutinės kuro sanaudos (neprivaloma)"
        variant="outlined"
        hint="Pvz. 6.0, 6.5"
        type="number"
        hide-spin-buttons
      />

      <div class="d-flex justify-end mt-4">
        <v-btn type="submit" color="success" class="create">Išsaugoti</v-btn>
      </div>

    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useToast} from 'vue-toastification'
import CarService from '@/services/CarService'

const toast = useToast()
const formRef = ref()

const form = ref({
  manufacturer: '',
  model: '',
  vin: '',
  fuel: '',
  manufacturerDate: '',
  engineCapacity: '',
  numberPlate: '',
  bodyType: '',
  address: '',
  averageFuelConsumption: null,
})

const bodyTypeOptions = ['SEDANAS', 'UNIVERSALAS', 'HECBEKAS', 'MINIVENAS']
const addressOptions = ['AKADEMIJOS_G_7', 'GEDIMINO_PR_9', 'KONSTITUCIJOS_PR_12', 'NERIES_G_3', 'SAULETEKIO_AL_15']

const submitForm = async () => {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  try {
    const formData = new FormData();
    for (const key in form.value) {
      if (form.value[key] !== null && form.value[key] !== '') {
        formData.append(key, form.value[key]);
      }
    }

    await CarService.createCar(formData); // send as form-data
    toast.success('Automobilis sėkmingai sukurtas!');
  } catch (err) {
    toast.error('Nepavyko sukurti automobilio.');
    console.error('Create car error:', err);
  }
}

</script>

<style scoped>
.create {
  background: linear-gradient(-12deg, #324951 0%, #116f4b 100%);
  border-radius: 10px;
}

@media only screen and (max-width: 600px) {
  .v-container {
    margin-left: 16px !important;
    margin-right: 16px !important;
  }
}

</style>

