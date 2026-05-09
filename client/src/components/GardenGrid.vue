<script setup>
import RoseCanvas from './RoseCanvas.vue'

defineProps({
  year: { type: Number, required: true },
  entries: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="garden-grid">
    <router-link
      v-for="(entry, i) in entries"
      :key="entry._id"
      :to="`/entry/${year}/${i}`"
      class="garden-cell"
      :title="`Rose #${i + 1} — ${entry.adjective === 'Other' ? (entry.customAdjective || 'Other') : entry.adjective}`"
    >
      <RoseCanvas
        :color="entry.color"
        :adjective="entry.adjective === 'Other' ? (entry.customAdjective || 'Other') : entry.adjective"
        :size="56"
      />
    </router-link>
  </div>
</template>
