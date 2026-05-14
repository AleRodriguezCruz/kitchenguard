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
  // Permitir SIEMPRE el acceso a reset-password si viene un token en la URL
  if (to.path === '/reset-password') {
    return next()
  }
  
  // Resto de la lógica igual
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }
  
  if (to.path === '/login' && isAuthenticated) {
    return next('/dashboard')
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
