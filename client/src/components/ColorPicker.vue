<script setup>
import { COLORS } from '../constants/palette'

const props = defineProps({ modelValue: Object })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <div class="color-picker">
      <button
        v-for="c in COLORS"
        :key="c.name"
        type="button"
        :title="c.name"
        :aria-label="c.name"
        :class="['color-swatch', { selected: modelValue?.name === c.name }]"
        :style="{ backgroundColor: c.hex }"
        @click="emit('update:modelValue', c)"
      />
    </div>
    <div class="color-name">
      <template v-if="modelValue">selected: <strong>{{ modelValue.name }}</strong></template>
      <template v-else>choose a color for today</template>
    </div>
  </div>
</template>
