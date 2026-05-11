<script setup>
import { ref, computed, onMounted } from 'vue'
import ColorPicker from '../components/ColorPicker.vue'
import AdjectivePicker from '../components/AdjectivePicker.vue'
import RoseCanvas from '../components/RoseCanvas.vue'
import { useEntriesStore } from '../stores/entries'

const entries = useEntriesStore()
const loading = ref(false)
const error = ref('')
const saved = ref(false)

const form = ref({ color: null, adjective: '', customAdjective: '', rose: '', bud: '', thorn: '' })

const displayAdjective = computed(() =>
  form.value.adjective === 'Other' ? (form.value.customAdjective || 'Other') : form.value.adjective
)

const isValid = computed(() => form.value.color && form.value.adjective)

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

onMounted(async () => {
  try {
    const existing = await entries.fetchToday()
    if (existing) {
      form.value = {
        color: existing.color,
        adjective: existing.adjective,
        customAdjective: existing.customAdjective || '',
        rose: existing.rose,
        bud: existing.bud,
        thorn: existing.thorn,
      }
    }
  } catch {
    // No entry yet
  }
})

async function save() {
  error.value = ''
  saved.value = false
  loading.value = true
  try {
    await entries.saveEntry({
      color: form.value.color,
      adjective: form.value.adjective,
      customAdjective: form.value.customAdjective,
      rose: form.value.rose,
      bud: form.value.bud,
      thorn: form.value.thorn,
      roseParams: { adjective: displayAdjective.value },
    })
    saved.value = true
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to save'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="today-page">
    <!-- Saved state -->
    <template v-if="saved">
      <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:80px 0">
        <RoseCanvas :color="form.color" :adjective="displayAdjective" :size="240" style="margin-bottom:32px" />
        <h2 style="font-family:var(--serif);font-size:32px;font-weight:500;color:var(--burgundy);margin:0 0 12px">
          your rose has grown in your garden.
        </h2>
        <p style="font-family:var(--serif);font-style:italic;font-size:20px;color:var(--ink-soft);margin:0 0 32px">
          come back tomorrow to plant another.
        </p>
        <a href="/garden" style="font-family:var(--serif);font-style:italic;font-size:22px;padding:14px 32px;border-radius:999px;background:var(--olive);color:var(--cream);border:none;cursor:pointer;text-decoration:none">
          go to garden →
        </a>
      </div>
    </template>

    <!-- Entry form -->
    <template v-else>
      <div class="today-header">
        <div class="date">{{ today }}</div>
        <div class="greeting">plant your rose for today</div>
      </div>

      <div class="today-grid">
        <!-- Form column -->
        <div class="today-card">
          <div class="step-label">step 1 — choose your color &amp; feeling</div>
          <ColorPicker v-model="form.color" style="margin-bottom:20px" />
          <AdjectivePicker
            v-model="form.adjective"
            v-model:customAdjective="form.customAdjective"
            style="margin-bottom:8px"
          />

          <hr style="border:none;border-top:1.5px solid rgba(122,31,54,0.15);margin:22px 0" />

          <div class="step-label">step 2 — reflect on your day</div>

          <div class="entry-section rose">
            <div class="label">Rose</div>
            <div class="helper">something beautiful or joyful that happened</div>
            <textarea
              v-model="form.rose"
              placeholder="What made you smile today?"
              rows="3"
            />
          </div>

          <div class="entry-section bud">
            <div class="label">Bud</div>
            <div class="helper">something you're looking forward to</div>
            <textarea
              v-model="form.bud"
              placeholder="What are you hopeful about?"
              rows="3"
            />
          </div>

          <div class="entry-section thorn">
            <div class="label">Thorn</div>
            <div class="helper">a challenge or difficulty you faced</div>
            <textarea
              v-model="form.thorn"
              placeholder="What was hard today?"
              rows="3"
            />
          </div>

          <div v-if="error" class="notice" style="margin-top:12px">{{ error }}</div>

          <div class="save-bar">
            <button class="save" :disabled="!isValid || loading" @click="save">
              {{ loading ? 'Saving…' : 'save today\'s rose' }}
            </button>
          </div>
        </div>

        <!-- Preview column -->
        <div class="today-card preview-card">
          <div class="step-label">your rose preview</div>
          <div class="preview-box">
            <RoseCanvas
              :color="form.color || { name: '', hex: '#e8d5c4' }"
              :adjective="displayAdjective || 'Open'"
              :size="180"
            />
          </div>
          <div class="preview-meta" style="margin-top:16px">
            <span v-if="form.color" class="chip">
              <span class="swatch" :style="{ background: form.color.hex }" />
              {{ form.color.name }}
            </span>
            <span v-if="displayAdjective" class="chip">{{ displayAdjective }}</span>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>
