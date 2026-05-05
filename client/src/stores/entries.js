import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useEntriesStore = defineStore('entries', () => {
  const entries = ref([]);
  const loading = ref(false);

  async function fetchByYear(year, month = null) {
    loading.value = true;
    try {
      const params = { year };
      if (month !== null) params.month = month;
      const { data } = await axios.get('/api/entries', { params });
      entries.value = data.entries;
    } finally {
      loading.value = false;
    }
  }

  async function fetchByDate(date) {
    const { data } = await axios.get(`/api/entries/${date}`);
    return data.entry;
  }

  async function saveEntry(payload) {
    const today = new Date().toISOString().slice(0, 10);
    const existing = entries.value.find((e) => e.date === today);
    if (existing) {
      const { data } = await axios.put(`/api/entries/${today}`, payload);
      const idx = entries.value.findIndex((e) => e.date === today);
      entries.value[idx] = data.entry;
      return data.entry;
    } else {
      const { data } = await axios.post('/api/entries', { ...payload, date: today });
      entries.value.push(data.entry);
      return data.entry;
    }
  }

  return { entries, loading, fetchByYear, fetchByDate, saveEntry };
});
