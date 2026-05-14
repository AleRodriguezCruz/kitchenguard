// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

// Importar vistas
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import TimersView from '../views/TimersView.vue'
import HistorialView from '../views/HistorialView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false, requiresGuest: true }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView,
    meta: { requiresAuth: false, requiresGuest: false }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/timers',
    name: 'timers',
    component: TimersView,
    meta: { requiresAuth: true }
  },
  {
    path: '/historial',
    name: 'historial',
    component: HistorialView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // 1. Obtener la sesión actual de Supabase
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session

  // 2. Permitir SIEMPRE el acceso a reset-password (especialmente para el correo de recuperación)
  if (to.path === '/reset-password') {
    return next()
  }
  
  // 3. Ruta protegida + no autenticado -> Login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }
  
  // 4. Ya autenticado e intenta ir a Login -> Dashboard
  if (to.path === '/login' && isAuthenticated) {
    return next('/dashboard')
  }
  
  next()
})

export default router
