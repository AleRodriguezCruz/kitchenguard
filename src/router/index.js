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
    meta: { requiresAuth: false, requiresGuest: true }
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

// 🔒 GUARD DE NAVEGACIÓN - SEGURIDAD CRÍTICA
router.beforeEach(async (to, from, next) => {
  // Obtener sesión actual
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session
  
  // 🔴 1. Si la ruta requiere autenticación y NO hay sesión → redirect a login
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('🔒 Ruta protegida sin sesión, redirigiendo a login')
    return next('/login')
  }
  
  // 🟢 2. Si la ruta es para invitados (login/reset) y SÍ hay sesión → redirect a dashboard
  if (to.meta.requiresGuest && isAuthenticated) {
    console.log('⚠️ Usuario autenticado intentando acceder a login/reset, redirigiendo a dashboard')
    return next('/dashboard')
  }
  
  // 🟡 3. Para rutas de reset-password con token, permitir acceso aunque haya sesión
  if (to.path === '/reset-password' && to.query.token) {
    console.log('🔐 Modo recuperación de contraseña detectado')
    return next()
  }
  
  // ✅ 4. Todo correcto, continuar
  next()
})

// Prevenir que el usuario use las flechas del navegador después de logout
router.afterEach((to, from) => {
  // Reemplazar el historial en rutas sensibles
  if (to.path === '/login' && from.path !== '/login') {
    // Esto evita que se pueda volver atrás después de logout
    window.history.replaceState({}, document.title, window.location.href)
  }
})

export default router
