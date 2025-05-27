<template>
  <v-container class="pa-6">
    <v-card class="mx-auto reservation mt-16 pa-6" color="#F1F1F1" rounded="xl" max-width="600">
      <v-form @submit.prevent="submitForm" ref="formRef">

        <div class="upload-box" @click="$refs.fileInput.click()">
          <img v-if="previewUrl" :src="previewUrl" class="preview-img"/>
          <div v-else class="placeholder">
            <v-icon size="36">mdi-upload</v-icon>
            <div>Įkelti nuotrauką</div>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="d-none"
            @change="handleImageUpload"
          />
        </div>

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
          label="Kėbulo tipas"
          variant="outlined"
          :items="bodyTypeOptions"
          required
        />

        <v-select
          v-model="form.address"
          label="Adresas"
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
    </v-card>
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
  image: '',
})

const previewUrl = ref<string | null>(null)

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file) {
    form.value.image = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const bodyTypeOptions = ['SEDANAS', 'UNIVERSALAS', 'HECBEKAS', 'MINIVENAS']
const addressOptions = ['AKADEMIJOS_G_7', 'GEDIMINO_PR_9', 'KONSTITUCIJOS_PR_12', 'NERIES_G_3', 'SAULETEKIO_AL_15']

const submitForm = async () => {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  try {
    const formData = new FormData()
    for (const key in form.value) {
      const val = form.value[key as keyof typeof form.value]
      if (val) formData.append(key, val as any)
    }

    await CarService.createCar(formData); // send as form-data
    toast.success('Automobilis sėkmingai sukurtas!');
  } catch (error) {
    toast.error('Nepavyko sukurti automobilio');
    console.error('Create car error:', error);
  }
}

</script>

<style scoped>

.upload-box {
  border: 2px dashed #ccc;
  border-radius: 10px;
  background-color: #fafafa;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 16px 0 20px;
  overflow: hidden;
}

.preview-img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.placeholder {
  text-align: center;
  color: #666;
}

.d-none {
  display: none;
}

.create {
  background: linear-gradient(-12deg, #324951 0%, #116f4b 100%);
  border-radius: 10px;
}

</style>

