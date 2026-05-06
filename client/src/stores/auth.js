import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';

function safeParseUser() {
  try {
    return JSON.parse(localStorage.getItem('rbt_user')) ?? null;
  } catch {
    localStorage.removeItem('rbt_user');
    return null;
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('rbt_token') || '');
  const user = ref(safeParseUser());

  function setSession(data) {
    token.value = data.token;
    user.value = data.user;
    localStorage.setItem('rbt_token', data.token);
    localStorage.setItem('rbt_user', JSON.stringify(data.user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  }

  function clearSession() {
    token.value = '';
    user.value = null;
    localStorage.removeItem('rbt_token');
    localStorage.removeItem('rbt_user');
    delete axios.defaults.headers.common['Authorization'];
  }

  // Restore axios header on page reload
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  }

  async function register(email, password) {
    const { data } = await axios.post('/api/auth/register', { email, password });
    setSession(data);
    router.push('/');
  }

  async function login(email, password) {
    const { data } = await axios.post('/api/auth/login', { email, password });
    setSession(data);
    router.push('/');
  }

  function logout() {
    clearSession();
    router.push('/login');
  }

  return { token, user, register, login, logout };
});
