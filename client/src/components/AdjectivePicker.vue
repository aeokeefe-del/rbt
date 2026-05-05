<template>
  <div>
    <v-select
      v-model="selected"
      :items="ADJECTIVES"
      label="How would you describe today?"
      variant="outlined"
      prepend-inner-icon="mdi-emoticon-outline"
      @update:modelValue="onSelect"
    />
    <v-text-field
      v-if="selected === 'Other'"
      v-model="custom"
      label="Describe it in your own words"
      variant="outlined"
      class="mt-2"
      @update:modelValue="$emit('update:customAdjective', custom)"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ADJECTIVES } from '../constants/palette';

const props = defineProps({
  modelValue: String,
  customAdjective: String,
});
const emit = defineEmits(['update:modelValue', 'update:customAdjective']);

const selected = ref(props.modelValue || '');
const custom = ref(props.customAdjective || '');

watch(() => props.modelValue, (v) => { selected.value = v; });

function onSelect(val) {
  emit('update:modelValue', val);
  if (val !== 'Other') emit('update:customAdjective', '');
}
</script>
