<template>
  <div class="dashboard">
    <nav class="navbar">
      <div class="nav-brand">
        <span>🍎</span>
        <span class="brand-name">KitchenGuard</span>
      </div>
      <div class="nav-links">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/timers">Timers</router-link>
        <router-link to="/historial">Historial</router-link>
        <button @click="handleLogout">Cerrar sesión</button>
      </div>
    </nav>

    <main class="main">
      <h2>Temporizadores</h2>

      <div class="add-form">
        <input v-model="label" placeholder="Nombre (ej. Arroz)" />
        <input v-model="minutos" type="number" placeholder="Minutos" />
        <button @click="crearTimer">+ Agregar</button>
      </div>

      <div v-if="timers.length === 0" class="empty">
        No hay temporizadores activos
      </div>

      <div class="timers-grid">
        <div
          v-for="t in timers"
          :key="t.id"
          :class="['timer-card', t.rem === 0 ? 'done' : '']"
        >
          <p class="timer-name">{{ t.label }}</p>
          <p class="timer-count">
            {{ Math.floor(t.rem / 60) }}:{{ String(t.rem % 60).padStart(2, '0') }}
          </p>
          <p class="timer-dur">{{ t.duration / 60 }} min originales</p>
          <button @click="eliminarTimer(t.id)" class="btn-del">
            {{ t.rem === 0 ? 'Listo — Eliminar' : 'Cancelar' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router     = useRouter()
const { logout } = useAuth()
const API_BASE   = import.meta.env.VITE_API_BASE

const label   = ref('')
const minutos = ref('')
const timers  = ref([])

const fetchTimers = async () => {
  try {
    const res  = await fetch(`${API_BASE}/api/timers`)
    const data = await res.json()
    timers.value = data.map(t => ({
      ...t,
      rem: t.duration
    }))
  } catch { }
}

const crearTimer = async () => {
  if (!label.value || !minutos.value) return
  await fetch(`${API_BASE}/api/timers`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      label:    label.value,
      duration: parseInt(minutos.value) * 60
    })
  })
  label.value   = ''
  minutos.value = ''
  fetchTimers()
}

const eliminarTimer = async (id) => {
  await fetch(`${API_BASE}/api/timers/${id}`, { method: 'DELETE' })
  timers.value = timers.value.filter(t => t.id !== id)
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

let interval = null

onMounted(() => {
  fetchTimers()
  interval = setInterval(() => {
    timers.value = timers.value.map(t => ({
      ...t,
      rem: Math.max(0, t.rem - 1)
    }))
  }, 1000)
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
.nav-links { display: flex; align-items: center; gap: 16px; }
.nav-links a { color: #888; text-decoration: none; font-size: 14px; }
.nav-links a.router-link-active { color: #E63946; font-weight: bold; }
.nav-links button {
  background: none; border: 1px solid #2A2A2A;
  color: #888; padding: 6px 12px; border-radius: 8px; cursor: pointer;
}
.main { padding: 24px; }
h2 { margin-bottom: 20px; font-size: 22px; }
.add-form {
  display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;
}
.add-form input {
  background: #1A1A1A; border: 1px solid #2A2A2A;
  border-radius: 10px; padding: 10px 14px;
  color: #F5F5F5; font-size: 14px; flex: 1;
}
.add-form button {
  background: #E63946; color: white; border: none;
  border-radius: 10px; padding: 10px 20px;
  font-weight: bold; cursor: pointer;
}
.empty { color: #888; text-align: center; padding: 40px; }
.timers-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;
}
.timer-card {
  background: #1A1A1A; border: 2px solid #2A2A2A;
  border-radius: 16px; padding: 20px; text-align: center;
}
.timer-card.done { border-color: #30D158; }
.timer-name { font-weight: bold; margin: 0 0 8px; }
.timer-count { font-size: 36px; font-weight: bold; color: #E63946; margin: 0 0 4px; }
.timer-card.done .timer-count { color: #30D158; }
.timer-dur { color: #888; font-size: 12px; margin: 0 0 12px; }
.btn-del {
  background: #2A2A2A; color: #F5F5F5; border: none;
  border-radius: 8px; padding: 8px 16px; cursor: pointer; font-size: 13px;
}
.timer-card.done .btn-del { background: #30D158; color: #0D0D0D; font-weight: bold; }
</style>