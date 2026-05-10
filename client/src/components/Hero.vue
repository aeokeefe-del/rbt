<script setup>
import RoseCanvas from './RoseCanvas.vue'
import { SAMPLE_ENTRIES } from '../constants/palette'
import heroImg from '../assets/hero_img_rbt.png'

defineProps({ variant: { type: String, default: 'empty' } })
defineEmits(['primary', 'secondary'])

const seeds = SAMPLE_ENTRIES.slice(0, 12)
</script>

<template>
  <!-- Wireframe-faithful: real hero image + text overlay -->
  <section v-if="variant === 'empty'" class="hero">
    <div class="hero-inner variant-empty">
      <div class="hero-image-frame" aria-label="Rose Bud Thorn hero">
        <img :src="heroImg" alt="" class="hero-bg-img" />
        <div class="hero-overlay">
          <p class="hero-welcome" :style="{ fontFamily: 'var(--font-body)', fontSize: '2rem', paddingBottom: '1rem' }">welcome to</p>
          <h1 class="hero-brand">
            <em>R</em>ose&nbsp;Bud&nbsp;Thorn
          </h1>
        </div>
      </div>
    </div>
    <div class="hero-cta-row">
      <button class="hero-cta" @click="$emit('primary')">begin your garden →</button>
      <button class="hero-routerlink" type="button" @click="$emit('primary')">
        new here? <em>sign up</em>
      </button>
    </div>
  </section>

  <!-- Mini-garden illustration variant -->
  <section v-else-if="variant === 'illustration'" class="hero">
    <div class="hero-inner variant-illustration">
      <div>
        <p class="hero-eyebrow">a quiet ritual</p>
        <h1 class="hero-title">Plant a rose for<br/><em>every day.</em></h1>
        <p class="hero-sub">A daily reflection garden. Three small prompts, a color, an adjective — and your year grows into a mosaic of how you felt.</p>
        <div class="hero-actions">
          <button class="hero-cta" @click="$emit('primary')">Start your garden →</button>
          <button class="hero-cta-ghost" @click="$emit('secondary')">How it works</button>
        </div>
      </div>
      <div>
        <div class="mini-garden">
          <div v-for="i in 18" :key="i" :class="['cell', seeds[i-1] ? '' : 'empty']">
            <RoseCanvas v-if="seeds[i-1]" :color="seeds[i-1].color" :adjective="seeds[i-1].adjective" :size="44" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Headline + CTA variant -->
  <section v-else class="hero">
    <div class="hero-inner variant-content">
      <div>
        <p class="hero-eyebrow">a quiet ritual</p>
        <h1 class="hero-title">Three lines a day.<br/><em>A garden a year.</em></h1>
        <p class="hero-sub">Rose, Bud, Thorn — a gentle daily reflection. Each entry blooms into a unique rose, and a year of small honesties becomes a garden you can look back on.</p>
        <div class="hero-actions">
          <button class="hero-cta" @click="$emit('primary')">Start your garden →</button>
          <button class="hero-cta-ghost" @click="$emit('secondary')">How it works</button>
        </div>
      </div>
      <div style="display:grid;place-items:center">
        <RoseCanvas :color="{ name: 'Crimson', hex: '#DC143C' }" adjective="Joyful" :size="240" />
      </div>
    </div>
  </section>
</template>
