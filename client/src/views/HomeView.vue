<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Hero from '../components/Hero.vue'
import RosePatternBand from '../components/RosePatternBand.vue'
import QuoteBand from '../components/QuoteBand.vue'
import StampCardsSection from '../components/StampCardsSection.vue'
import Benefits from '../components/Benefits.vue'
import CtaBand from '../components/CtaBand.vue'

const router = useRouter()
const auth = useAuthStore()

function handlePrimary() {
  if (auth.token) router.push('/today')
  else router.push('/register')
}
</script>

<template>
  <Hero variant="empty" @primary="handlePrimary" @secondary="() => {}" />
  <RosePatternBand variant="middle" />
  <QuoteBand />
  <RosePatternBand variant="middle" />
  <StampCardsSection />
  <Benefits layout="icon" />
  <CtaBand @click="handlePrimary"/>
  <RosePatternBand variant="bottom" />
</template>
