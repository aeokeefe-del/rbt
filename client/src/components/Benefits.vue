<script setup>
import ScrollReveal from './ScrollReveal.vue'

defineProps({ layout: { type: String, default: 'icon' } })

const BENEFITS = [
  { variant: 'rose',  title: 'Cultivate Mindfulness',   body: 'Slow down and notice the small good things you would otherwise miss.',          glyph: 'rose' },
  { variant: 'bud',   title: 'Track Emotional Patterns', body: 'See the shape of your year — not just the days, but how they felt.',            glyph: 'bud' },
  { variant: 'thorn', title: 'Nurture Gratitude',        body: 'Reflection, not perfection. A practice that meets you where you are.',          glyph: 'thorn' },
]

</script>

<template>
  <ScrollReveal>
    <section class="benefits">
      <div class="benefits-inner">
        <p class="benefits-eyebrow">why it works</p>
        <h2 class="benefits-title">Reflection, in three lines.</h2>

        <!-- Icon rows (default) -->
        <div v-if="layout === 'icon'" class="benefits-list-icon">
          <div v-for="b in BENEFITS" :key="b.title" :class="['row', b.variant]">
            <div class="icon">
              <!-- Rose glyph -->
              <svg v-if="b.glyph === 'rose'" viewBox="0 0 80 80" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="40" cy="34" r="14"/><circle cx="40" cy="34" r="9"/><circle cx="40" cy="34" r="4"/>
                <path d="M40 48 L40 72"/><path d="M40 60 Q30 56 24 62"/><path d="M40 66 Q50 62 56 68"/>
              </svg>
              <!-- Bud glyph -->
              <svg v-else-if="b.glyph === 'bud'" viewBox="0 0 80 80" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M40 16 Q32 22 32 34 Q32 44 40 46 Q48 44 48 34 Q48 22 40 16 Z"/>
                <path d="M40 22 Q42 30 40 46"/><path d="M40 46 L40 72"/><path d="M40 58 Q32 56 28 62"/>
              </svg>
              <!-- Thorn glyph -->
              <svg v-else viewBox="0 0 80 80" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 44 Q40 30 66 44"/>
                <path d="M22 42 L18 32"/><path d="M32 38 L30 28"/><path d="M42 36 L42 26"/>
                <path d="M52 38 L54 28"/><path d="M60 42 L64 32"/>
              </svg>
            </div>
            <div>
              <h4>{{ b.title }}</h4>
              <p>{{ b.body }}</p>
            </div>
          </div>
        </div>

        <!-- Card grid -->
        <div v-else-if="layout === 'cards'" class="benefits-list-cards">
          <div v-for="b in BENEFITS" :key="b.title" :class="['card', b.variant]">
            <div class="icon">
              <svg v-if="b.glyph === 'rose'" viewBox="0 0 80 80" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="40" cy="34" r="14"/><circle cx="40" cy="34" r="9"/><circle cx="40" cy="34" r="4"/>
                <path d="M40 48 L40 72"/><path d="M40 60 Q30 56 24 62"/><path d="M40 66 Q50 62 56 68"/>
              </svg>
              <svg v-else-if="b.glyph === 'bud'" viewBox="0 0 80 80" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M40 16 Q32 22 32 34 Q32 44 40 46 Q48 44 48 34 Q48 22 40 16 Z"/>
                <path d="M40 22 Q42 30 40 46"/><path d="M40 46 L40 72"/><path d="M40 58 Q32 56 28 62"/>
              </svg>
              <svg v-else viewBox="0 0 80 80" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 44 Q40 30 66 44"/>
                <path d="M22 42 L18 32"/><path d="M32 38 L30 28"/><path d="M42 36 L42 26"/>
                <path d="M52 38 L54 28"/><path d="M60 42 L64 32"/>
              </svg>
            </div>
            <h4>{{ b.title }}</h4>
            <p>{{ b.body }}</p>
          </div>
        </div>

        <!-- Text only -->
        <div v-else class="benefits-list-text">
          <div v-for="b in BENEFITS" :key="b.title" :class="['item', b.variant]">{{ b.title }}</div>
        </div>
      </div>
    </section>
  </ScrollReveal>
</template>
