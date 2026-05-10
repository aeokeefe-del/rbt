<script setup>
const props = defineProps({
  variant: { type: String, default: 'middle' },
  height: Number,
})

const variants = {
  middle: {
    src: new URL('../assets/rbt_border.svg', import.meta.url).href,
    defaultHeight: 175,
    fit: 'cover',
  },

  bottom: {
    src: new URL('../assets/rbt_footer.svg', import.meta.url).href,
    defaultHeight: 400,
    fit: 'cover',
  },
}

const current = variants[props.variant] || variants.middle
const h = props.height || current.defaultHeight
</script>

<template>
  <div
    class="rose-band"
    role="presentation"
    aria-hidden="true"
    :style="{ height: h + 'px' }"
  >
    <img
      :src="current.src"
      alt=""
      class="band-svg"
      :style="{ objectFit: current.fit }"
    />
  </div>
</template>

<style scoped>
.rose-band {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.band-svg {
  width: 100%;
  height: 100%;
  display: block;
  object-position: center;
}
</style>