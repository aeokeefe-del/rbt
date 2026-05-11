<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const serverError = ref('')
const errors = ref({ email: '', password: '' })

async function submit() {
  errors.value = { email: '', password: '' }
  serverError.value = ''

  if (!email.value) { errors.value.email = 'Required'; return }
  if (!password.value) { errors.value.password = 'Required'; return }

  loading.value = true
  try {
    await auth.login(email.value, password.value)
  } catch (err) {
    serverError.value = err.response?.data?.error || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main style="min-height:80vh;display:grid;place-items:center;padding:var(--pad)">
    <div style="width:min(420px,100%)">
      <div class="modal" style="position:relative">
        <h2>Welcome back</h2>
        <p class="sub">sign in to your garden</p>

        <form @submit.prevent="submit">
          <label class="field">
            <span>email</span>
            <input v-model="email" type="email" placeholder="you@example.com" autocomplete="email" />
            <div class="err">{{ errors.email }}</div>
          </label>
          <label class="field">
            <span>password</span>
            <input v-model="password" type="password" placeholder="••••••••" autocomplete="current-password" />
            <div class="err">{{ errors.password }}</div>
          </label>

          <div v-if="serverError" class="notice" style="margin-bottom:12px">{{ serverError }}</div>

          <button type="submit" class="submit" :disabled="loading">
            {{ loading ? 'signing in…' : 'sign in' }}
          </button>
        </form>

        <div class="switch">
          don't have an account?
          <router-link to="/register" style="color:var(--burgundy);text-decoration:underline">create one</router-link>
        </div>
      </div>
    </div>
  </main>
</template>
