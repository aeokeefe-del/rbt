<template>
  <v-container max-width="900" class="py-8">
    <div class="d-flex align-center mb-6 gap-3">
      <div class="text-h5 font-weight-bold flex-grow-1">🌷 Your Garden</div>
      <v-btn icon="mdi-chevron-left" variant="text" :disabled="selectedYear <= earliestYear" @click="selectedYear--" />
      <span class="text-h6 font-weight-medium">{{ selectedYear }}</span>
      <v-btn icon="mdi-chevron-right" variant="text" :disabled="selectedYear >= currentYear" @click="selectedYear++" />
    </div>

    <v-progress-linear v-if="entries.loading" indeterminate color="primary" class="mb-4" />

    <template v-else>
      <div class="text-body-2 text-medium-emphasis mb-4">
        {{ yearEntries.length }} {{ yearEntries.length === 1 ? 'rose' : 'roses' }} planted this year
      </div>
      <GardenGrid :year="selectedYear" :entries="yearEntries" />
    </template>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import GardenGrid from '../components/GardenGrid.vue';
import { useEntriesStore } from '../stores/entries';

const entries = useEntriesStore();
const currentYear = new Date().getFullYear();
const earliestYear = 2024;
const selectedYear = ref(currentYear);

const yearEntries = computed(() => entries.entries.filter((e) => e.date.startsWith(String(selectedYear.value))));

async function load() {
  await entries.fetchByYear(selectedYear.value);
}

onMounted(load);
watch(selectedYear, load);
</script>
