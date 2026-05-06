<template>
  <v-container max-width="720" class="py-8">
    <v-btn prepend-icon="mdi-arrow-left" variant="text" to="/garden" class="mb-4">Back to Garden</v-btn>

    <v-progress-circular v-if="loading" indeterminate color="primary" class="d-block mx-auto" />

    <template v-else-if="entry">
      <v-row>
        <v-col cols="12" md="7">
          <div class="text-h5 font-weight-bold mb-3">Rose #{{ entryNumber }}</div>
          <div class="d-flex gap-2 mb-5">
            <v-chip :style="{ backgroundColor: entry.color.hex }" size="small" variant="flat">
              {{ entry.color.name }}
            </v-chip>
            <v-chip size="small" variant="tonal" color="secondary">{{ displayAdjective }}</v-chip>
          </div>

          <v-card variant="tonal" color="pink-lighten-5" class="mb-3 pa-4" rounded="lg">
            <div class="text-subtitle-2 font-weight-bold mb-1">🌹 Rose</div>
            <div class="text-body-1">{{ entry.rose || '—' }}</div>
          </v-card>
          <v-card variant="tonal" color="green-lighten-5" class="mb-3 pa-4" rounded="lg">
            <div class="text-subtitle-2 font-weight-bold mb-1">🌱 Bud</div>
            <div class="text-body-1">{{ entry.bud || '—' }}</div>
          </v-card>
          <v-card variant="tonal" color="grey-lighten-4" class="pa-4" rounded="lg">
            <div class="text-subtitle-2 font-weight-bold mb-1">🥀 Thorn</div>
            <div class="text-body-1">{{ entry.thorn || '—' }}</div>
          </v-card>
        </v-col>

        <v-col cols="12" md="5" class="d-flex align-start justify-center pt-4">
          <RoseCanvas :color="entry.color" :adjective="displayAdjective" :size="200" />
        </v-col>
      </v-row>
    </template>

    <v-alert v-else type="error" variant="tonal">Entry not found.</v-alert>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import RoseCanvas from '../components/RoseCanvas.vue';
import { useEntriesStore } from '../stores/entries';

const route = useRoute();
const entriesStore = useEntriesStore();
const entry = ref(null);
const loading = ref(true);

const entryNumber = computed(() => Number(route.params.index) + 1);

const displayAdjective = computed(() =>
  entry.value?.adjective === 'Other'
    ? (entry.value.customAdjective || 'Other')
    : entry.value?.adjective || ''
);

onMounted(async () => {
  try {
    entry.value = await entriesStore.fetchByIndex(
      Number(route.params.year),
      Number(route.params.index)
    );
  } catch {
    entry.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
