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

// 🔒 GUARD DE NAVEGACIÓN - VERSIÓN CORREGIDA
router.beforeEach(async (to, from, next) => {
  // Obtener sesión actual
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session
  
  // 🔴 DETECTAR TOKEN DE RECUPERACIÓN EN LA URL
  const hasResetToken = to.path === '/reset-password' && (
    to.query.token || 
    window.location.hash.includes('access_token')
  )
  
  // Caso especial: reset-password con token válido
  if (hasResetToken) {
    console.log('🔐 Modo recuperación detectado - permitiendo acceso')
    return next()
  }
  
  // Caso especial: solo la ruta reset-password sin token
  if (to.path === '/reset-password' && !hasResetToken) {
    // Permitir acceso pero mostrar formulario de solicitud
    return next()
  }
  
  // 🔴 Ruta protegida sin autenticación → login
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('🔒 Ruta protegida sin sesión → login')
    return next('/login')
  }
  
  // 🟢 Usuario autenticado intenta ir a login → dashboard
  if ((to.path === '/login') && isAuthenticated) {
    console.log('⚠️ Usuario autenticado en login → dashboard')
    return next('/dashboard')
  }
  
  // ✅ Todo correcto
  next()
})

// Prevenir navegación con flechas después de logout
router.afterEach((to) => {
  if (to.path === '/login') {
    window.history.replaceState({}, document.title, window.location.href)
  }
})

export default router
