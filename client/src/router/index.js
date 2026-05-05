import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/login', component: () => import('../views/LoginView.vue'), meta: { guest: true } },
  { path: '/register', component: () => import('../views/RegisterView.vue'), meta: { guest: true } },
  { path: '/', component: () => import('../views/TodayView.vue'), meta: { requiresAuth: true } },
  { path: '/garden', component: () => import('../views/GardenView.vue'), meta: { requiresAuth: true } },
  { path: '/entry/:date', component: () => import('../views/EntryView.vue'), meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) return '/login';
  if (to.meta.guest && auth.token) return '/';
});

export default router;
