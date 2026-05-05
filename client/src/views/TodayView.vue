<template>
  <v-container max-width="720" class="py-8">
    <div class="text-h5 font-weight-bold mb-1">Today's Entry</div>
    <div class="text-body-2 text-medium-emphasis mb-6">{{ todayFormatted }}</div>

    <v-row>
      <!-- Form column -->
      <v-col cols="12" md="7">
        <v-card elevation="2" rounded="lg" class="pa-5">
          <v-form @submit.prevent="save">
            <ColorPicker v-model="form.color" class="mb-5" />
            <AdjectivePicker
              v-model="form.adjective"
              v-model:customAdjective="form.customAdjective"
              class="mb-2"
            />

            <v-divider class="my-4" />

            <v-textarea
              v-model="form.rose"
              label="🌹 Rose — something good that happened today"
              variant="outlined"
              rows="3"
              class="mb-3"
            />
            <v-textarea
              v-model="form.bud"
              label="🌱 Bud — something you're looking forward to"
              variant="outlined"
              rows="3"
              class="mb-3"
            />
            <v-textarea
              v-model="form.thorn"
              label="🥀 Thorn — something difficult today"
              variant="outlined"
              rows="3"
              class="mb-4"
            />

            <v-alert v-if="error" type="error" variant="tonal" class="mb-4">{{ error }}</v-alert>
            <v-alert v-if="saved" type="success" variant="tonal" class="mb-4">Entry saved!</v-alert>

            <v-btn type="submit" color="primary" block size="large" :loading="loading" :disabled="!isValid">
              Save Today's Rose
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <!-- Preview column -->
      <v-col cols="12" md="5" class="d-flex flex-column align-center justify-start pt-4">
        <div class="text-subtitle-2 text-medium-emphasis mb-3">Your rose preview</div>
        <RoseCanvas :color="form.color" :adjective="displayAdjective" :size="180" />
        <div v-if="form.color" class="mt-3 text-body-2">
          <v-chip :color="form.color.hex" size="small" variant="flat" class="mr-1" text-color="white">
            {{ form.color.name }}
          </v-chip>
          <v-chip size="small" variant="tonal" color="secondary">{{ displayAdjective }}</v-chip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ColorPicker from '../components/ColorPicker.vue';
import AdjectivePicker from '../components/AdjectivePicker.vue';
import RoseCanvas from '../components/RoseCanvas.vue';
import { useEntriesStore } from '../stores/entries';

const entries = useEntriesStore();
const loading = ref(false);
const error = ref('');
const saved = ref(false);

const today = new Date().toISOString().slice(0, 10);
const todayFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const form = ref({ color: null, adjective: '', customAdjective: '', rose: '', bud: '', thorn: '' });

const displayAdjective = computed(() =>
  form.value.adjective === 'Other' ? (form.value.customAdjective || 'Other') : form.value.adjective
);

const isValid = computed(() => form.value.color && form.value.adjective);

onMounted(async () => {
  try {
    const existing = await entries.fetchByDate(today);
    if (existing) {
      form.value = {
        color: existing.color,
        adjective: existing.adjective,
        customAdjective: existing.customAdjective || '',
        rose: existing.rose,
        bud: existing.bud,
        thorn: existing.thorn,
      };
    }
  } catch {
    // No entry for today yet — start fresh
  }
});

async function save() {
  error.value = '';
  saved.value = false;
  loading.value = true;
  try {
    await entries.saveEntry({
      color: form.value.color,
      adjective: form.value.adjective,
      customAdjective: form.value.customAdjective,
      rose: form.value.rose,
      bud: form.value.bud,
      thorn: form.value.thorn,
      roseParams: { adjective: displayAdjective.value },
    });
    saved.value = true;
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to save';
  } finally {
    loading.value = false;
  }
}
</script>
