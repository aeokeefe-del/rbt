<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RoseCanvas from '../components/RoseCanvas.vue'
import { useEntriesStore } from '../stores/entries'

const route = useRoute()
const router = useRouter()
const entriesStore = useEntriesStore()
const entry = ref(null)
const loading = ref(true)

const entryNumber = computed(() => Number(route.params.index) + 1)

const displayAdjective = computed(() =>
  entry.value?.adjective === 'Other'
    ? (entry.value.customAdjective || 'Other')
    : entry.value?.adjective || ''
)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [, month, day] = dateStr.split('-').map(Number)
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const s = day % 10
  const suffix = day >= 11 && day <= 13 ? 'th' : s === 1 ? 'st' : s === 2 ? 'nd' : s === 3 ? 'rd' : 'th'
  return `${months[month - 1]} ${day}${suffix}`
}

const displayDate = computed(() => formatDate(entry.value?.date))

onMounted(async () => {
  try {
    entry.value = await entriesStore.fetchByIndex(
      Number(route.params.year),
      Number(route.params.index)
    )
  } catch {
    entry.value = null
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="entry-detail-page">
    <button class="back-link" @click="router.push('/garden')">← Back to garden</button>

    <div v-if="loading" class="notice">Loading…</div>
    <div v-else-if="!entry" class="notice">Entry not found.</div>
    <template v-else>
      <div class="garden-header" style="margin-bottom:28px">
        <div>
          <div class="title" style="font-size:56px">Rose #{{ entryNumber }} <span class="entry-date-sep">·</span> {{ displayDate }}</div>
          <div class="subtitle">{{ displayAdjective }} · {{ entry.color?.name }}</div>
        </div>
      </div>

      <div class="entry-detail-grid">
        <div>
          <div class="read-card rose">
            <div class="label">Rose</div>
            <p>{{ entry.rose || '—' }}</p>
          </div>
          <div class="read-card bud">
            <div class="label">Bud</div>
            <p>{{ entry.bud || '—' }}</p>
          </div>
          <div class="read-card thorn">
            <div class="label">Thorn</div>
            <p>{{ entry.thorn || '—' }}</p>
          </div>
        </div>
        <div style="display:grid;place-items:center;position:sticky;top:24px">
          <RoseCanvas :color="entry.color" :adjective="displayAdjective" :size="220" />
          <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
            <span class="chip"><span class="swatch" :style="{ background: entry.color?.hex }" />{{ entry.color?.name }}</span>
            <span class="chip">{{ displayAdjective }}</span>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>
