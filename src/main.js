import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 🔒 BLOQUEO DINÁMICO DE NAVEGACIÓN HACIA ATRÁS
window.addEventListener('popstate', () => {
  const path = window.location.pathname
  const isAuthenticated = localStorage.getItem('auth_token') === 'true'

  // Caso 1: Si el usuario intenta volver al Reset Password o Login estando ya autenticado
  if (isAuthenticated && (path === '/reset-password' || path === '/login')) {
    window.history.pushState(null, '', '/dashboard')
    router.replace('/dashboard')
  }

  // Caso 2: Si el usuario cerró sesión y quiere volver al Dashboard con las flechas
  if (!isAuthenticated && path === '/dashboard') {
    window.history.pushState(null, '', '/login')
    router.replace('/login')
  }
})

app.use(router)
app.mount('#app')
