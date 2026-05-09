<script setup>
const props = defineProps({
  variant: { type: String, default: 'middle' },
  height: Number,
})

const heights = { top: 150, middle: 170, footer: 280 }
const h = props.height || heights[props.variant] || 170

const stem = '#5E6A3F', bloom = '#7A1F36', bloom2 = '#B14860', leaf = '#7A8755'

const tile = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 140' width='180' height='140'>
  <g fill='none' stroke='${stem}' stroke-width='1.6' stroke-linecap='round'>
    <path d='M30 140 C30 110 22 96 14 88'/>
    <path d='M90 140 C90 100 100 88 110 80'/>
    <path d='M150 140 C150 116 142 100 134 92'/>
  </g>
  <g fill='none' stroke='${leaf}' stroke-width='1.4' stroke-linecap='round'>
    <path d='M30 116 Q22 112 18 104'/><path d='M30 100 Q40 96 44 88'/>
    <path d='M90 110 Q102 106 108 96'/><path d='M90 124 Q80 120 76 112'/>
    <path d='M150 120 Q140 116 136 108'/><path d='M150 104 Q160 100 164 92'/>
  </g>
  <g stroke='${bloom}' stroke-width='1.4' fill='none'>
    <circle cx='14' cy='84' r='9'/><circle cx='14' cy='84' r='5.5'/><circle cx='14' cy='84' r='2.5'/>
    <circle cx='134' cy='88' r='9'/><circle cx='134' cy='88' r='5.5'/><circle cx='134' cy='88' r='2.5'/>
  </g>
  <g stroke='${bloom2}' stroke-width='1.4' fill='none'>
    <circle cx='110' cy='76' r='10'/><circle cx='110' cy='76' r='6'/><circle cx='110' cy='76' r='2.6'/>
  </g>
  <g fill='none' stroke='${leaf}' stroke-width='1.2' stroke-linecap='round' opacity='0.7'>
    <path d='M60 138 C60 124 56 116 50 110'/>
    <path d='M120 138 C120 130 124 122 130 118'/>
  </g>
</svg>`

const dataUri = `url("data:image/svg+xml;utf8,${encodeURIComponent(tile)}")`
</script>

<template>
  <div
    class="rose-pattern-band"
    role="presentation"
    aria-hidden="true"
    :style="{
      height: h + 'px',
      backgroundImage: dataUri,
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto 100%',
      backgroundPosition: '0 bottom',
    }"
  />
</template>
