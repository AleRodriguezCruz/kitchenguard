// src/main.js (agrega esto)
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 🔒 PREVENIR NAVEGACIÓN CON FLECHAS DESPUÉS DE LOGOUT
window.addEventListener('popstate', (event) => {
  // Verificar si el usuario está en login y viene de dashboard
  if (window.location.pathname === '/login') {
    // Forzar que no pueda volver atrás
    window.history.pushState(null, '', '/login')
  }
})

app.use(router)
app.mount('#app')
