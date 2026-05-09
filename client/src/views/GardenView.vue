<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import GardenGrid from '../components/GardenGrid.vue'
import { useEntriesStore } from '../stores/entries'

const entries = useEntriesStore()
const currentYear = new Date().getFullYear()
const earliestYear = 2024
const selectedYear = ref(currentYear)

const yearEntries = computed(() =>
  entries.entries.filter((e) => e.date.startsWith(String(selectedYear.value)))
)

async function load() {
  await entries.fetchByYear(selectedYear.value)
}

onMounted(load)
watch(selectedYear, load)
</script>

<template>
  <main class="garden-page">
    <div class="garden-header">
      <div>
        <div class="title">Your Garden</div>
        <div class="subtitle">{{ yearEntries.length }} {{ yearEntries.length === 1 ? 'rose' : 'roses' }} planted this year</div>
      </div>
      <div class="garden-yearpicker">
        <button :disabled="selectedYear <= earliestYear" @click="selectedYear--">‹</button>
        <span class="year">{{ selectedYear }}</span>
        <button :disabled="selectedYear >= currentYear" @click="selectedYear++">›</button>
      </div>
    </div>

    <div v-if="entries.loading" class="notice">Loading your garden…</div>
    <GardenGrid v-else :year="selectedYear" :entries="yearEntries" />
  </main>
</template>
