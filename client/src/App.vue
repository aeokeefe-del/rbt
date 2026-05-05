<template>
  <v-app>
    <v-app-bar color="primary" elevation="2" v-if="auth.token">
      <v-app-bar-title>
        <span class="text-white font-weight-bold">🌹 Rose Bud Thorn</span>
      </v-app-bar-title>
      <v-btn :to="'/'" variant="text" color="white">Today</v-btn>
      <v-btn :to="'/garden'" variant="text" color="white">Garden</v-btn>
      <v-btn variant="text" color="white" @click="auth.logout">Sign Out</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from './stores/auth';
const auth = useAuthStore();
</script>
