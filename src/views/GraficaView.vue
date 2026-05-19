<template>
  <div class="dashboard">
    <!-- Navbar -->
    <NavBar :connected="connected" />
  
    <main class="main-content">
      <!-- Header -->
      <div class="page-header">
        <div class="page-title-group">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <h2>Gráficas de Sensores</h2>
        </div>

        <!-- Selector de fecha -->
        <div class="fecha-selector">
          <label class="fecha-label">📅 Fecha:</label>
          <input type="date" v-model="fechaSeleccionada" class="fecha-input" :max="hoy" @change="fetchDatos"/>
          <button @click="fetchDatos" class="refresh-btn" :disabled="cargando"
          :style="cargando ? 'opacity: 0.5; cursor: not-allowed;' : ''">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                :style="cargando ? 'animation: spin 1s linear infinite' : ''">
            <polyline points="23 4 23 10 17 10"/>
            <polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
        </button>
        </div>
      </div>
        <!-- Aviso de modo/intervalo -->
        <div v-if="modoActual === 'solo_alertas'" class="modo-aviso">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>Estás en modo <strong>Solo alertas</strong> — la gráfica solo mostrará picos de alerta. Para ver variaciones del día completo, cambia el intervalo en 
            <router-link to="/historial" class="aviso-link">Historial</router-link>.
        </span>
        </div>
      <!-- Loading -->
      <div v-if="cargando" class="loading-state">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2"
             style="animation: spin 1s linear infinite">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        <span>Cargando datos...</span>
      </div>

      <template v-else>
        <!-- Sin datos -->
        <div v-if="sinDatos" class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="1.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <p>Sin registros para este día</p>
          <span>Selecciona otro día o cambia el modo de historial a 5 min o 30 min</span>
        </div>

        <template v-else>
          <!-- Gráfica Gas -->
          <div ref="gasCardRef" class="chart-card">
            <div class="chart-header">

            <button @click="descargarGrafica('gas')" class="download-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Descargar
            </button>
              <div class="chart-title-group">
                <span class="sensor-dot gas"></span>
                <h3>Gas LP — {{ fechaFormateada }}</h3>
              </div>
              <div class="chart-stats">
                <div class="stat">
                  <span class="stat-label">Promedio</span>
                  <span class="stat-value gas">{{ promedioGas }}%</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Pico</span>
                  <span class="stat-value danger">{{ picoGas }}%</span>
                </div>
              </div>
            </div>
            <div class="chart-container">
              <canvas ref="gasCanvas"></canvas>
            </div>
          </div>

          <!-- Gráfica Temperatura -->
          <div ref="tempCardRef" class="chart-card">
            <div class="chart-header">
                  <button @click="descargarGrafica('temperatura')" class="download-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Descargar
                </button>
              <div class="chart-title-group">
                <span class="sensor-dot temp"></span>
                <h3>Temperatura — {{ fechaFormateada }}</h3>
              </div>
              <div class="chart-stats">
                <div class="stat">
                  <span class="stat-label">Promedio</span>
                  <span class="stat-value temp">{{ promedioTemp }}°C</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Máx.</span>
                  <span class="stat-value danger">{{ picoTemp }}°C</span>
                </div>
              </div>
            </div>
            <div class="chart-container">
              <canvas ref="tempCanvas"></canvas>
            </div>
          </div>
        </template>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Chart from 'chart.js/auto'
import html2canvas from 'html2canvas'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const { logout } = useAuth()
const API_BASE = import.meta.env.VITE_API_BASE

const gasCanvas  = ref(null)
const tempCanvas = ref(null)
let gasChart  = null
let tempChart = null

const cargando = ref(true)
const sinDatos = ref(false)
const gasData  = ref([])
const tempData = ref([])

const modoActual = ref('')
const connected = ref(false)

const hoy = new Date().toLocaleDateString('sv-SE')
const fechaSeleccionada = ref(hoy)

const fechaFormateada = computed(() => {
  const [year, month, day] = fechaSeleccionada.value.split('-')
  return new Date(year, month - 1, day).toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
})

const promedioGas = computed(() => {
  if (!gasData.value.length) return 0
  return (gasData.value.reduce((a, b) => a + b.promedio, 0) / gasData.value.length).toFixed(1)
})

const picoGas = computed(() => {
  if (!gasData.value.length) return 0
  return Math.max(...gasData.value.map(d => d.maximo)).toFixed(1)
})

const promedioTemp = computed(() => {
  if (!tempData.value.length) return 0
  return (tempData.value.reduce((a, b) => a + b.promedio, 0) / tempData.value.length).toFixed(1)
})

const picoTemp = computed(() => {
  if (!tempData.value.length) return 0
  return Math.max(...tempData.value.map(d => d.maximo)).toFixed(1)
})

// Generar labels de 00 a 23
const horasCompletas = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))

const buildDataset = (data, hora) => {
  const row = data.find(d => d.hora === hora)
  return row ? parseFloat(row.promedio.toFixed(2)) : null
}

const crearGrafica = (canvas, data, color, label, unidad, yMax) => {
  if (!canvas) return null

  const labels = horasCompletas.map(h => `${h}:00`)
  const valores = horasCompletas.map(h => buildDataset(data, h))

  return new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `${label} (${unidad})`,
        data: valores,
        borderColor: color,
        backgroundColor: color + '22',
        pointBackgroundColor: color,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        spanGaps: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#94A3B8', font: { size: 12 } } },
        tooltip: {
          callbacks: {
            label: (ctx) => ctx.parsed.y !== null ? `${ctx.dataset.label}: ${ctx.parsed.y}${unidad}` : 'Sin datos'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#475569', maxRotation: 45 },
          grid:  { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: { color: '#475569', callback: (v) => `${v}${unidad}` },
          grid:  { color: 'rgba(255,255,255,0.05)' },
          beginAtZero: true,
          max: yMax
        }
      }
    }
  })
}

// Descargar grafica
const gasCardRef  = ref(null)
const tempCardRef = ref(null)

const descargarGrafica = async (tipo) => {
  const card = tipo === 'gas' ? gasCardRef.value : tempCardRef.value
  if (!card) return

  // Ocultar botones de descarga
  const botones = card.querySelectorAll('.download-btn')
  botones.forEach(b => b.style.visibility = 'hidden')

  const canvas = await html2canvas(card, {
    backgroundColor: '#1A1F2E',
    scale: 2  // mejor resolución
  })

  const link = document.createElement('a')
  link.download = `kitchenguard_${tipo}_${fechaSeleccionada.value}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}


const fetchDatos = async () => {
  cargando.value = true
  sinDatos.value = false

  if (gasChart)  { gasChart.destroy();  gasChart  = null }
  if (tempChart) { tempChart.destroy(); tempChart = null }

  try {
    const [resModo, resGas, resTemp] = await Promise.all([
      fetch(`${API_BASE}/api/config/modo`),
      fetch(`${API_BASE}/api/sensor/histograma?type=gas&fecha=${fechaSeleccionada.value}`),
      fetch(`${API_BASE}/api/sensor/histograma?type=temperatura&fecha=${fechaSeleccionada.value}`),

    ])
    connected.value = true

    const dataModo = await resModo.json()
    modoActual.value = dataModo.modo

    const dataGas  = await resGas.json()  
    const dataTemp = await resTemp.json()

    gasData.value  = dataGas.lecturas  || []
    tempData.value = dataTemp.lecturas || []


    sinDatos.value = gasData.value.length === 0 && tempData.value.length === 0
  } catch (err) {
    console.error('Error fetchDatos:', err)
    sinDatos.value = true
    connected.value = false
  } finally {
    cargando.value = false
    if (!sinDatos.value) {
      await nextTick()
      gasChart  = crearGrafica(gasCanvas.value,  gasData.value,  '#F59E0B', 'Gas LP',       '%', 100)
      tempChart = crearGrafica(tempCanvas.value, tempData.value, '#F97316', 'Temperatura',  '°C', 50)
    }
  }
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onMounted(async () => {
  await fetchDatos()
})
onUnmounted(() => {
  if (gasChart)  gasChart.destroy() // limpia la grafica de gas
  if (tempChart) tempChart.destroy() // limpia la grafica de temeperatura
})
</script>

<style scoped>

.dashboard {
  min-height: 100vh;
  background: #0A0D14;
  color: #F8FAFC;
}

.navbar {
  background: rgba(17, 24, 39, 0.95);  
}

.main-content {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

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

.page-title-group h2 { font-size: 22px; font-weight: 800; }

.fecha-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 12px;
  padding: 8px 16px;
}

.fecha-label { font-size: 13px; color: #475569; }

.fecha-input {
  background: transparent;
  border: none;
  color: #F8FAFC;
  font-size: 13px;
  cursor: pointer;
  outline: none;
  color-scheme: dark;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 300px;
  color: #475569;
  font-size: 14px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 300px;
  color: #475569;
  text-align: center;
}

.empty-state p { font-size: 16px; font-weight: 600; color: #94A3B8; }
.empty-state span { font-size: 13px; color: #475569; max-width: 400px; }

.chart-card {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.chart-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chart-title-group h3 { font-size: 16px; font-weight: 700; }

.sensor-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.sensor-dot.gas  { background: #F59E0B; }
.sensor-dot.temp { background: #F97316; }

.chart-stats {
  display: flex;
  gap: 16px;
}

.stat {
  background: #111827;
  border: 1px solid #262D3D;
  border-radius: 10px;
  padding: 8px 14px;
  text-align: center;
}

.stat-label { display: block; font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-value { display: block; font-size: 18px; font-weight: 800; margin-top: 2px; }
.stat-value.gas    { color: #F59E0B; }
.stat-value.temp   { color: #F97316; }
.stat-value.danger { color: #EF4444; }

.modo-aviso {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(245,158,11,0.08);
  border: 1px solid rgba(245,158,11,0.25);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #94A3B8;
}

.modo-aviso strong { color: #F59E0B; }

.aviso-link {
  color: #F97316;
  font-weight: 600;
  text-decoration: none;
}

.aviso-link:hover { text-decoration: underline; }

.chart-container { height: 280px; position: relative; }

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #111827;
  border: 1px solid #262D3D;
  border-radius: 10px;
  color: #94A3B8;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.download-btn:hover {
  color: #F8FAFC;
  border-color: #323B4E;
  background: #1E2435;
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .main-content { padding: 16px; }
  .nav-center { display: none; }
  .page-header { flex-direction: column; align-items: flex-start; }
}
</style>