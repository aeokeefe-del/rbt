<script setup>
import ScrollReveal from './ScrollReveal.vue'
import StampCard from './StampCard.vue'
import StripedAwning from './StripedAwning.vue'
</script>

<template>
  <div class="section-header">What is Rose Bud Thorn?</div>
  <StripedAwning>
    <div class="stamp-cards-section" style="padding: 0 var(--pad)">
      <div class="stamp-cards-grid">
        <ScrollReveal :delay="0">
          <StampCard variant="rose" label="Rose" body="Something beautiful that happened today — a moment of joy, success, or gratitude.">
            <template #icon>
              <svg viewBox="0 0 80 80" width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="40" cy="34" r="14"/><circle cx="40" cy="34" r="9"/><circle cx="40" cy="34" r="4"/>
                <path d="M40 48 L40 72"/><path d="M40 60 Q30 56 24 62"/><path d="M40 66 Q50 62 56 68"/>
              </svg>
            </template>
          </StampCard>
        </ScrollReveal>
        <ScrollReveal :delay="120">
          <StampCard variant="bud" label="Bud" body="Something you're excited about — a hope, dream, or opportunity on the horizon.">
            <template #icon>
              <svg viewBox="0 0 80 80" width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M40 16 Q32 22 32 34 Q32 44 40 46 Q48 44 48 34 Q48 22 40 16 Z"/>
                <path d="M40 22 Q42 30 40 46"/><path d="M40 46 L40 72"/><path d="M40 58 Q32 56 28 62"/>
              </svg>
            </template>
          </StampCard>
        </ScrollReveal>
        <ScrollReveal :delay="240">
          <StampCard variant="thorn" label="Thorn" body="A challenge you faced — an opportunity to grow and learn from difficulty.">
            <template #icon>
              <svg viewBox="0 0 80 80" width="80" height="80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 44 Q40 30 66 44"/>
                <path d="M22 42 L18 32"/><path d="M32 38 L30 28"/><path d="M42 36 L42 26"/>
                <path d="M52 38 L54 28"/><path d="M60 42 L64 32"/>
              </svg>
            </template>
          </StampCard>
        </ScrollReveal>
      </div>
    </div>
  </StripedAwning>
</template>
