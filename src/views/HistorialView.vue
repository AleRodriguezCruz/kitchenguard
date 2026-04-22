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
      <h2>Historial de Eventos</h2>

      <div class="tabs">
        <button :class="['tab', tab === 'sensores' ? 'active' : '']" @click="tab = 'sensores'">Sensores</button>
        <button :class="['tab', tab === 'panico' ? 'active' : '']" @click="tab = 'panico'">Pánico</button>
      </div>

      <div v-if="tab === 'sensores'">
        <div v-if="sensores.length === 0" class="empty">Sin registros</div>
        <table v-else class="tabla">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Alerta</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in sensores" :key="s.id" :class="s.alert ? 'alerta' : ''">
              <td>{{ s.type }}</td>
              <td>{{ s.value }}</td>
              <td>{{ s.alert ? '🔥 Sí' : 'No' }}</td>
              <td>{{ s.timestamp }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="tab === 'panico'">
        <div v-if="panicos.length === 0" class="empty">Sin registros de pánico</div>
        <table v-else class="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in panicos" :key="p.id">
              <td>{{ p.id }}</td>
              <td>{{ p.timestamp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router     = useRouter()
const { logout } = useAuth()
const API_BASE   = import.meta.env.VITE_API_BASE

const tab     = ref('sensores')
const sensores = ref([])
const panicos  = ref([])

const fetchData = async () => {
  try {
    const [s, p] = await Promise.all([
      fetch(`${API_BASE}/api/sensor`).then(r => r.json()),
      fetch(`${API_BASE}/api/panic`).then(r => r.json())
    ])
    sensores.value = s
    panicos.value  = p
  } catch { }
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onMounted(fetchData)
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
.tabs { display: flex; gap: 8px; margin-bottom: 20px; }
.tab {
  background: #1A1A1A; border: 1px solid #2A2A2A;
  color: #888; padding: 8px 20px; border-radius: 8px; cursor: pointer;
}
.tab.active { background: #E63946; color: white; border-color: #E63946; }
.empty { color: #888; text-align: center; padding: 40px; }
.tabla { width: 100%; border-collapse: collapse; }
.tabla th {
  text-align: left; padding: 10px 14px;
  background: #1A1A1A; color: #888; font-size: 12px;
  border-bottom: 1px solid #2A2A2A;
}
.tabla td {
  padding: 10px 14px; font-size: 13px;
  border-bottom: 1px solid #2A2A2A;
}
.tabla tr.alerta td { color: #FF3B30; }
</style>