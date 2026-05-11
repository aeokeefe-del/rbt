<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const auth = useAuthStore()

const isHome = computed(() => route.path === '/')
</script>

<template>
  <v-app>
    <div class="app-shell">
      <div class="top-stripe" />
      <Navbar />
      <main style="flex:1;min-height:0">
        <router-view />
      </main>
    </div>
  </v-app>
</template>
