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

  async function fetchToday() {
    const { data } = await axios.get('/api/entries', { params: { current: 1 } });
    return data.entry;
  }

  async function fetchByIndex(year, index) {
    const { data } = await axios.get('/api/entries', { params: { year } });
    return data.entries[index] ?? null;
  }

  async function saveEntry(payload) {
    try {
      const { data } = await axios.post('/api/entries', payload);
      entries.value.push(data.entry);
      return data.entry;
    } catch (err) {
      if (err.response?.status !== 409) throw err;
      const { data } = await axios.put('/api/entries', payload);
      const idx = entries.value.findIndex((e) => e._id === data.entry._id);
      if (idx >= 0) entries.value[idx] = data.entry;
      return data.entry;
    }
  }

  return { entries, loading, fetchByYear, fetchToday, fetchByIndex, saveEntry };
});
