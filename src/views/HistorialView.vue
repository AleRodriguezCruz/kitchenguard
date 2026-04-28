<template>
  <div class="dashboard">
    <!-- Navbar Profesional -->
    <nav class="navbar">
      <!-- LOGO -->
      <div class="nav-brand">
        <router-link to="/dashboard" class="brand-logo-link">
          <svg width="160" height="42" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradHist" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F97316"/>
                <stop offset="100%" stop-color="#EA580C"/>
              </linearGradient>
            </defs>
            <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
            <circle cx="30" cy="30" r="20" fill="none" stroke="url(#logoGradHist)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6">
              <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="15s" repeatCount="indefinite"/>
            </circle>
            <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#logoGradHist)"/>
            <ellipse cx="24" cy="20" rx="3" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-20, 24, 20)"/>
            <path d="M30 15 C33 8 38 5 42 8 C38 10 34 12 30 15Z" fill="#166534"/>
            <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1" font-family="'Segoe UI', Arial, sans-serif">KITCHEN</text>
            <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5" font-family="'Segoe UI', Arial, sans-serif">GUARD</text>
            <line x1="64" y1="14" x2="64" y2="50" stroke="#323B4E" stroke-width="1"/>
            <circle cx="228" cy="30" r="4" fill="#10B981" opacity="0.9"/>
          </svg>
        </router-link>
      </div>
      
      <!-- LINKS DE NAVEGACION -->
      <div class="nav-center">
        <router-link to="/dashboard" class="nav-item">Inicio</router-link>
        <router-link to="/timers" class="nav-item">Timers</router-link>
        <router-link to="/historial" class="nav-item nav-active">Historial</router-link>
      </div>

      <!-- SALIR -->
      <div class="nav-right">
        <button @click="handleLogout" class="logout-btn">Salir</button>
      </div>
    </nav>

    <!-- Contenido Principal -->
    <main class="main-content">
      <!-- Header -->
      <div class="page-header">
        <div class="page-title-group">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <h2>Historial de Eventos</h2>
        </div>
        <div class="header-stats">
          <div class="header-stat">
            <span class="header-stat-value">{{ sensores.length }}</span>
            <span class="header-stat-label">Sensores</span>
          </div>
          <div class="header-stat">
            <span class="header-stat-value">{{ panicos.length }}</span>
            <span class="header-stat-label">Pánico</span>
          </div>
          <div class="header-stat">
            <span class="header-stat-value">{{ eventosFiltrados.length }}</span>
            <span class="header-stat-label">Total</span>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button :class="['tab', tab === 'sensores' ? 'active' : '']" @click="tab = 'sensores'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83"/>
          </svg>
          Sensores
        </button>
        <button :class="['tab', tab === 'panico' ? 'active' : '']" @click="tab = 'panico'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Pánico
        </button>
        <button :class="['tab', tab === 'todos' ? 'active' : '']" @click="tab = 'todos'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
          </svg>
          Todos
        </button>
      </div>

      <!-- Tabla de Sensores -->
      <div v-if="tab === 'sensores' || tab === 'todos'" class="table-container">
        <div class="table-header">
          <h3>Registros de Sensores</h3>
          <span class="table-count">{{ sensores.length }} registros</span>
        </div>
        
        <div v-if="sensores.length === 0" class="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="1.5">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
          </svg>
          <p>Sin registros de sensores</p>
        </div>
        
        <table v-else class="events-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Alerta</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in sensores" :key="s.id" :class="s.alert ? 'row-alert' : ''">
              <td class="cell-id">#{{ s.id }}</td>
              <td>
                <span :class="['type-badge', getTypeClass(s.type)]">{{ s.type }}</span>
              </td>
              <td class="cell-value">{{ s.value }}</td>
              <td>
                <span :class="['status-badge', s.alert ? 'alert' : 'normal']">
                  {{ s.alert ? '🔥 Alerta' : '✓ Normal' }}
                </span>
              </td>
              <td class="cell-date">{{ formatDate(s.timestamp) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Tabla de Pánico -->
      <div v-if="tab === 'panico' || tab === 'todos'" class="table-container" style="margin-top: 20px;">
        <div class="table-header">
          <h3>Registros de Pánico</h3>
          <span class="table-count">{{ panicos.length }} registros</span>
        </div>
        
        <div v-if="panicos.length === 0" class="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p>Sin registros de pánico</p>
          <span class="empty-sub">No se han activado alertas de emergencia</span>
        </div>
        
        <table v-else class="events-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in panicos" :key="p.id" class="row-panic">
              <td class="cell-id">#{{ p.id }}</td>
              <td>
                <span class="status-badge panic">🆘 Pánico Activado</span>
              </td>
              <td class="cell-date">{{ formatDate(p.timestamp) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Botón refrescar -->
      <div class="refresh-section">
        <button @click="fetchData" class="refresh-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Actualizar Datos
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { logout } = useAuth()
const API_BASE = import.meta.env.VITE_API_BASE

const tab = ref('sensores')
const sensores = ref([])
const panicos = ref([])

const eventosFiltrados = computed(() => {
  if (tab.value === 'sensores') return sensores.value
  if (tab.value === 'panico') return panicos.value
  return [...sensores.value, ...panicos.value]
})

const getTypeClass = (type) => {
  const types = {
    gas: 'gas',
    temperatura: 'temp',
    humedad: 'humidity',
    fuego: 'fire',
    movimiento: 'motion',
  }
  return types[type?.toLowerCase()] || 'default'
}

const formatDate = (timestamp) => {
  if (!timestamp) return '—'
  try {
    const date = new Date(timestamp)
    return date.toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  } catch {
    return timestamp
  }
}

const fetchData = async () => {
  try {
    const [s, p] = await Promise.all([
      fetch(`${API_BASE}/api/sensor`).then(r => r.json()),
      fetch(`${API_BASE}/api/panic`).then(r => r.json())
    ])
    sensores.value = Array.isArray(s) ? s : []
    panicos.value = Array.isArray(p) ? p : []
  } catch {
    // Mantener datos anteriores en caso de error
  }
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onMounted(fetchData)
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.dashboard {
  min-height: 100vh;
  background: #0A0D14;
  color: #F8FAFC;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #262D3D;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand { display: flex; align-items: center; }

.brand-logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.brand-logo-link:hover { opacity: 0.8; }

.nav-center {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-item {
  padding: 8px 16px;
  border-radius: 10px;
  color: #94A3B8;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-item:hover { color: #F8FAFC; background: rgba(255,255,255,0.04); }
.nav-active { color: #F97316 !important; background: rgba(249,115,22,0.1); }

.nav-right { display: flex; align-items: center; gap: 10px; }

.logout-btn {
  padding: 8px 16px;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 10px;
  color: #EF4444;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover { background: rgba(239,68,68,0.15); }

/* Main */
.main-content {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-title-group h2 {
  font-size: 22px;
  font-weight: 800;
}

.header-stats {
  display: flex;
  gap: 16px;
}

.header-stat {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 12px;
  padding: 10px 16px;
  text-align: center;
  min-width: 70px;
}

.header-stat-value {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: #F97316;
}

.header-stat-label {
  display: block;
  font-size: 10px;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 24px;
  background: #111827;
  border-radius: 12px;
  padding: 4px;
  width: fit-content;
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: #475569;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tab:hover { color: #94A3B8; }

.tab.active {
  background: #F97316;
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(249,115,22,0.3);
}

/* Table Container */
.table-container {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-header h3 {
  font-size: 15px;
  font-weight: 700;
}

.table-count {
  font-size: 11px;
  color: #475569;
  background: #111827;
  padding: 4px 10px;
  border-radius: 8px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px;
  color: #475569;
}

.empty-state p {
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  color: #94A3B8;
}

.empty-sub {
  font-size: 12px;
  color: #475569;
  margin-top: 4px;
  display: block;
}

/* Table */
.events-table {
  width: 100%;
  border-collapse: collapse;
}

.events-table th {
  text-align: left;
  padding: 12px 14px;
  font-size: 11px;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  border-bottom: 1px solid #262D3D;
  font-weight: 600;
}

.events-table td {
  padding: 12px 14px;
  font-size: 13px;
  border-bottom: 1px solid #1E2435;
  color: #94A3B8;
}

.events-table tr:last-child td {
  border-bottom: none;
}

.events-table tr:hover td {
  background: rgba(255,255,255,0.02);
}

.row-alert {
  background: rgba(239,68,68,0.05);
}

.row-alert:hover td {
  background: rgba(239,68,68,0.08) !important;
}

.row-panic {
  background: rgba(249,115,22,0.05);
}

.cell-id {
  color: #475569;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.cell-value {
  font-weight: 600;
  color: #F8FAFC;
}

.cell-date {
  font-size: 12px;
  color: #475569;
  white-space: nowrap;
}

/* Badges */
.type-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.type-badge.gas { background: rgba(245,158,11,0.15); color: #F59E0B; }
.type-badge.temp { background: rgba(249,115,22,0.15); color: #F97316; }
.type-badge.humidity { background: rgba(99,102,241,0.15); color: #6366F1; }
.type-badge.fire { background: rgba(239,68,68,0.15); color: #EF4444; }
.type-badge.motion { background: rgba(16,185,129,0.15); color: #10B981; }
.type-badge.default { background: rgba(71,85,105,0.15); color: #94A3B8; }

.status-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.status-badge.normal { background: rgba(16,185,129,0.15); color: #10B981; }
.status-badge.alert { background: rgba(239,68,68,0.15); color: #EF4444; }
.status-badge.panic { background: rgba(249,115,22,0.15); color: #F97316; }

/* Refresh */
.refresh-section {
  text-align: center;
  margin-top: 10px;
}

.refresh-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 12px;
  color: #94A3B8;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover {
  color: #F8FAFC;
  border-color: #323B4E;
  background: #1E2435;
}

/* Responsive */
@media (max-width: 768px) {
  .main-content { padding: 16px; }
  .nav-center { display: none; }
  .page-header { flex-direction: column; align-items: flex-start; }
  .events-table { font-size: 11px; }
  .events-table th, .events-table td { padding: 8px 10px; }
}
</style>