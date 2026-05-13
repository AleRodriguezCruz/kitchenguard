import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import TimersView from '../views/TimersView.vue'
import HistorialView from '../views/HistorialView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/reset-password', component: ResetPasswordView },
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // ✅ Rutas públicas (sin autenticación)
  const publicRoutes = ['/login', '/reset-password']
  
  if (publicRoutes.includes(to.path)) {
    return true  // Permitir acceso sin verificar sesión
  }

  // ✅ Rutas protegidas
  if (to.meta.requiresAuth) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return '/login'
    }
  }

  return true
})

export default router
