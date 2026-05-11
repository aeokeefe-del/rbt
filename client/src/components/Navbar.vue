<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import logoImg from '../assets/logo_rbt.png'

const router = useRouter()
const auth = useAuthStore()

function navigate(path) {
  router.push(path)
}

function logout() {
  auth.logout()
}
</script>

<template>
  <nav class="navbar">
    <button
      class="logo-button"
      aria-label="rbt. home"
      @click="navigate(auth.token ? '/today' : '/')"
    >
      <img :src="logoImg" alt="rbt." class="logo-img" />
      <span class="logo" style="display:none">rbt<span class="dot">.</span></span>
    </button>
    <div class="nav-actions">
      <template v-if="auth.token">
        <button class="nav-link" @click="navigate('/today')">today</button>
        <button class="nav-link" @click="navigate('/garden')">garden</button>
        <button class="pill" @click="logout">sign out</button>
      </template>
      <template v-else>
        <button class="pill" @click="navigate('/login')">log in</button>
        <button class="pill solid" @click="navigate('/register')">sign up</button>
      </template>
    </div>
  </nav>
  <div class="nav-underline" />
</template>
<style scoped>
.logo-img {
  height: 50px;
  width: auto;
}
</style>
