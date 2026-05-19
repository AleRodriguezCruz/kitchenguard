<template>
  
    <nav :class="['navbar', dark ? 'navbar-dark' : 'navbar-blue']">
    <!-- LOGO -->
    <div class="nav-brand">
      <router-link to="/dashboard" class="brand-logo-link">
        <svg width="160" height="42" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F97316"/>
              <stop offset="100%" stop-color="#EA580C"/>
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
          <circle cx="30" cy="30" r="20" fill="none" stroke="url(#logoGradNav)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="15s" repeatCount="indefinite"/>
          </circle>
          <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#logoGradNav)"/>
          <ellipse cx="24" cy="20" rx="3" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-20, 24, 20)"/>
          <path d="M30 15 C33 8 38 5 42 8 C38 10 34 12 30 15Z" fill="#166534"/>
          <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1" font-family="'Segoe UI', Arial, sans-serif">KITCHEN</text>
          <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5" font-family="'Segoe UI', Arial, sans-serif">GUARD</text>
          <line x1="64" y1="14" x2="64" y2="50" stroke="#323B4E" stroke-width="1"/>
          <circle cx="228" cy="30" r="4" fill="#10B981" opacity="0.9"/>
        </svg>
      </router-link>
    </div>

    <!-- LINKS -->
    <div class="nav-center">
      <router-link to="/dashboard" class="nav-item" active-class="nav-active">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Inicio</span>
      </router-link>
      <router-link to="/timers" class="nav-item" active-class="nav-active">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>Timers</span>
      </router-link>
      <router-link to="/historial" class="nav-item" active-class="nav-active">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 8 12"/>
        </svg>
        <span>Historial</span>
      </router-link>
      <router-link to="/graficas" class="nav-item" active-class="nav-active">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        <span>Gráficas</span>
      </router-link>
    </div>

    <!-- DERECHA -->
    <div class="nav-right">
      <div class="config-menu" ref="configMenuRef">
        <button @click="menuAbierto = !menuAbierto" class="config-btn" :class="{ active: menuAbierto }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>

        <div v-if="menuAbierto" class="config-dropdown">
          <div class="dropdown-header">
            <span :class="['status-dot', connected ? 'online' : 'offline']"></span>
            <span class="dropdown-status">{{ connected ? 'Online' : 'Offline' }}</span>
          </div>
          <div class="dropdown-divider"></div>
          <router-link to="/setup" class="dropdown-item" @click="menuAbierto = false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
              <line x1="12" y1="20" x2="12.01" y2="20"/>
            </svg>
            Configurar WiFi
          </router-link>
          <button @click="handleLogout" class="dropdown-item dropdown-logout">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Salir
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const props = defineProps({
  connected: { type: Boolean, default: false },
  dark: { type: Boolean, default: false }
})

const router = useRouter()
const { logout } = useAuth()

const menuAbierto  = ref(false)
const configMenuRef = ref(null)

const cerrarMenuFuera = (e) => {
  if (configMenuRef.value && !configMenuRef.value.contains(e.target)) {
    menuAbierto.value = false
  }
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onMounted(() => document.addEventListener('click', cerrarMenuFuera))
onUnmounted(() => document.removeEventListener('click', cerrarMenuFuera))
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 72px;
  background: rgba(26,26,26,0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand { display: flex; align-items: center; }
.brand-logo-link { text-decoration: none; display: flex; align-items: center; transition: opacity 0.2s; }
.brand-logo-link:hover { opacity: 0.8; }

.nav-center { display: flex; gap: 8px; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 12px;
  color: #999;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}
.nav-item:hover { color: #fff; background: rgba(255,255,255,0.05); }
.nav-active { color: #F97316 !important; background: rgba(249,115,22,0.1); }

.nav-right { display: flex; align-items: center; gap: 16px; }

.config-menu { position: relative; }

.config-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;
}
.config-btn:hover, .config-btn.active {
  color: #F97316;
  border-color: rgba(249,115,22,0.3);
  background: rgba(249,115,22,0.08);
}

.config-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 14px;
  padding: 8px;
  min-width: 180px;
  z-index: 200;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
}

.dropdown-status { font-size: 12px; color: #475569; }

.status-dot { width: 8px; height: 8px; border-radius: 50%; }
.status-dot.online { background: #30D158; box-shadow: 0 0 8px rgba(48,209,88,0.5); }
.status-dot.offline { background: #FF3B30; box-shadow: 0 0 8px rgba(255,59,48,0.5); }

.dropdown-divider { height: 1px; background: #262D3D; margin: 4px 0; }

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 13px;
  color: #94A3B8;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
}
.dropdown-item:hover { background: rgba(255,255,255,0.05); color: #F8FAFC; }
.dropdown-logout:hover { background: rgba(239,68,68,0.08); color: #EF4444; }

.navbar-dark {
  background: rgba(26, 26, 26, 0.95);
}

.navbar-blue {
  background: rgba(10, 13, 20, 0.95);
}

@media (max-width: 768px) { .nav-center { display: none; } }
</style>