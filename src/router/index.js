import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabaseClient'
import LoginView         from '../views/LoginView.vue'
import DashboardView     from '../views/DashboardView.vue'
import TimersView        from '../views/TimersView.vue'
import HistorialView     from '../views/HistorialView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import GraficaView from '../views/GraficaView.vue'
import SetupView from '../views/SetupView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView,
    meta: { requiresAuth: false }
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
  },
  {
  path: '/graficas',
  name: 'graficas',
  component: GraficaView,
  meta: { requiresAuth: true }
},
{
  path: '/setup',
  name: 'setup',
  component: SetupView,
  meta: { requiresAuth: true }
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const isAuthenticated = !!data.session

  // Reset-password: solo si hay sesión activa (token del correo la crea)
  if (to.name === 'reset-password') {
    return next()  // siempre permitir, ResetPasswordView verifica el token
  }

  // Ruta protegida sin sesión → login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' })
  }

  // Ya autenticado intenta ir a login → dashboard
  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router
