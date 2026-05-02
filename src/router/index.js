import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabaseClient'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import TimersView from '../views/TimersView.vue'
import HistorialView from '../views/HistorialView.vue'
import SetupView from '../views/SetupView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/timers',
    component: TimersView,
    meta: { requiresAuth: true }
  },
  {
    path: '/historial',
    component: HistorialView,
    meta: { requiresAuth: true }
  },
  {
    path: '/setup/:code?',
    name: 'setup',
    component: SetupView,
    meta: { requiresAuth: false }
  },
  {
    path: '/generate-qr',
    name: 'qr-generator',
    component: () => import('../views/QRGeneratorView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      return `/login?redirect=${encodeURIComponent(to.fullPath)}`
    }
  }
})

export default router






