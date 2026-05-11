<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const confirm = ref('')
const loading = ref(false)
const serverError = ref('')
const errors = ref({ email: '', password: '', confirm: '' })

async function submit() {
  errors.value = { email: '', password: '', confirm: '' }
  serverError.value = ''

  if (!email.value) { errors.value.email = 'Required'; return }
  if (password.value.length < 8) { errors.value.password = 'At least 8 characters'; return }
  if (password.value !== confirm.value) { errors.value.confirm = 'Passwords do not match'; return }

  loading.value = true
  try {
    await auth.register(email.value, password.value)
  } catch (err) {
    serverError.value = err.response?.data?.error || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main style="min-height:80vh;display:grid;place-items:center;padding:var(--pad)">
    <div style="width:min(420px,100%)">
      <div class="modal" style="position:relative">
        <h2>Start your garden</h2>
        <p class="sub">a quiet daily ritual</p>

        <form @submit.prevent="submit">
          <label class="field">
            <span>email</span>
            <input v-model="email" type="email" placeholder="you@example.com" autocomplete="email" />
            <div class="err">{{ errors.email }}</div>
          </label>
          <label class="field">
            <span>password</span>
            <input v-model="password" type="password" placeholder="At least 8 characters" autocomplete="new-password" />
            <div class="err">{{ errors.password }}</div>
          </label>
          <label class="field">
            <span>confirm password</span>
            <input v-model="confirm" type="password" placeholder="••••••••" autocomplete="new-password" />
            <div class="err">{{ errors.confirm }}</div>
          </label>

          <div v-if="serverError" class="notice" style="margin-bottom:12px">{{ serverError }}</div>

          <button type="submit" class="submit" :disabled="loading">
            {{ loading ? 'Creating account…' : 'create account' }}
          </button>
        </form>

        <div class="switch">
          already have an account?
          <router-link to="/login" style="color:var(--burgundy);text-decoration:underline">sign in</router-link>
        </div>
      </div>
    </div>
  </main>
</template>
