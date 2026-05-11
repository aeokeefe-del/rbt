import { createApp } from 'vue';
import './assets/styles.css';
import axios from 'axios';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import router from './router';
import App from './App.vue';

// Point API calls at the Railway backend when deployed to GitHub Pages
if (import.meta.env.VITE_API_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#DC143C',
          secondary: '#967BB6',
          background: '#FFF9F7',
          surface: '#FFFFFF',
        },
      },
    },
  },
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount('#app');
