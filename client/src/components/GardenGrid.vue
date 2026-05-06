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

<script setup>
import RoseCanvas from './RoseCanvas.vue';

defineProps({
  year: { type: Number, required: true },
  entries: { type: Array, default: () => [] },
});
</script>

<style scoped>
.garden-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.garden-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.15s;
  background: rgba(0,0,0,0.03);
}
.garden-cell:hover {
  transform: scale(1.12);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1;
}
</style>
