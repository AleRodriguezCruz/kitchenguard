<template>
  <div class="dashboard">
    <nav class="navbar">
      <div class="nav-brand">
        <span>🍎</span>
        <span class="brand-name">KitchenGuard</span>
      </div>
      <div class="nav-status">
        <span :class="['dot', connected ? 'online' : 'offline']"></span>
        <span>{{ connected ? 'Online' : 'Offline' }}</span>
      </div>
      <div class="nav-links">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/timers">Timers</router-link>
        <router-link to="/historial">Historial</router-link>
        <button @click="handleLogout">Cerrar sesión</button>
      </div>
    </nav>

    <main class="main">
      <div v-if="status.stove_on" class="alert-banner">
        🔥 ALERTA — Fuga de gas detectada
        <button @click="descartarAlerta">Descartar</button>
      </div>

      <div class="cards">
        <div :class="['card', 'big-card', status.stove_on ? 'danger' : '']">
          <span class="card-icon">{{ status.stove_on ? '🔥' : '🏠' }}</span>
          <div>
            <p class="card-label">Cocina</p>
            <p :class="['card-value', status.stove_on ? 'red' : 'green']">
              {{ status.stove_on ? 'FUEGO ON' : 'SEGURA' }}
            </p>
          </div>
        </div>

        <div class="card mini-card">
          <p class="card-label">Gas</p>
          <p class="card-value">{{ status.gas_level }}%</p>
        </div>
        <div class="card mini-card">
          <p class="card-label">Temperatura</p>
          <p class="card-value">{{ status.temperature }}°C</p>
        </div>
        <div class="card mini-card">
          <p class="card-label">Humedad</p>
          <p class="card-value">{{ status.humidity }}%</p>
        </div>
        <div :class="['card', 'mini-card', status.panic ? 'danger' : '']">
          <p class="card-label">Pánico</p>
          <p :class="['card-value', status.panic ? 'red' : 'green']">
            {{ status.panic ? 'ACTIVO' : 'Normal' }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router   = useRouter()
const { logout } = useAuth()

const API_BASE  = import.meta.env.VITE_API_BASE
const connected = ref(false)
const status    = ref({
  stove_on: false, gas_level: 0, temperature: 22, humidity: 55, panic: false
})

let interval = null

const fetchStatus = async () => {
  try {
    const res  = await fetch(`${API_BASE}/status`)
    const data = await res.json()
    status.value    = data
    connected.value = true
  } catch {
    connected.value = false
  }
}

const descartarAlerta = async () => {
  await fetch(`${API_BASE}/api/sensor`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ type: 'gas', value: 0, alert: 0 })
  })
  status.value.stove_on  = false
  status.value.gas_level = 0
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onMounted(() => {
  fetchStatus()
  interval = setInterval(fetchStatus, 3000)
})

onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
.dashboard { min-height: 100vh; background: #0D0D0D; color: #F5F5F5; }
.navbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px; background: #1A1A1A;
  border-bottom: 1px solid #2A2A2A;
}
.nav-brand { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: bold; }
.brand-name { color: #F5F5F5; }
.nav-status { display: flex; align-items: center; gap: 6px; font-size: 12px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.online  { background: #30D158; }
.dot.offline { background: #FF3B30; }
.nav-links { display: flex; align-items: center; gap: 16px; }
.nav-links a { color: #888; text-decoration: none; font-size: 14px; }
.nav-links a.router-link-active { color: #E63946; font-weight: bold; }
.nav-links button {
  background: none; border: 1px solid #2A2A2A;
  color: #888; padding: 6px 12px; border-radius: 8px;
  cursor: pointer; font-size: 13px;
}
.main { padding: 24px; }
.alert-banner {
  background: #330000; border: 1px solid #FF3B30;
  border-radius: 12px; padding: 16px 20px;
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 20px; color: #FF3B30; font-weight: bold;
}
.alert-banner button {
  background: #FF3B30; color: white; border: none;
  padding: 6px 14px; border-radius: 8px; cursor: pointer;
}
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
.card {
  background: #1A1A1A; border: 1px solid #2A2A2A;
  border-radius: 16px; padding: 20px;
}
.big-card { display: flex; align-items: center; gap: 16px; grid-column: span 2; }
.big-card.danger { border-color: #FF3B30; }
.mini-card.danger { border-color: #FF3B30; }
.card-icon { font-size: 32px; }
.card-label { color: #888; font-size: 12px; margin: 0 0 6px; }
.card-value { font-size: 20px; font-weight: bold; margin: 0; color: #F5F5F5; }
.card-value.green { color: #30D158; }
.card-value.red   { color: #FF3B30; }
</style>