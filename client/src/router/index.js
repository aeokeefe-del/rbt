import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/login', component: () => import('../views/LoginView.vue'), meta: { guest: true } },
  { path: '/register', component: () => import('../views/RegisterView.vue'), meta: { guest: true } },
  { path: '/today', component: () => import('../views/TodayView.vue'), meta: { requiresAuth: true } },
  { path: '/', component: () => import ('../views/HomeView.vue'), meta: { guest: true }},
  { path: '/garden', component: () => import('../views/GardenView.vue'), meta: { requiresAuth: true } },
  { path: '/entry/:year/:index', component: () => import('../views/EntryView.vue'), meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) return '/';
  if (to.meta.guest && auth.token) return '/today';
});

export default router;
