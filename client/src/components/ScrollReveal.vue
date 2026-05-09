<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  delay: { type: Number, default: 0 },
})

const el = ref(null)
const shown = ref(false)
let io = null

onMounted(() => {
  io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => { shown.value = true }, props.delay)
        io.disconnect()
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
  if (el.value) io.observe(el.value)
})

onUnmounted(() => io?.disconnect())
</script>

<template>
  <div ref="el" :class="['reveal', { in: shown }]">
    <slot />
  </div>
</template>
