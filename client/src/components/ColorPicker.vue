<template>
  <div>
    <div class="text-subtitle-2 text-medium-emphasis mb-2">Choose a color for today</div>
    <div class="color-grid">
      <v-tooltip v-for="color in COLORS" :key="color.name" :text="color.name" location="top">
        <template #activator="{ props }">
          <button
            v-bind="props"
            class="color-swatch"
            :class="{ selected: modelValue?.name === color.name }"
            :style="{ backgroundColor: color.hex }"
            type="button"
            :aria-label="color.name"
            @click="$emit('update:modelValue', color)"
          />
        </template>
      </v-tooltip>
    </div>
    <div v-if="modelValue" class="mt-2 text-body-2 text-medium-emphasis">
      Selected: <strong>{{ modelValue.name }}</strong>
    </div>
  </div>
</template>

<script setup>
import { COLORS } from '../constants/palette';

defineProps({ modelValue: Object });
defineEmits(['update:modelValue']);
</script>

<style scoped>
.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.color-swatch {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}
.color-swatch:hover {
  transform: scale(1.15);
}
.color-swatch.selected {
  border-color: #333;
  transform: scale(1.2);
}
</style>
