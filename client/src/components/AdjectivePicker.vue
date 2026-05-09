<script setup>
import { ADJECTIVES } from '../constants/palette'

const props = defineProps({
  modelValue: String,
  customAdjective: String,
})
const emit = defineEmits(['update:modelValue', 'update:customAdjective'])
</script>

<template>
  <div>
    <div class="adj-grid">
      <button
        v-for="a in ADJECTIVES"
        :key="a"
        type="button"
        :class="['adj-chip', { selected: modelValue === a }]"
        @click="emit('update:modelValue', a)"
      >{{ a }}</button>
    </div>
    <input
      v-if="modelValue === 'Other'"
      class="adj-other"
      placeholder="Describe today in your own words…"
      :value="customAdjective"
      @input="emit('update:customAdjective', $event.target.value)"
    />
  </div>
</template>
