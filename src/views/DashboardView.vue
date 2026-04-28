<template>
  <div class="dashboard">
    <!-- Navbar Profesional Mejorado -->
    <nav class="navbar">
  <!-- LOGO UNICO -->
  <div class="nav-brand">
    <router-link to="/dashboard" class="brand-logo-link">
      <svg width="160" height="42" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradWeb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F97316"/>
            <stop offset="100%" stop-color="#EA580C"/>
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
        <circle cx="30" cy="30" r="20" fill="none" stroke="url(#logoGradWeb)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="15s" repeatCount="indefinite"/>
        </circle>
        <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#logoGradWeb)"/>
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
  </div>

  <!-- ESTADO + SALIR -->
  <div class="nav-right">
    <div class="status-indicator">
      <span :class="['status-dot', connected ? 'online' : 'offline']"></span>
      <span class="status-text">{{ connected ? 'Online' : 'Offline' }}</span>
    </div>
    <button @click="handleLogout" class="logout-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      <span>Salir</span>
    </button>
  </div>
</nav>

    <main class="main-content">
      <!-- Panel de Alertas Inteligentes -->
      <transition-group name="alert-slide" tag="div" class="alerts-container">
        <div v-for="alerta in alertasActivas" :key="alerta.id" :class="['alert-card', alerta.tipo]">
          <div class="alert-icon">
            <svg v-if="alerta.tipo === 'gas'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <svg v-if="alerta.tipo === 'temperatura'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
            </svg>
            <svg v-if="alerta.tipo === 'estufa'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
            </svg>
          </div>
          <div class="alert-content">
            <h4>{{ alerta.titulo }}</h4>
            <p>{{ alerta.mensaje }}</p>
            <div class="alert-meta">
              <span class="alert-time">{{ alerta.timestamp }}</span>
              <span class="alert-level">Nivel: {{ alerta.nivel }}/10</span>
            </div>
          </div>
          <button @click="descartarAlerta(alerta.id)" class="alert-dismiss">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </transition-group>

      <!-- Grid Principal de Monitoreo -->
      <div class="monitoring-grid">
        <!-- Gráfica Principal - Niveles de Gas en Tiempo Real -->
        <div class="chart-main-card">
          <div class="chart-header">
            <h3>Monitoreo de Gas - Últimos 60 segundos</h3>
            <div class="chart-legend">
              <span class="legend-item">
                <span class="legend-color safe"></span> Seguro
              </span>
              <span class="legend-item">
                <span class="legend-color warning"></span> Precaución
              </span>
              <span class="legend-item">
                <span class="legend-color danger"></span> Peligro
              </span>
            </div>
          </div>
          <div class="chart-container">
            <canvas ref="gasChartCanvas" class="gas-chart"></canvas>
          </div>
          <div class="chart-thresholds">
            <div class="threshold" style="left: 20%">
              <span class="threshold-label">Precaución<br>20%</span>
            </div>
            <div class="threshold" style="left: 45%">
              <span class="threshold-label">Alerta<br>45%</span>
            </div>
            <div class="threshold" style="left: 70%">
              <span class="threshold-label">Peligro<br>70%</span>
            </div>
          </div>
        </div>

        <!-- Panel de Indicadores en Tiempo Real -->
        <div class="indicators-panel">
          <!-- Indicador de Gas Circular -->
          <div class="gauge-card">
            <h4>Nivel de Gas Actual</h4>
            <div class="gauge-container">
              <svg class="gauge" viewBox="0 0 120 120">
                <circle class="gauge-bg" cx="60" cy="60" r="50"/>
                <circle 
                  :class="['gauge-fill', gasLevelClass]"
                  cx="60" cy="60" r="50"
                  :style="{ 
                    strokeDasharray: `${(status.gas_level * 3.14)} ${314 - (status.gas_level * 3.14)}`,
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center'
                  }"
                />
                <text x="60" y="55" class="gauge-value" text-anchor="middle">
                  {{ status.gas_level }}%
                </text>
                <text x="60" y="75" class="gauge-label" text-anchor="middle">
                  GAS
                </text>
              </svg>
            </div>
            <div :class="['gauge-status', gasLevelClass]">
              {{ gasLevelMessage }}
            </div>
          </div>

          <!-- Indicador de Temperatura -->
          <div class="gauge-card">
            <h4>Temperatura Ambiente</h4>
            <div class="temp-display">
              <div class="temp-value" :class="tempLevelClass">
                {{ status.temperature }}°
              </div>
              <div class="temp-scale">
                <div class="scale-marks">
                  <span>0°</span><span>25°</span><span>50°</span><span>75°</span><span>100°</span>
                </div>
                <div class="scale-bar">
                  <div class="scale-fill" :style="{ width: (status.temperature / 100 * 100) + '%' }"></div>
                </div>
              </div>
              <div class="temp-status" :class="tempLevelClass">
                {{ tempMessage }}
              </div>
            </div>
          </div>
        </div>

        <!-- Panel de Análisis Predictivo -->
        <div class="analysis-panel">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            Análisis de Riesgo en Tiempo Real
          </h3>
          
          <div class="risk-indicators">
            <div class="risk-item">
              <div class="risk-header">
                <span>Riesgo de Fuga de Gas</span>
                <span :class="['risk-badge', riesgoFuga.nivel]">{{ riesgoFuga.porcentaje }}%</span>
              </div>
              <div class="risk-bar">
                <div class="risk-fill" :style="{ width: riesgoFuga.porcentaje + '%' }" :class="riesgoFuga.nivel"></div>
              </div>
              <p class="risk-description">{{ riesgoFuga.mensaje }}</p>
            </div>

            <div class="risk-item">
              <div class="risk-header">
                <span>Estufa Abandonada</span>
                <span :class="['risk-badge', riesgoEstufa.nivel]">{{ riesgoEstufa.porcentaje }}%</span>
              </div>
              <div class="risk-bar">
                <div class="risk-fill" :style="{ width: riesgoEstufa.porcentaje + '%' }" :class="riesgoEstufa.nivel"></div>
              </div>
              <p class="risk-description">{{ riesgoEstufa.mensaje }}</p>
            </div>

            <div class="risk-item">
              <div class="risk-header">
                <span>Sobrecalentamiento</span>
                <span :class="['risk-badge', riesgoTemp.nivel]">{{ riesgoTemp.porcentaje }}%</span>
              </div>
              <div class="risk-bar">
                <div class="risk-fill" :style="{ width: riesgoTemp.porcentaje + '%' }" :class="riesgoTemp.nivel"></div>
              </div>
              <p class="risk-description">{{ riesgoTemp.mensaje }}</p>
            </div>
          </div>

          <div class="recommendations">
            <h4>Recomendaciones</h4>
            <ul>
              <li v-for="(rec, index) in recomendaciones" :key="index" class="rec-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                {{ rec }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Panel de Estado de Sensores -->
        <div class="sensors-panel">
          <h3>Estado de Sensores</h3>
          <div class="sensors-grid">
            <div :class="['sensor-card', status.stove_on ? 'sensor-active' : '']">
              <div class="sensor-icon">🔥</div>
              <div class="sensor-info">
                <span class="sensor-name">Sensor de Fuego</span>
                <span :class="['sensor-status', status.stove_on ? 'text-danger' : 'text-safe']">
                  {{ status.stove_on ? 'DETECTADO' : 'Seguro' }}
                </span>
                <span class="sensor-time">Última lectura: {{ lastUpdate }}</span>
              </div>
            </div>

            <div class="sensor-card">
              <div class="sensor-icon">💨</div>
              <div class="sensor-info">
                <span class="sensor-name">Sensor de Gas</span>
                <span :class="['sensor-status', status.gas_level > 20 ? 'text-warning' : 'text-safe']">
                  {{ status.gas_level > 20 ? 'ELEVADO' : 'Normal' }}
                </span>
                <span class="sensor-time">Precisión: 99.8%</span>
              </div>
            </div>

            <div class="sensor-card">
              <div class="sensor-icon">🌡️</div>
              <div class="sensor-info">
                <span class="sensor-name">Sensor de Temperatura</span>
                <span :class="['sensor-status', status.temperature > 40 ? 'text-warning' : 'text-safe']">
                  {{ status.temperature > 40 ? 'ALTA' : 'Normal' }}
                </span>
                <span class="sensor-time">Calibrado: OK</span>
              </div>
            </div>

            <div class="sensor-card">
              <div class="sensor-icon">💧</div>
              <div class="sensor-info">
                <span class="sensor-name">Sensor de Humedad</span>
                <span class="sensor-status text-safe">Normal</span>
                <span class="sensor-time">{{ status.humidity }}% HR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de Eventos Recientes -->
      <div class="events-table-card">
        <div class="events-header">
          <h3>Eventos Recientes</h3>
          <div class="events-filter">
            <button 
              v-for="filtro in filtrosEventos" 
              :key="filtro"
              :class="['filter-btn', filtroActivo === filtro ? 'active' : '']"
              @click="filtroActivo = filtro"
            >
              {{ filtro }}
            </button>
          </div>
        </div>
        <div class="table-container">
          <table class="events-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Tipo de Evento</th>
                <th>Valor</th>
                <th>Umbral</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="evento in eventosFiltrados" :key="evento.id" :class="evento.severidad">
                <td class="event-time">{{ formatTime(evento.timestamp) }}</td>
                <td>
                  <span :class="['event-type', evento.tipo]">{{ evento.tipo }}</span>
                </td>
                <td class="event-value">{{ evento.valor }}</td>
                <td>{{ evento.umbral }}</td>
                <td>
                  <span :class="['status-badge', evento.estado]">{{ evento.estado }}</span>
                </td>
                <td>
                  <button class="action-btn" @click="investigarEvento(evento)">Detalles</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const API_BASE = import.meta.env.VITE_API_BASE
const connected = ref(false)
const status = ref({
  stove_on: false,
  gas_level: 0,
  temperature: 22,
  humidity: 55,
  panic: false
})

// Referencias para gráficos
const gasChartCanvas = ref(null)
let gasChart = null
let chartInterval = null

// Datos históricos para gráficos
const gasHistory = ref([])
const maxDataPoints = 60

// Sistema de Alertas Inteligentes
const alertasActivas = ref([])
const alertaCounter = ref(0)

// Análisis de Riesgo
const riesgoFuga = ref({
  porcentaje: 0,
  nivel: 'safe',
  mensaje: 'Niveles normales de gas'
})

const riesgoEstufa = ref({
  porcentaje: 0,
  nivel: 'safe',
  mensaje: 'Estufa apagada correctamente'
})

const riesgoTemp = ref({
  porcentaje: 0,
  nivel: 'safe',
  mensaje: 'Temperatura dentro de rangos normales'
})

// Recomendaciones inteligentes
const recomendaciones = ref([])

// Filtrado de eventos
const filtrosEventos = ['Todos', 'Gas', 'Temperatura', 'Estufa', 'Sistema']
const filtroActivo = ref('Todos')
const eventos = ref([])

// Datos de ejemplo para eventos (en producción vendrían del backend)
const eventosEjemplo = [
  { id: 1, timestamp: Date.now() - 10000, tipo: 'Gas', valor: '45%', umbral: '20%', estado: 'Alerta', severidad: 'danger' },
  { id: 2, timestamp: Date.now() - 20000, tipo: 'Temperatura', valor: '52°C', umbral: '40°C', estado: 'Alerta', severidad: 'warning' },
  { id: 3, timestamp: Date.now() - 30000, tipo: 'Estufa', valor: 'ON', umbral: 'OFF', estado: 'Crítico', severidad: 'danger' },
  { id: 4, timestamp: Date.now() - 40000, tipo: 'Sistema', valor: 'OK', umbral: '-', estado: 'Normal', severidad: 'safe' },
]

let eventInterval = null

// Computed Properties
const lastUpdate = computed(() => {
  return new Date().toLocaleTimeString('es-MX', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
})

const gasLevelClass = computed(() => {
  if (status.value.gas_level >= 70) return 'danger'
  if (status.value.gas_level >= 45) return 'warning'
  if (status.value.gas_level >= 20) return 'caution'
  return 'safe'
})

const gasLevelMessage = computed(() => {
  if (status.value.gas_level >= 70) return '¡PELIGRO! Evacuar'
  if (status.value.gas_level >= 45) return 'Alerta: Nivel alto'
  if (status.value.gas_level >= 20) return 'Precaución: Nivel elevado'
  return 'Niveles seguros'
})

const tempLevelClass = computed(() => {
  if (status.value.temperature >= 60) return 'danger'
  if (status.value.temperature >= 40) return 'warning'
  return 'safe'
})

const tempMessage = computed(() => {
  if (status.value.temperature >= 60) return '¡Sobrecalentamiento!'
  if (status.value.temperature >= 40) return 'Temperatura elevada'
  return 'Temperatura normal'
})

const eventosFiltrados = computed(() => {
  if (filtroActivo.value === 'Todos') return eventos.value
  return eventos.value.filter(e => e.tipo === filtroActivo.value)
})

// Funciones de Análisis de Datos
const analizarRiesgos = () => {
  const gas = status.value.gas_level
  const temp = status.value.temperature
  const estufa = status.value.stove_on

  // Análisis de riesgo de fuga de gas
  if (gas >= 70) {
    riesgoFuga.value = {
      porcentaje: 95,
      nivel: 'danger',
      mensaje: '¡Alto riesgo de explosión! Ventilar inmediatamente'
    }
  } else if (gas >= 45) {
    riesgoFuga.value = {
      porcentaje: gas * 1.5,
      nivel: 'warning',
      mensaje: 'Concentración peligrosa de gas. Verificar conexiones'
    }
  } else if (gas >= 20) {
    riesgoFuga.value = {
      porcentaje: gas,
      nivel: 'caution',
      mensaje: 'Ligero aumento en niveles de gas. Monitorear'
    }
  } else {
    riesgoFuga.value = {
      porcentaje: Math.max(5, gas),
      nivel: 'safe',
      mensaje: 'Niveles de gas dentro de lo normal'
    }
  }

  // Análisis de riesgo de estufa abandonada
  if (estufa && temp > 100) {
    riesgoEstufa.value = {
      porcentaje: 98,
      nivel: 'danger',
      mensaje: '¡Estufa encendida sin supervisión! Temperatura extremadamente alta'
    }
  } else if (estufa && temp > 60) {
    riesgoEstufa.value = {
      porcentaje: 75,
      nivel: 'warning',
      mensaje: 'Estufa encendida por tiempo prolongado. Verificar'
    }
  } else if (estufa) {
    riesgoEstufa.value = {
      porcentaje: 45,
      nivel: 'caution',
      mensaje: 'Estufa en uso. Tiempo de operación normal'
    }
  } else {
    riesgoEstufa.value = {
      porcentaje: 0,
      nivel: 'safe',
      mensaje: 'Estufa apagada y segura'
    }
  }

  // Análisis de sobrecalentamiento
  if (temp >= 80) {
    riesgoTemp.value = {
      porcentaje: 90,
      nivel: 'danger',
      mensaje: '¡Riesgo de incendio! Temperatura crítica detectada'
    }
  } else if (temp >= 60) {
    riesgoTemp.value = {
      porcentaje: temp,
      nivel: 'warning',
      mensaje: 'Temperatura peligrosamente alta. Posible fuente de calor cercana'
    }
  } else if (temp >= 40) {
    riesgoTemp.value = {
      porcentaje: temp * 0.8,
      nivel: 'caution',
      mensaje: 'Temperatura por encima de lo normal. Monitorear fuentes de calor'
    }
  } else {
    riesgoTemp.value = {
      porcentaje: Math.max(10, (temp / 40) * 50),
      nivel: 'safe',
      mensaje: 'Temperatura ambiente normal'
    }
  }

  generarRecomendaciones()
}

const generarRecomendaciones = () => {
  const recs = []
  
  if (status.value.gas_level >= 20) {
    recs.push('Verificar conexiones de gas y abrir ventanas para ventilación')
    recs.push('No encender ningún aparato eléctrico ni fuego')
  }
  
  if (status.value.stove_on && status.value.temperature > 60) {
    recs.push('La estufa lleva mucho tiempo encendida. Verificar si necesita estar activa')
    recs.push('Mantener elementos inflamables alejados de la cocina')
  }
  
  if (status.value.temperature > 40) {
    recs.push('Temperatura elevada detectada. Revisar fuentes de calor cercanas')
  }
  
  if (recs.length === 0) {
    recs.push('Todos los parámetros están dentro de rangos normales')
    recs.push('El sistema está monitoreando activamente')
    recs.push('No se requieren acciones adicionales en este momento')
  }
  
  recomendaciones.value = recs
}

const generarAlertas = () => {
  const nuevasAlertas = []
  const ahora = new Date().toLocaleTimeString()
  
  // Alerta de gas
  if (status.value.gas_level >= 70) {
    nuevasAlertas.push({
      id: ++alertaCounter.value,
      tipo: 'gas',
      titulo: '¡FUGA DE GAS CRÍTICA!',
      mensaje: `Nivel de gas al ${status.value.gas_level}%. Riesgo extremo de explosión.`,
      nivel: 10,
      timestamp: ahora
    })
  } else if (status.value.gas_level >= 45) {
    nuevasAlertas.push({
      id: ++alertaCounter.value,
      tipo: 'gas',
      titulo: 'Alerta de Gas',
      mensaje: `Concentración de gas elevada: ${status.value.gas_level}%. Tomar precauciones.`,
      nivel: 7,
      timestamp: ahora
    })
  }

  // Alerta de temperatura
  if (status.value.temperature >= 60) {
    nuevasAlertas.push({
      id: ++alertaCounter.value,
      tipo: 'temperatura',
      titulo: 'Sobrecalentamiento Detectado',
      mensaje: `Temperatura crítica: ${status.value.temperature}°C. Posible riesgo de incendio.`,
      nivel: 9,
      timestamp: ahora
    })
  }

  // Alerta de estufa abandonada
  if (status.value.stove_on && status.value.temperature > 100) {
    nuevasAlertas.push({
      id: ++alertaCounter.value,
      tipo: 'estufa',
      titulo: 'Estufa Abandonada',
      mensaje: 'Se detectó fuego activo sin supervisión por tiempo prolongado.',
      nivel: 9,
      timestamp: ahora
    })
  }

  // Actualizar alertas activas (mantener solo las más recientes)
  alertasActivas.value = [...nuevasAlertas, ...alertasActivas.value].slice(0, 5)
}

// Funciones de Gráficos
const inicializarGraficoGas = () => {
  const canvas = gasChartCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  
  // Configurar canvas
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)
  
  chartInterval = setInterval(() => {
    actualizarGraficoGas(ctx, rect.width, rect.height)
  }, 1000)
}

const actualizarGraficoGas = (ctx, width, height) => {
  // Limpiar canvas
  ctx.clearRect(0, 0, width, height)
  
  // Agregar nuevo dato a la historia
  gasHistory.value.push({
    timestamp: Date.now(),
    value: status.value.gas_level
  })
  
  // Mantener solo los últimos datos
  if (gasHistory.value.length > maxDataPoints) {
    gasHistory.value.shift()
  }
  
  // Configuración del gráfico
  const padding = { top: 20, right: 30, bottom: 40, left: 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  
  // Dibujar grid de fondo
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 1
  
  // Líneas de umbral
  const thresholds = [
    { value: 20, color: 'rgba(255, 149, 0, 0.5)', label: 'Precaución (20%)' },
    { value: 45, color: 'rgba(255, 149, 0, 0.7)', label: 'Alerta (45%)' },
    { value: 70, color: 'rgba(255, 59, 48, 0.7)', label: 'Peligro (70%)' }
  ]
  
  thresholds.forEach(t => {
    const y = padding.top + chartHeight - (t.value / 100 * chartHeight)
    ctx.beginPath()
    ctx.setLineDash([5, 5])
    ctx.moveTo(padding.left, y)
    ctx.lineTo(width - padding.right, y)
    ctx.strokeStyle = t.color
    ctx.stroke()
    ctx.setLineDash([])
    
    // Etiqueta del umbral
    ctx.fillStyle = t.color
    ctx.font = '10px -apple-system, sans-serif'
    ctx.fillText(t.label, padding.left + 5, y - 5)
  })
  
  // Dibujar gráfico de línea
  if (gasHistory.value.length > 1) {
    ctx.beginPath()
    ctx.strokeStyle = '#E63946'
    ctx.lineWidth = 2
    
    const points = gasHistory.value.map((data, index) => {
      const x = padding.left + (index / (maxDataPoints - 1)) * chartWidth
      const y = padding.top + chartHeight - (data.value / 100 * chartHeight)
      return { x, y }
    })
    
    // Dibujar área de relleno
    ctx.beginPath()
    ctx.moveTo(points[0].x, padding.top + chartHeight)
    points.forEach(point => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight)
    ctx.closePath()
    
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight)
    gradient.addColorStop(0, 'rgba(230, 57, 70, 0.3)')
    gradient.addColorStop(1, 'rgba(230, 57, 70, 0)')
    ctx.fillStyle = gradient
    ctx.fill()
    
    // Dibujar línea
    ctx.beginPath()
    ctx.strokeStyle = '#E63946'
    ctx.lineWidth = 2
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach(point => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.stroke()
    
    // Dibujar puntos
    points.forEach(point => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#E63946'
      ctx.fill()
    })
    
    // Último punto destacado
    const lastPoint = points[points.length - 1]
    ctx.beginPath()
    ctx.arc(lastPoint.x, lastPoint.y, 5, 0, Math.PI * 2)
    ctx.fillStyle = '#FF3B30'
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Valor actual
    ctx.fillStyle = 'white'
    ctx.font = 'bold 12px -apple-system, sans-serif'
    ctx.fillText(
      `${status.value.gas_level}%`,
      lastPoint.x + 10,
      lastPoint.y - 10
    )
  }
  
  // Ejes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(padding.left, padding.top)
  ctx.lineTo(padding.left, padding.top + chartHeight)
  ctx.lineTo(width - padding.right, padding.top + chartHeight)
  ctx.stroke()
  
  // Etiquetas del eje Y
  ctx.fillStyle = '#999'
  ctx.font = '10px -apple-system, sans-serif'
  for (let i = 0; i <= 100; i += 20) {
    const y = padding.top + chartHeight - (i / 100 * chartHeight)
    ctx.fillText(i + '%', padding.left - 30, y + 4)
  }
}

const fetchStatus = async () => {
  try {
    const res = await fetch(`${API_BASE}/status`)
    const data = await res.json()
    status.value = data
    connected.value = true
    
    // Realizar análisis de datos con cada actualización
    analizarRiesgos()
    generarAlertas()
    
  } catch {
    connected.value = false
  }
}

const descartarAlerta = async (alertaId) => {
  alertasActivas.value = alertasActivas.value.filter(a => a.id !== alertaId)
  
  // Si es alerta de gas, también llamar al backend
  if (alertaId > 0 && status.value.stove_on) {
    await fetch(`${API_BASE}/api/sensor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'gas', value: 0, alert: 0 })
    })
    status.value.stove_on = false
    status.value.gas_level = 0
  }
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const investigarEvento = (evento) => {
  // Aquí iría la lógica para mostrar detalles del evento
  console.log('Investigando evento:', evento)
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

// Eventos de datos simulados para demostración
const simularDatosEventos = () => {
  const tipos = ['Gas', 'Temperatura', 'Estufa', 'Sistema']
  const tipo = tipos[Math.floor(Math.random() * tipos.length)]
  const valores = {
    'Gas': ['12%', '25%', '38%', '52%', '5%'],
    'Temperatura': ['34°C', '42°C', '55°C', '28°C', '61°C'],
    'Estufa': ['ON', 'OFF', 'ON 15min', 'OFF'],
    'Sistema': ['OK', 'Mantenimiento', 'Actualizado', 'OK']
  }
  
  const nuevoEvento = {
    id: Date.now(),
    timestamp: Date.now() - Math.random() * 3600000,
    tipo: tipo,
    valor: valores[tipo][Math.floor(Math.random() * valores[tipo].length)],
    umbral: tipo === 'Gas' ? '20%' : tipo === 'Temperatura' ? '40°C' : '-',
    estado: Math.random() > 0.7 ? 'Alerta' : 'Normal',
    severidad: Math.random() > 0.7 ? 'warning' : 'safe'
  }
  
  eventos.value = [nuevoEvento, ...eventos.value].slice(0, 20)
}

onMounted(() => {
  fetchStatus()
  const statusInterval = setInterval(fetchStatus, 3000)
  
  // Inicializar gráfico después de un breve delay para asegurar que el canvas esté listo
  setTimeout(() => {
    inicializarGraficoGas()
  }, 100)
  
  // Simular eventos para la demo
  eventos.value = eventosEjemplo
  eventInterval = setInterval(simularDatosEventos, 8000)
  
  onUnmounted(() => {
    clearInterval(statusInterval)
    clearInterval(chartInterval)
    clearInterval(eventInterval)
  })
})
</script>

<style scoped>
/* Diseño Profesional - KitchenGuard con Análisis de Datos */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 72px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #E63946, #ff6b6b);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.brand-highlight {
  color: #E63946;
}

.nav-center {
  display: flex;
  gap: 8px;
}

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
  transition: all 0.3s ease;
}

.nav-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.nav-item-active {
  color: #ffffff;
  background: rgba(230, 57, 70, 0.15);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-dot.online {
  background: #30D158;
  box-shadow: 0 0 12px rgba(48, 209, 88, 0.5);
}

.status-dot.offline {
  background: #FF3B30;
  box-shadow: 0 0 12px rgba(255, 59, 48, 0.5);
}

.status-text {
  font-size: 13px;
  color: #999;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(230, 57, 70, 0.1);
  color: #E63946;
  border-color: rgba(230, 57, 70, 0.3);
}

/* Contenido Principal */
.main-content {
  padding: 32px;
  max-width: 1600px;
  margin: 0 auto;
}

/* Alertas Container */
.alerts-container {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-radius: 16px;
  border: 1px solid;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.alert-card.gas {
  background: rgba(51, 0, 0, 0.5);
  border-color: #FF3B30;
}

.alert-card.temperatura {
  background: rgba(51, 30, 0, 0.5);
  border-color: #FF9500;
}

.alert-card.estufa {
  background: rgba(51, 0, 0, 0.5);
  border-color: #FF6B35;
}

.alert-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
}

.alert-content {
  flex: 1;
}

.alert-content h4 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}

.alert-content p {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 4px;
}

.alert-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #999;
}

.alert-dismiss {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.alert-dismiss:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

/* Grid Principal */
.monitoring-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

/* Gráfica Principal */
.chart-main-card {
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.chart-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.chart-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #999;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-color.safe {
  background: #30D158;
}

.legend-color.warning {
  background: #FF9500;
}

.legend-color.danger {
  background: #FF3B30;
}

.chart-container {
  position: relative;
  height: 300px;
  margin-bottom: 20px;
}

.gas-chart {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.chart-thresholds {
  position: relative;
  height: 40px;
  margin: 0 40px 0 70px;
}

.threshold {
  position: absolute;
  transform: translateX(-50%);
}

.threshold-label {
  font-size: 11px;
  color: #999;
  text-align: center;
  display: block;
}

/* Panel de Indicadores */
.indicators-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.gauge-card {
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.gauge-card h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #ffffff;
}

.gauge-container {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.gauge {
  width: 150px;
  height: 150px;
}

.gauge-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 10;
}

.gauge-fill {
  fill: none;
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s ease;
}

.gauge-fill.safe {
  stroke: #30D158;
}

.gauge-fill.caution {
  stroke: #FF9500;
}

.gauge-fill.warning {
  stroke: #FF6B35;
}

.gauge-fill.danger {
  stroke: #FF3B30;
}

.gauge-value {
  font-size: 28px;
  font-weight: 700;
  fill: white;
}

.gauge-label {
  font-size: 12px;
  fill: #999;
}

.gauge-status {
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  padding: 8px;
  border-radius: 8px;
}

.gauge-status.safe {
  color: #30D158;
  background: rgba(48, 209, 88, 0.1);
}

.gauge-status.caution {
  color: #FF9500;
  background: rgba(255, 149, 0, 0.1);
}

.gauge-status.warning {
  color: #FF6B35;
  background: rgba(255, 107, 53, 0.1);
}

.gauge-status.danger {
  color: #FF3B30;
  background: rgba(255, 59, 48, 0.1);
}

/* Temperatura Display */
.temp-display {
  text-align: center;
}

.temp-value {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 16px;
}

.temp-value.safe {
  color: #30D158;
}

.temp-value.warning {
  color: #FF9500;
}

.temp-value.danger {
  color: #FF3B30;
}

.temp-scale {
  margin-bottom: 12px;
}

.scale-marks {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #999;
  margin-bottom: 4px;
}

.scale-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.scale-fill {
  height: 100%;
  background: linear-gradient(90deg, #30D158, #FF9500, #FF3B30);
  border-radius: 2px;
  transition: width 0.6s ease;
}

.temp-status {
  font-size: 14px;
  font-weight: 600;
  padding: 8px;
  border-radius: 8px;
}

.temp-status.safe {
  color: #30D158;
  background: rgba(48, 209, 88, 0.1);
}

.temp-status.warning {
  color: #FF9500;
  background: rgba(255, 149, 0, 0.1);
}

.temp-status.danger {
  color: #FF3B30;
  background: rgba(255, 59, 48, 0.1);
}

/* Panel de Análisis */
.analysis-panel {
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.analysis-panel h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
}

.risk-indicators {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.risk-item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.risk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.risk-header span {
  font-size: 14px;
  font-weight: 500;
}

.risk-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
}

.risk-badge.safe {
  background: rgba(48, 209, 88, 0.2);
  color: #30D158;
}

.risk-badge.caution {
  background: rgba(255, 149, 0, 0.2);
  color: #FF9500;
}

.risk-badge.warning {
  background: rgba(255, 107, 53, 0.2);
  color: #FF6B35;
}

.risk-badge.danger {
  background: rgba(255, 59, 48, 0.2);
  color: #FF3B30;
}

.risk-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.risk-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.risk-fill.safe {
  background: #30D158;
}

.risk-fill.caution {
  background: #FF9500;
}

.risk-fill.warning {
  background: #FF6B35;
}

.risk-fill.danger {
  background: #FF3B30;
}

.risk-description {
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}

.recommendations h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.recommendations ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rec-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #ccc;
  line-height: 1.5;
}

.rec-item svg {
  color: #30D158;
  flex-shrink: 0;
}

/* Panel de Sensores */
.sensors-panel {
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
  grid-column: 1 / -1;
}

.sensors-panel h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.sensors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.sensor-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.sensor-card.sensor-active {
  border-color: #FF3B30;
  background: rgba(255, 59, 48, 0.1);
}

.sensor-icon {
  font-size: 28px;
}

.sensor-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sensor-name {
  font-size: 14px;
  font-weight: 600;
}

.sensor-status {
  font-size: 13px;
  font-weight: 600;
}

.text-safe {
  color: #30D158;
}

.text-warning {
  color: #FF9500;
}

.text-danger {
  color: #FF3B30;
}

.sensor-time {
  font-size: 11px;
  color: #666;
}

/* Tabla de Eventos */
.events-table-card {
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.events-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.events-filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #999;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.filter-btn.active {
  background: #E63946;
  color: white;
  border-color: #E63946;
}

.table-container {
  overflow-x: auto;
}

.events-table {
  width: 100%;
  border-collapse: collapse;
}

.events-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  color: #999;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.events-table td {
  padding: 12px 16px;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.event-type {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.event-type.Gas {
  background: rgba(255, 149, 0, 0.2);
  color: #FF9500;
}

.event-type.Temperatura {
  background: rgba(100, 210, 255, 0.2);
  color: #64D2FF;
}

.event-type.Estufa {
  background: rgba(255, 59, 48, 0.2);
  color: #FF3B30;
}

.event-type.Sistema {
  background: rgba(48, 209, 88, 0.2);
  color: #30D158;
}

.event-value {
  font-weight: 600;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.status-badge.Normal {
  background: rgba(48, 209, 88, 0.2);
  color: #30D158;
}

.status-badge.Alerta,
.status-badge.Crítico {
  background: rgba(255, 59, 48, 0.2);
  color: #FF3B30;
}

.action-btn {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ccc;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

tr.danger td {
  background: rgba(255, 59, 48, 0.05);
}

tr.warning td {
  background: rgba(255, 149, 0, 0.05);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .monitoring-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 20px;
  }
  
  .nav-center {
    display: none;
  }
  
  .events-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>