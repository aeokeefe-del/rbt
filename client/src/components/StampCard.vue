<script setup>
defineProps({
  variant: String,
  label: String,
  body: String,
})
</script>

<template>
  <div class="stamp" :data-color="variant">
    <div class="icon" aria-hidden="true">
      <slot name="icon" />
    </div>
    <div class="label">{{ label }}</div>
    <p class="body">{{ body }}</p>
  </div>
</template>
