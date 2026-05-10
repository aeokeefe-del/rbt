<script setup>
import ScrollReveal from './ScrollReveal.vue'
defineEmits(['click'])
</script>

<template>
  <ScrollReveal>
    <section class="cta-band">
      <button class="cta-pill" @click="$emit('click')">grow your garden today →</button>
    </section>
  </ScrollReveal>
</template>
