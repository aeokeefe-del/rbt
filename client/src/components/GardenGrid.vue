<template>
  <div class="garden-grid">
    <router-link
      v-for="cell in cells"
      :key="cell.date"
      :to="cell.entry ? `/entry/${cell.date}` : '#'"
      class="garden-cell"
      :class="{ empty: !cell.entry }"
      :title="cell.entry ? `${cell.date} — ${cell.entry.adjective}` : cell.date"
    >
      <RoseCanvas
        v-if="cell.entry"
        :color="cell.entry.color"
        :adjective="cell.entry.adjective === 'Other' ? (cell.entry.customAdjective || 'Other') : cell.entry.adjective"
        :size="56"
      />
      <div v-else class="empty-dot" />
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import RoseCanvas from './RoseCanvas.vue';

const props = defineProps({
  year: { type: Number, required: true },
  entries: { type: Array, default: () => [] },
});

const cells = computed(() => {
  const map = Object.fromEntries(props.entries.map((e) => [e.date, e]));
  const result = [];
  const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const daysInMonth = [31, isLeap(props.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const today = new Date().toISOString().slice(0, 10);

  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= daysInMonth[m - 1]; d++) {
      const date = `${props.year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (date > today) break;
      result.push({ date, entry: map[date] || null });
    }
  }
  return result;
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
.garden-cell:not(.empty):hover {
  transform: scale(1.12);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1;
}
.empty-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e0e0e0;
}
</style>
