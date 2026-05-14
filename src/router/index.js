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
  {
    path: '/',
    redirect: '/login'
  },
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
    meta: { requiresAuth: false, requiresGuest: false } // Permitir acceso con token
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
  // Reset-password siempre permitido
  if (to.path === '/reset-password') return next()

  // Login siempre permitido
  if (to.path === '/login') {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) return next('/dashboard')
    return next()
  }

  // Rutas protegidas
  if (to.meta.requiresAuth) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return next('/login')
  }

  next()
})

// Prevenir navegación con flechas después de logout
router.afterEach((to) => {
  if (to.path === '/login') {
    window.history.replaceState({}, document.title, window.location.href)
  }
})

export default router
