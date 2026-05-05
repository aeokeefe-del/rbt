<template>
  <svg :width="size" :height="size" :viewBox="`0 0 100 100`" xmlns="http://www.w3.org/2000/svg">
    <!-- Stem -->
    <line x1="50" :y1="stemY" x2="50" y2="95" :stroke="stemColor" stroke-width="2" stroke-linecap="round" />
    <!-- Leaves -->
    <ellipse
      cx="43" cy="80" rx="7" ry="3"
      :fill="leafColor" transform="rotate(-30 43 80)" opacity="0.9"
    />
    <ellipse
      cx="57" cy="74" rx="7" ry="3"
      :fill="leafColor" transform="rotate(30 57 74)" opacity="0.9"
    />
    <!-- Petals (outer ring) -->
    <ellipse
      v-for="(p, i) in outerPetals"
      :key="'o' + i"
      :cx="p.cx" :cy="p.cy"
      :rx="p.rx" :ry="p.ry"
      :fill="petalColor"
      :opacity="0.75"
      :transform="`rotate(${p.angle} 50 50)`"
    />
    <!-- Petals (inner ring) -->
    <ellipse
      v-for="(p, i) in innerPetals"
      :key="'i' + i"
      :cx="p.cx" :cy="p.cy"
      :rx="p.rx" :ry="p.ry"
      :fill="petalColorDark"
      :opacity="0.85"
      :transform="`rotate(${p.angle} 50 50)`"
    />
    <!-- Center -->
    <circle cx="50" cy="50" :r="centerR" :fill="centerColor" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: { type: Object, default: () => ({ name: 'Crimson', hex: '#DC143C' }) },
  adjective: { type: String, default: 'Joyful' },
  size: { type: Number, default: 100 },
});

// Adjective → petal count (5–10) and openness (spread)
const ADJECTIVE_PARAMS = {
  Joyful:      { petals: 10, spread: 16, openness: 0.55 },
  Calm:        { petals: 7,  spread: 13, openness: 0.45 },
  Grateful:    { petals: 9,  spread: 15, openness: 0.5  },
  Hopeful:     { petals: 8,  spread: 14, openness: 0.48 },
  Excited:     { petals: 10, spread: 17, openness: 0.58 },
  Proud:       { petals: 9,  spread: 15, openness: 0.52 },
  Content:     { petals: 7,  spread: 13, openness: 0.44 },
  Anxious:     { petals: 6,  spread: 11, openness: 0.38 },
  Stressed:    { petals: 6,  spread: 10, openness: 0.35 },
  Tired:       { petals: 5,  spread: 10, openness: 0.33 },
  Sad:         { petals: 5,  spread: 10, openness: 0.3  },
  Overwhelmed: { petals: 6,  spread: 11, openness: 0.36 },
};

const params = computed(() => ADJECTIVE_PARAMS[props.adjective] || { petals: 8, spread: 14, openness: 0.48 });

const petalColor = computed(() => props.color?.hex || '#DC143C');

// Darken the hex by ~20% for inner petals
const petalColorDark = computed(() => darken(petalColor.value, 0.2));
const centerColor = computed(() => darken(petalColor.value, 0.35));
const stemColor = '#5D8A5E';
const leafColor = '#4A7A4A';

const centerR = computed(() => 6 + params.value.openness * 4);
const stemY = computed(() => 50 + centerR.value + 14);

const outerPetals = computed(() => buildPetals(params.value.petals, params.value.spread, 5, 12));
const innerPetals = computed(() => buildPetals(params.value.petals, params.value.spread * 0.6, 4, 9));

function buildPetals(count, spread, rx, ry) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (360 / count) * i;
    return { cx: 50, cy: 50 - spread, rx, ry, angle };
  });
}

function darken(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 0xff) * (1 - amount)) | 0;
  const g = Math.max(0, ((n >> 8) & 0xff) * (1 - amount)) | 0;
  const b = Math.max(0, (n & 0xff) * (1 - amount)) | 0;
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
</script>
