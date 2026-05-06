<template>
  <div class="dashboard">
    <!-- ==================== NAVBAR ==================== -->
    <nav class="navbar">
      <!-- Logo de KitchenGuard -->
      <div class="nav-brand">
        <router-link to="/dashboard" class="brand-logo-link">
          <svg width="160" height="42" viewBox="0 0 240 60" fill="none">
            <defs>
              <linearGradient id="logoGradWeb" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F97316"/><stop offset="100%" stop-color="#EA580C"/>
              </linearGradient>
            </defs>
            <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
            <circle cx="30" cy="30" r="20" fill="none" stroke="url(#logoGradWeb)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6">
              <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="15s" repeatCount="indefinite"/>
            </circle>
            <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#logoGradWeb)"/>
            <ellipse cx="24" cy="20" rx="3" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-20, 24, 20)"/>
            <path d="M30 15 C33 8 38 5 42 8 C38 10 34 12 30 15Z" fill="#166534"/>
            <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1">KITCHEN</text>
            <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5">GUARD</text>
            <line x1="64" y1="14" x2="64" y2="50" stroke="#323B4E" stroke-width="1"/>
            <circle cx="228" cy="30" r="4" fill="#10B981" opacity="0.9"/>
          </svg>
        </router-link>
      </div>
      
      <!-- Links de navegación -->
      <div class="nav-center">
        <router-link to="/dashboard" class="nav-item nav-active">Inicio</router-link>
        <router-link to="/timers" class="nav-item">Timers</router-link>
        <router-link to="/historial" class="nav-item">Historial</router-link>
      </div>

      <!-- Estado de conexión + Cerrar sesión -->
      <div class="nav-right">
        <div class="status-indicator">
          <span :class="['status-dot', connected ? 'online' : 'offline']"></span>
          <span class="status-text">{{ connected ? 'Online' : 'Offline' }}</span>
        </div>
        <button @click="handleLogout" class="logout-btn">Salir</button>
      </div>
    </nav>

    <!-- ==================== CONTENIDO PRINCIPAL ==================== -->
    <main class="main-content">
      
      <!-- Alerta de emergencia (aparece cuando stove_on = true) -->
      <Transition name="alert-slide">
        <div v-if="status.stove_on" class="alert-banner">
          <div class="alert-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div class="alert-text">
            <h3>Alerta de Seguridad</h3>
            <p>Se ha detectado fuego o fuga de gas en la cocina</p>
          </div>
          <button @click="descartarAlerta" class="alert-dismiss">Descartar</button>
        </div>
      </Transition>

      <!-- Grid principal del dashboard -->
      <div class="dashboard-grid">
        
        <!-- Hero Card: Estado general + Medidor de gas -->
        <div :class="['hero-card', status.stove_on ? 'hero-danger' : 'hero-safe']">
          <div class="hero-content">
            <div class="hero-left">
              <div class="hero-icon">{{ status.stove_on ? '🔥' : '✅' }}</div>
              <div class="hero-info">
                <span class="hero-label">Estado de la Cocina</span>
                <span :class="['hero-value', status.stove_on ? 'text-danger' : 'text-safe']">
                  {{ status.stove_on ? 'Fuego Detectado' : 'Segura' }}
                </span>
              </div>
            </div>
            <!-- Medidor circular de gas -->
            <div class="gas-gauge">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#262D3D" stroke-width="8"/>
                <circle cx="50" cy="50" r="42" fill="none" :stroke="gasGaugeColor" stroke-width="8"
                  :stroke-dasharray="2 * Math.PI * 42"
                  :stroke-dashoffset="2 * Math.PI * 42 * (1 - status.gas_level / 100)"
                  stroke-linecap="round" transform="rotate(-90 50 50)"/>
                <text x="50" y="48" text-anchor="middle" fill="white" font-size="18" font-weight="700">{{ Math.round(status.gas_level) }}%</text>
                <text x="50" y="65" text-anchor="middle" fill="#475569" font-size="10">NIVEL GAS</text>
              </svg>
            </div>
          </div>
        </div>

        <!-- Tarjetas de estadísticas (Gas, Temp, Humedad) -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon" style="background:rgba(245,158,11,0.1)">💨</div>
            <span class="stat-value">{{ Math.round(status.gas_level) }}<small>%</small></span>
            <span class="stat-label">Gas</span>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:rgba(249,115,22,0.1)">🌡️</div>
            <span class="stat-value">{{ status.temperature }}<small>°C</small></span>
            <span class="stat-label">Temp.</span>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background:rgba(99,102,241,0.1)">💧</div>
            <span class="stat-value">{{ status.humidity }}<small>%</small></span>
            <span class="stat-label">Humedad</span>
          </div>
        </div>

        <!-- Info climática de Ensenada (NUEVO) -->
        <div class="climate-info">
          <div class="climate-header">
            <span>🌊 Ensenada, B.C. · Temp. ref: {{ getEnsenadaReferenceTemp() + getHourAdjustment() }}°C</span>
            <span class="climate-month">{{ ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][new Date().getMonth()] }}</span>
          </div>
          <div class="climate-detail">
            <span>🕐 Ajuste horario: {{ getHourAdjustment() > 0 ? '+' : '' }}{{ getHourAdjustment() }}°C</span>
            <span>💧 Humedad ref: 75% (costa)</span>
            <span>📊 4 fuentes climáticas</span>
          </div>
        </div>

        <!-- Paneles laterales: Análisis de riesgo + Historial -->
        <div class="side-panels">
          <!-- Análisis de Riesgo Predictivo -->
          <div class="risk-panel">
            <div class="panel-header"><h3>🔍 Análisis de Riesgo</h3></div>
            <div v-for="(r, i) in riesgos" :key="i" class="risk-item">
              <div class="risk-top">
                <span class="risk-name">{{ r.label }}</span>
                <span class="risk-badge" :style="{color:r.color}">{{ r.text }}</span>
              </div>
              <div class="risk-bar">
                <div class="risk-bar-fill" :style="{width:r.pct+'%',background:r.color}"></div>
              </div>
              <span class="risk-pct">{{ r.pct }}% · {{ r.detail }}</span>
            </div>
          </div>

          <!-- Historial de eventos -->
          <div class="history-panel">
            <div class="panel-header"><h3>📋 Historial</h3></div>
            <div v-if="events.length===0" class="history-empty">Sin eventos registrados</div>
            <div v-for="(e,i) in events.slice(0,6)" :key="i" class="history-item">
              <div class="history-line" :style="{background:e.type==='danger'?'#EF4444':e.type==='warning'?'#F59E0B':'#10B981'}"></div>
              <div class="history-content">
                <span class="history-title">{{ e.title }}</span>
                <span class="history-time">{{ e.time }}</span>
              </div>
              <span class="history-value">{{ e.value }}</span>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  </div>
</template>

<script setup>
/*
  ============================================================
  KitchenGuard Dashboard - Algoritmo Predictivo
  Calibrado para Ensenada, Baja California, México
  ============================================================
  Fuentes climáticas (promedio de 4):
  1. SMN-CONAGUA (smn.conagua.gob.mx)
  2. CICESE (usuario.cicese.mx/~clima/)
  3. Weather Spark (es.weatherspark.com)
  4. Climate-Data.org (es.climate-data.org)
  ============================================================
*/

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

// ─── Configuración inicial ───────────────────────────────────
const router = useRouter()
const { logout } = useAuth()
const API_BASE = import.meta.env.VITE_API_BASE

// ─── Estado reactivo ─────────────────────────────────────────
const connected = ref(false)  // ¿Conectado al servidor?
const status = ref({          // Datos de sensores
  stove_on: false,
  gas_level: 0,
  temperature: 22,
  humidity: 55,
  panic: false
})
const events = ref([])         // Historial de eventos
const gasChartCanvas = ref(null)
const gasHistory = ref([])

// ─── Variables de control ────────────────────────────────────
let chartInterval = null
let statusInterval = null

/*
  ============================================================
  DATOS CLIMÁTICOS DE ENSENADA, B.C.
  Promedio de 4 fuentes oficiales (1981-2010)
  ============================================================
*/
const ENSENADA_MONTHLY_TEMP = {
  1: 13,   // Enero   | SMN:12.9 CICESE:13.2 WS:13.0 CD:13.1
  2: 14,   // Febrero | SMN:13.8 CICESE:14.1 WS:14.0 CD:13.9
  3: 15,   // Marzo   | SMN:14.7 CICESE:15.0 WS:14.8 CD:14.9
  4: 16,   // Abril   | SMN:16.4 CICESE:16.2 WS:16.5 CD:16.3
  5: 18,   // Mayo    | SMN:18.2 CICESE:18.0 WS:18.3 CD:18.1
  6: 20,   // Junio   | SMN:20.1 CICESE:20.3 WS:20.5 CD:20.2
  7: 22,   // Julio   | SMN:22.3 CICESE:22.5 WS:22.8 CD:22.4
  8: 23,   // Agosto  | SMN:23.1 CICESE:23.4 WS:23.6 CD:23.2
  9: 22,   // Sept    | SMN:21.8 CICESE:22.0 WS:22.2 CD:21.9
  10: 19,  // Octubre | SMN:18.9 CICESE:19.2 WS:19.5 CD:19.0
  11: 16,  // Nov     | SMN:15.6 CICESE:15.8 WS:16.0 CD:15.7
  12: 13   // Dic     | SMN:13.2 CICESE:13.5 WS:13.3 CD:13.4
}

// ─── Funciones de compensación climática ─────────────────────

/** Obtiene la temperatura de referencia según el mes actual */
const getEnsenadaReferenceTemp = () => {
  const month = new Date().getMonth() + 1
  return ENSENADA_MONTHLY_TEMP[month] || 18
}

/** Ajusta la temperatura según la hora del día */
const getHourAdjustment = () => {
  const hour = new Date().getHours()
  if (hour >= 3 && hour <= 7) return -3   // Madrugada: más frío
  if (hour >= 12 && hour <= 16) return +3 // Tarde: más cálido
  return 0
}

// ─── Computed Properties ─────────────────────────────────────

/** Color del medidor de gas según nivel */
const gasGaugeColor = computed(() => {
  const l = status.value.gas_level
  if (l > 70) return '#EF4444'  // Rojo
  if (l > 45) return '#F59E0B'  // Amarillo
  if (l > 20) return '#F97316'  // Naranja
  return '#10B981'              // Verde
})

/*
  ============================================================
  ALGORITMO PREDICTIVO PRINCIPAL
  Calcula el riesgo de 3 amenazas usando compensación climática
  ============================================================
*/
const riesgos = computed(() => {
  const g = status.value.gas_level      // Nivel de gas (0-100%)
  const t = status.value.temperature    // Temperatura actual
  const h = status.value.humidity       // Humedad relativa
  const s = status.value.stove_on       // ¿Estufa encendida?
  
  // Compensación climática para Ensenada
  const refTemp = getEnsenadaReferenceTemp() + getHourAdjustment()
  const deltaTemp = t - refTemp  // Diferencia vs temperatura esperada
  
  // Factor de humedad (Ensenada es zona costera)
  const humidityFactor = h > 85 ? 1.2 : h > 70 ? 1.0 : 0.8

  // ---- 1. Riesgo de Fuga de Gas ----
  let gasPct, gasColor, gasText
  if (g > 70) {
    gasPct = 95; gasColor = '#EF4444'; gasText = '¡Crítico! Evacuar'
  } else if (g > 45) {
    gasPct = 70; gasColor = '#F59E0B'; gasText = 'Alto: Ventilar'
  } else if (g > 20) {
    gasPct = 40; gasColor = '#F97316'; gasText = 'Moderado'
  } else {
    gasPct = Math.max(3, g); gasColor = '#10B981'; gasText = 'Normal'
  }

  // ---- 2. Riesgo de Estufa Abandonada ----
  let stovePct, stoveColor, stoveText
  if (s && deltaTemp > 20) {
    stovePct = 98; stoveColor = '#EF4444'; stoveText = '¡Abandonada!'
  } else if (s && deltaTemp > 10) {
    stovePct = 65; stoveColor = '#F59E0B'; stoveText = 'Uso prolongado'
  } else if (s) {
    stovePct = 35; stoveColor = '#F59E0B'; stoveText = 'En uso'
  } else {
    stovePct = 0; stoveColor = '#10B981'; stoveText = 'Apagada'
  }

  // ---- 3. Riesgo de Sobrecalentamiento (compensado) ----
  let tempPct, tempColor, tempText
  if (deltaTemp > 25) {
    tempPct = 95; tempColor = '#EF4444'; tempText = '¡Incendio!'
  } else if (deltaTemp > 15) {
    tempPct = 75; tempColor = '#F59E0B'; tempText = 'Peligro: Alta'
  } else if (deltaTemp > 8) {
    tempPct = 45; tempColor = '#F97316'; tempText = 'Elevada'
  } else {
    tempPct = Math.round(20 * humidityFactor); tempColor = '#10B981'; tempText = 'Normal'
  }

  return [
    { label: '💨 Fuga de Gas', pct: gasPct, color: gasColor, text: gasText, detail: `${g}% detectado` },
    { label: '🔥 Estufa', pct: stovePct, color: stoveColor, text: stoveText, detail: s ? `Δ${deltaTemp.toFixed(1)}°C` : 'Sin actividad' },
    { label: '🌡️ Temperatura', pct: tempPct, color: tempColor, text: tempText, detail: `${t}°C (ref: ${refTemp}°C, Δ${deltaTemp.toFixed(1)}°C)` }
  ]
})

// ─── API Calls ───────────────────────────────────────────────

/** Obtiene el estado actual del servidor */
const fetchStatus = async () => {
  try {
    const res = await fetch(`${API_BASE}/status`)
    const data = await res.json()
    status.value = data
    connected.value = true
  } catch {
    connected.value = false
  }
}

/** Descarta la alerta de gas activa */
const descartarAlerta = async () => {
  await fetch(`${API_BASE}/api/sensor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'gas', value: 0, alert: 0 })
  })
  status.value.stove_on = false
  status.value.gas_level = 0
}

// ─── Navegación ──────────────────────────────────────────────

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

// ─── Gráfico de gas (Canvas) ─────────────────────────────────

/** Inicializa el gráfico de gas en tiempo real */
const initChart = () => {
  const canvas = gasChartCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)
  
  chartInterval = setInterval(() => {
    gasHistory.value.push(status.value.gas_level)
    if (gasHistory.value.length > 60) gasHistory.value.shift()
    
    ctx.clearRect(0, 0, rect.width, rect.height)
    
    // Dibujar línea del historial
    if (gasHistory.value.length > 1) {
      ctx.strokeStyle = '#F97316'
      ctx.lineWidth = 2
      ctx.beginPath()
      gasHistory.value.forEach((v, i) => {
        const x = 40 + (i / 59) * (rect.width - 80)
        const y = 20 + (rect.height - 60) - (v / 100) * (rect.height - 80)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.stroke()
    }
    
    // Borde del gráfico
    ctx.strokeStyle = '#323B4E'
    ctx.lineWidth = 1
    ctx.strokeRect(40, 20, rect.width - 80, rect.height - 60)
  }, 1000)
}

// ─── Ciclo de vida ───────────────────────────────────────────

onMounted(() => {
  fetchStatus()
  statusInterval = setInterval(fetchStatus, 3000)  // Polling cada 3s
  setTimeout(initChart, 100)
  
  // Datos de ejemplo iniciales
  events.value = [
    { time: new Date().toLocaleTimeString(), type: 'safe', title: 'Sistema iniciado', value: 'OK' }
  ]
})

onUnmounted(() => {
  clearInterval(statusInterval)
  clearInterval(chartInterval)
})
</script>

<style scoped>
/* ============================================================
   KitchenGuard Dashboard - Estilos Profesionales
   ============================================================ */

/* ─── Reset y base ────────────────────────────────────────── */
* { margin: 0; padding: 0; box-sizing: border-box; }
.dashboard {
  min-height: 100vh;
  background: #0A0D14;
  color: #F8FAFC;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* ─── Navbar ───────────────────────────────────────────────── */
.navbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; height: 64px;
  background: rgba(17, 24, 39, 0.95); backdrop-filter: blur(20px);
  border-bottom: 1px solid #262D3D;
  position: sticky; top: 0; z-index: 100;
}
.nav-brand { display: flex; align-items: center; }
.brand-logo-link { text-decoration: none; display: flex; align-items: center; }
.brand-logo-link:hover { opacity: 0.8; }
.nav-center { display: flex; gap: 4px; }
.nav-item {
  padding: 8px 16px; border-radius: 10px;
  color: #94A3B8; text-decoration: none;
  font-size: 13px; font-weight: 500; transition: all 0.2s;
}
.nav-item:hover { color: #F8FAFC; background: rgba(255,255,255,0.04); }
.nav-active { color: #F97316 !important; background: rgba(249,115,22,0.1); }
.nav-right { display: flex; align-items: center; gap: 10px; }
.status-indicator {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; background: #1A1F2E;
  border: 1px solid #262D3D; border-radius: 20px;
}
.status-dot { width: 6px; height: 6px; border-radius: 3px; }
.status-dot.online { background: #10B981; }
.status-dot.offline { background: #EF4444; }
.status-text { font-size: 11px; font-weight: 600; color: #94A3B8; }
.logout-btn {
  padding: 8px 16px; background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.25); border-radius: 10px;
  color: #EF4444; font-size: 13px; cursor: pointer;
}
.logout-btn:hover { background: rgba(239,68,68,0.15); }

/* ─── Contenido principal ──────────────────────────────────── */
.main-content { padding: 24px; max-width: 1400px; margin: 0 auto; }

/* ─── Alerta de emergencia ─────────────────────────────────── */
.alert-banner {
  display: flex; align-items: center; gap: 16px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #2B0D0D, #1A0A0A);
  border: 2px solid rgba(239,68,68,0.4); border-radius: 16px;
  margin-bottom: 24px;
}
.alert-icon-box { color: #EF4444; }
.alert-text h3 { font-size: 15px; color: #EF4444; font-weight: 700; margin-bottom: 4px; }
.alert-text p { font-size: 13px; color: #FCA5A5; }
.alert-dismiss {
  margin-left: auto; padding: 10px 20px;
  background: #EF4444; color: white; border: none;
  border-radius: 10px; font-weight: 600; cursor: pointer;
}
.alert-slide-enter-active { transition: all 0.4s ease; }
.alert-slide-leave-active { transition: all 0.3s ease; }
.alert-slide-enter-from { transform: translateY(-12px); opacity: 0; }
.alert-slide-leave-to { transform: translateY(-8px); opacity: 0; }

/* ─── Grid principal ───────────────────────────────────────── */
.dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

/* ─── Hero Card ────────────────────────────────────────────── */
.hero-card {
  grid-column: 1 / -1;
  background: #1A1F2E; border: 1px solid #262D3D;
  border-radius: 20px; padding: 24px;
}
.hero-danger {
  border-color: rgba(239,68,68,0.5);
  background: linear-gradient(135deg, #1A0A0A, #1A1F2E);
}
.hero-content { display: flex; align-items: center; gap: 20px; }
.hero-left { display: flex; align-items: center; gap: 16px; flex: 1; }
.hero-icon { font-size: 48px; }
.hero-label { font-size: 11px; color: #475569; text-transform: uppercase; letter-spacing: 1px; }
.hero-value { font-size: 22px; font-weight: 800; }
.text-safe { color: #10B981; }
.text-danger { color: #EF4444; }

/* ─── Stats Cards ──────────────────────────────────────────── */
.stats-row {
  grid-column: 1 / -1;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
}
.stat-card {
  background: #1A1F2E; border: 1px solid #262D3D;
  border-radius: 16px; padding: 18px; text-align: center;
}
.stat-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 10px; font-size: 18px;
}
.stat-value { font-size: 22px; font-weight: 700; display: block; }
.stat-value small { font-size: 12px; color: #475569; font-weight: 400; }
.stat-label {
  font-size: 10px; color: #475569;
  text-transform: uppercase; letter-spacing: 0.5px;
  margin-top: 4px; display: block;
}

/* ─── Info Climática Ensenada ──────────────────────────────── */
.climate-info {
  background: linear-gradient(135deg, #0F1729, #1A1F2E);
  border: 1px solid #262D3D; border-radius: 16px;
  padding: 16px 20px; grid-column: 1 / -1;
}
.climate-header {
  display: flex; justify-content: space-between;
  align-items: center; font-weight: 700; font-size: 14px; margin-bottom: 6px;
}
.climate-month { color: #F97316; font-size: 13px; }
.climate-detail { display: flex; gap: 20px; font-size: 11px; color: #475569; }

/* ─── Paneles laterales ────────────────────────────────────── */
.side-panels { display: flex; flex-direction: column; gap: 16px; }
.risk-panel, .history-panel {
  background: #1A1F2E; border: 1px solid #262D3D;
  border-radius: 20px; padding: 20px;
}
.panel-header { display: flex; align-items: center; margin-bottom: 18px; }
.panel-header h3 { font-size: 15px; font-weight: 700; flex: 1; }

/* ─── Análisis de Riesgo ───────────────────────────────────── */
.risk-item { padding: 14px; border-bottom: 1px solid #262D3D; }
.risk-item:last-child { border-bottom: none; }
.risk-top {
  display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 10px;
}
.risk-name { font-size: 13px; font-weight: 600; }
.risk-badge { font-size: 10px; font-weight: 700; }
.risk-bar {
  height: 5px; background: #262D3D;
  border-radius: 3px; margin-bottom: 6px;
}
.risk-bar-fill { height: 5px; border-radius: 3px; transition: width 0.6s; }
.risk-pct { font-size: 11px; color: #475569; display: block; }

/* ─── Historial ─────────────────────────────────────────────── */
.history-empty { text-align: center; padding: 30px; color: #475569; font-size: 13px; }
.history-item {
  display: flex; align-items: center;
  padding: 12px 0; border-bottom: 1px solid #262D3D;
}
.history-item:last-child { border-bottom: none; }
.history-line {
  width: 3px; height: 36px; border-radius: 2px; margin-right: 12px;
}
.history-content { flex: 1; }
.history-title { font-size: 13px; font-weight: 500; display: block; }
.history-time { font-size: 11px; color: #475569; margin-top: 3px; display: block; }
.history-value {
  padding: 4px 10px; border-radius: 8px;
  font-size: 11px; font-weight: 600; color: #94A3B8; background: #111827;
}

/* ─── Responsive ───────────────────────────────────────────── */
@media (max-width: 1024px) { .dashboard-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) {
  .main-content { padding: 16px; }
  .nav-center { display: none; }
  .hero-content { flex-direction: column; text-align: center; }
  .hero-left { flex-direction: column; }
  .stats-row { grid-template-columns: repeat(3, 1fr); }
}
</style>
