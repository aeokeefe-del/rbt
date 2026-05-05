<template>
  <v-container class="fill-height" max-width="420">
    <v-row justify="center" align="center" class="fill-height">
      <v-col>
        <div class="text-center mb-6">
          <div class="text-h4 font-weight-bold text-primary">🌹 Rose Bud Thorn</div>
          <div class="text-body-1 text-medium-emphasis mt-1">Your daily reflection garden</div>
        </div>

        <v-card elevation="3" rounded="lg">
          <v-card-text class="pa-6">
            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                variant="outlined"
                prepend-inner-icon="mdi-email-outline"
                class="mb-3"
                :error-messages="errors.email"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                variant="outlined"
                prepend-inner-icon="mdi-lock-outline"
                class="mb-4"
                :error-messages="errors.password"
              />
              <v-alert v-if="serverError" type="error" variant="tonal" class="mb-4">
                {{ serverError }}
              </v-alert>
              <v-btn type="submit" color="primary" block size="large" :loading="loading">
                Sign In
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <div class="text-center mt-4">
          <span class="text-medium-emphasis">Don't have an account? </span>
          <router-link to="/register" class="text-primary">Create one</router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const loading = ref(false);
const serverError = ref('');
const errors = ref({ email: '', password: '' });

async function submit() {
  errors.value = { email: '', password: '' };
  serverError.value = '';

  if (!email.value) { errors.value.email = 'Required'; return; }
  if (!password.value) { errors.value.password = 'Required'; return; }

  loading.value = true;
  try {
    await auth.login(email.value, password.value);
  } catch (err) {
    serverError.value = err.response?.data?.error || 'Login failed';
  } finally {
    loading.value = false;
  }
}
</script>
