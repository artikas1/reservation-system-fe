<template>
  <v-container class="simple-form pa-6 mt-16">

    <v-form @submit.prevent="submitForm" ref="formRef">

      <div class="upload-box" @click="$refs.fileInput.click()">
        <img v-if="previewUrl" :src="previewUrl" class="preview-img" />
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
        v-model="form.name"
        label="Pavadinimas"
        variant="outlined"
        hint="Pvz. Laptop"
        required
      />


      <v-text-field
        v-model="form.manufacturer"
        label="Gamintojas"
        variant="outlined"
        hint="Pvz. Dell"
        required
      />

      <v-text-field
        v-model="form.model"
        label="Modelis"
        variant="outlined"
        hint="Pvz. XPS 13"
        required
      />

      <v-text-field
        v-model="form.code"
        label="Kodas"
        variant="outlined"
        hint="Pvz. LAP123456"
        required
      />

      <v-text-field
        v-model="form.description"
        label="Aprašas"
        variant="outlined"
        hint="Pvz. High-performance laptop"
        required
      />

      <v-select
        v-model="form.equipmentType"
        label="Įrangos tipas"
        variant="outlined"
        :items="equipmentTypeOptions"
        required
      />

      <v-select
        v-model="form.address"
        label="Adresas"
        variant="outlined"
        :items="addressOptions"
        required
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
import EquipmentService from "@/services/EquipmentService";

const toast = useToast()
const formRef = ref()

const form = ref({
  name: '',
  manufacturer: '',
  model: '',
  code: '',
  description: '',
  equipmentType: '',
  address: '',
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

const equipmentTypeOptions = ['KLAVIATURA', 'NESIOJAMAS_KOMPIUTERIS', 'PELE', 'PLANCETINIS_KOMPIUTERIS', 'PROJEKTORIUS', 'RADIO', 'WEB_KAMERA']
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

    await EquipmentService.createEquipment(formData)
    toast.success('Įranga sėkmingai sukurta!')
  } catch (error) {
    toast.error('Nepavyko sukurti įrangos')
    console.error('Create equipment error:', error)
  }
}
</script>

<style scoped>
.simple-form {
  max-width: 600px;
  background-color: #f8f8f8;
  border-radius: 12px;
}

.upload-box {
  border: 2px dashed #ccc;
  border-radius: 10px;
  background-color: #fafafa;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 16px;
  margin-bottom: 20px;
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

@media only screen and (max-width: 600px) {
  .v-container {
    margin-left: 16px !important;
    margin-right: 16px !important;
  }
}
</style>
