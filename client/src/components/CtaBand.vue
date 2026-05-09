<script setup>
import ScrollReveal from './ScrollReveal.vue'
defineEmits(['click'])
</script>

<template>
  <ScrollReveal>
    <section class="cta-band">
      <button class="cta-pill" @click="$emit('click')">Grow Your Garden Today →</button>
    </section>
  </ScrollReveal>
</template>
