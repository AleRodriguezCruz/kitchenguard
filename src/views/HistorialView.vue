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
      <div class="modo-toggle">
        <span class="modo-label">💾 Todo:</span>
        <button :class="['modo-btn', modoHistorial === 'cada_5min' ? 'active' : '']" @click="cambiarModo('cada_5min')">5 min</button>
        <button :class="['modo-btn', modoHistorial === 'cada_30min' ? 'active' : '']" @click="cambiarModo('cada_30min')">30 min</button>
        <button :class="['modo-btn', modoHistorial === 'cada_hora' ? 'active' : '']" @click="cambiarModo('cada_hora')">1 hora</button>
        <button :class="['modo-btn', modoHistorial === 'cada_24h' ? 'active' : '']" @click="cambiarModo('cada_24h')">24 hrs</button>
        <span class="modo-separator">|</span>
        <button :class="['modo-btn', modoHistorial === 'solo_alertas' ? 'active' : '']" @click="cambiarModo('solo_alertas')">Solo alertas</button>
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
      <div v-if="tab === 'sensores'" class="table-container">
        <div class="table-header">
          <h3>{{ modoSeleccion ? 'Selecciona para eliminar' : 'Registros de Sensores' }}</h3>
          <span class="table-count">{{ sensores.length }} registros</span>
        </div>
        
        <div v-if="sensores.length === 0" class="empty-state">
    <p>Sin registros de sensores</p>
        </div>

  <table v-else class="events-table">
  <thead>
    <tr>
            <!-- Checkbox seleccionar todos, solo visible en modo selección -->
      <th v-if="modoSeleccion">
        <input type="checkbox"
               :checked="seleccionados.size === sensoresPaginados.length"
               @change="toggleTodos"
               class="check-input"/>
      </th>
      <th>No.</th><th>Tipo</th><th>Valor</th><th>Alerta</th><th>Fecha</th><th>Detalles</th>
    </tr>
  </thead>

  <tbody>
    <template v-for="(s, index) in sensoresPaginados" :key="s.id">
      <tr :class="[s.alert ? 'row-alert' : '', seleccionados.has(s.id) ? 'row-selected' : '']">
        <!-- Checkbox individual, solo visible en modo selección -->
         <td v-if="modoSeleccion">
            <input type="checkbox"
                  :checked="seleccionados.has(s.id)"
                  @change="toggleSeleccion(s.id)"
                  class="check-input"/>
          </td>
        <td class="cell-id">{{ sensoresOrdenados.length - ((paginaSensores - 1) * porPagina + index) }}</td>
        <td><span :class="['type-badge', getTypeClass(s.type)]">{{ s.type }}</span></td>
        <td class="cell-value">{{ s.value }}</td>
        <td><span :class="['status-badge', s.alert ? 'alert' : 'normal']">{{ s.alert ? '🔥 Alerta' : '✓ Normal' }}</span></td>
        <td class="cell-date">{{ formatDate(s.timestamp) }}</td>
      <td>
        <!-- Se evalua directamente si s.alert es "truthy" (true, 1, o un string no vacío) -->
        <button v-if="s.alert" class="detail-btn" @click="toggleDetalle(s.id)">
          {{ eventoExpandido === s.id ? 'Cerrar' : 'Ver detalles' }}
        </button>
        <span v-else-if="!modoSeleccion" class="cell-id">—</span>
      </td>
      </tr>
      <tr v-if="eventoExpandido === s.id" class="detail-row">
        <td colspan="6">
          <div v-if="getEventoAlerta(s)" class="detail-panel">

          <!-- Barra en vivo / congelado -->
          <div class="detail-status-bar">
            <template v-if="!getEventoAlerta(s).timestamp_fin">
              <span class="live-dot"></span>
              <span class="live-label">En curso · actualizando en tiempo real</span>
            </template>
            <template v-else>
              <span class="frozen-icon">❄️</span>
              <span class="frozen-label">Alerta cerrada · datos fijos</span>
            </template>
          </div>

          <!-- Tarjetas -->
          <div class="detail-grid">
            <div class="detail-card">
              <span class="detail-card-label">Valor inicial</span>
              <span class="detail-card-value">{{ getEventoAlerta(s).valor_inicio }}{{ s.type === 'gas' ? '%' : '°C' }}</span>
              <span class="detail-card-sub">Al activarse la alerta</span>
            </div>
            <div class="detail-card pico-card">
              <span class="detail-card-label">{{ getEventoAlerta(s).timestamp_fin ? 'Valor pico' : 'Valor actual / pico' }}</span>
              <span class="detail-card-value pico">{{ getEventoAlerta(s).valor_pico }}{{ s.type === 'gas' ? '%' : '°C' }}</span>
              <span class="detail-card-sub">{{ getEventoAlerta(s).timestamp_fin ? 'Máximo registrado' : 'Se actualiza en vivo' }}</span>
            </div>
            <div class="detail-card">
              <span class="detail-card-label">Duración</span>
              <span class="detail-card-value duration">{{ calcularDuracion(getEventoAlerta(s)) }}</span>
              <span class="detail-card-sub">{{ getEventoAlerta(s).timestamp_fin ? 'Duración total' : 'Tiempo transcurrido' }}</span>
            </div>
            <div class="detail-card">
              <span class="detail-card-label">Inicio alerta</span>
              <span class="detail-card-value small">{{ formatDate(getEventoAlerta(s).timestamp_inicio) }}</span>
              <span class="detail-card-sub">Hora de activación</span>
            </div>
            <div class="detail-card">
              <span class="detail-card-label">Fin alerta</span>
              <span class="detail-card-value small" :class="!getEventoAlerta(s).timestamp_fin ? 'en-curso' : ''">
                {{ getEventoAlerta(s).timestamp_fin ? formatDate(getEventoAlerta(s).timestamp_fin) : 'En curso…' }}
              </span>
              <span class="detail-card-sub">Hora de cierre</span>
            </div>
          </div>
        </div>
      <div v-else class="detail-panel no-event">
        <span class="cell-id">Sin datos de evento disponibles para este registro.</span>
      </div>
      </td>
    </tr>
        </template>
      </tbody>
    </table>

        <div v-if="totalPaginasSensores > 1" class="pagination">
          <button @click="paginaSensores--" :disabled="paginaSensores === 1" class="page-btn">‹</button>
          <span class="page-info">{{ paginaSensores }} / {{ totalPaginasSensores }}</span>
          <button @click="paginaSensores++" :disabled="paginaSensores === totalPaginasSensores" class="page-btn">›</button>
        </div>
      </div>

      <!-- Tabla de Pánico -->
      <div v-if="tab === 'panico'" class="table-container">
        <div class="table-header">
          <h3>Registros de Pánico</h3>
          <span class="table-count">{{ panicos.length }} registros</span>
        </div>
        <div v-if="panicos.length === 0" class="empty-state">
          <p>Sin registros de pánico</p>
          <span class="empty-sub">No se han activado alertas de emergencia</span>
        </div>
        <table v-else class="events-table">
          <thead>
            <tr><th>No.</th><th>Estado</th><th>Notificación</th><th>Fecha</th></tr>
          </thead>
          <tbody>
            <tr v-for="(p, index) in panicosPaginados" :key="p.id" class="row-panic">
              <td class="cell-id">{{ panicos.length - ((paginaPanicos - 1) * porPagina + index) }}</td>
              <td><span class="status-badge panic">🆘 Pánico Activado</span></td>
              <td><span :class="['status-badge', p.atendido ? 'normal' : 'alert']">{{ p.atendido ? '✓ Cerrada' : '🆘 Activa' }}</span></td>
              <td class="cell-date">{{ formatDate(p.timestamp) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="totalPaginasPanicos > 1" class="pagination">
          <button @click="paginaPanicos--" :disabled="paginaPanicos === 1" class="page-btn">‹</button>
          <span class="page-info">{{ paginaPanicos }} / {{ totalPaginasPanicos }}</span>
          <button @click="paginaPanicos++" :disabled="paginaPanicos === totalPaginasPanicos" class="page-btn">›</button>
        </div>
      </div>

      <!-- Tabla Todos (combinada) -->
<div v-if="tab === 'todos'" class="table-container">
  <div class="table-header">
    <h3>Todos los Registros</h3>
    <span class="table-count">{{ todosCombinados.length }} registros</span>
  </div>
  <div v-if="todosCombinados.length === 0" class="empty-state">
    <p>Sin registros</p>
  </div>
  <table v-else class="events-table">
    <thead>
      <tr>
        <th>No.</th>
        <th>Tipo</th>
        <th>Detalle</th>
        <th>Estado</th>
        <th>Fecha</th>
        <th>Detalles</th>
      </tr>
        
    </thead>
      <tbody>
      <template v-for="(item, index) in todosPaginados" :key="item._tabla + item.id">
        <tr :class="item._tabla === 'panico' ? 'row-panic' : item.alert ? 'row-alert' : ''">
          <td class="cell-id">{{ todosCombinados.length - ((paginaTodos - 1) * porPagina + index) }}</td>
          <td>
            <span v-if="item._tabla === 'sensor'" :class="['type-badge', getTypeClass(item.type)]">{{ item.type }}</span>
            <span v-else class="type-badge fire">🆘 Pánico</span>
          </td>
          <td class="cell-value">
            <span v-if="item._tabla === 'sensor'">{{ item.value }}</span>
            <span v-else>Botón de emergencia</span>
          </td>
          <td>
            <span v-if="item._tabla === 'sensor'" :class="['status-badge', item.alert ? 'alert' : 'normal']">
              {{ item.alert ? '🔥 Alerta' : '✓ Normal' }}
            </span>
            <span v-else :class="['status-badge', item.atendido ? 'normal' : 'alert']">
              {{ item.atendido ? '✓ Cerrada' : '🆘 Activa' }}
            </span>
          </td>
          <td class="cell-date">{{ formatDate(item.timestamp) }}</td>
          <td>
            <button v-if="item._tabla === 'sensor' && item.alert && getEventoAlerta(item)"
                    class="detail-btn" @click="toggleDetalle(item._tabla + item.id)">
              {{ eventoExpandido === item._tabla + item.id ? 'Cerrar' : 'Ver detalles' }}
            </button>
            <span v-else class="cell-id">—</span>
          </td>
        </tr>
        <tr v-if="eventoExpandido === item._tabla + item.id" class="detail-row">
          <td colspan="6">
            <div class="detail-panel">
              <div class="detail-status-bar">
                <template v-if="!getEventoAlerta(item).timestamp_fin">
                  <span class="live-dot"></span>
                  <span class="live-label">En curso · actualizando en tiempo real</span>
                </template>
                <template v-else>
                  <span class="frozen-icon">❄️</span>
                  <span class="frozen-label">Alerta cerrada · datos fijos</span>
                </template>
              </div>
              <div class="detail-grid">
                <div class="detail-card">
                  <span class="detail-card-label">Valor inicial</span>
                  <span class="detail-card-value">{{ getEventoAlerta(item).valor_inicio }}{{ item.type === 'gas' ? '%' : '°C' }}</span>
                  <span class="detail-card-sub">Al activarse la alerta</span>
                </div>
                <div class="detail-card pico-card">
                  <span class="detail-card-label">{{ getEventoAlerta(item).timestamp_fin ? 'Valor pico' : 'Valor actual / pico' }}</span>
                  <span class="detail-card-value pico">{{ getEventoAlerta(item).valor_pico }}{{ item.type === 'gas' ? '%' : '°C' }}</span>
                  <span class="detail-card-sub">{{ getEventoAlerta(item).timestamp_fin ? 'Máximo registrado' : 'Se actualiza en vivo' }}</span>
                </div>
                <div class="detail-card">
                  <span class="detail-card-label">Duración</span>
                  <span class="detail-card-value duration">{{ calcularDuracion(getEventoAlerta(item)) }}</span>
                  <span class="detail-card-sub">{{ getEventoAlerta(item).timestamp_fin ? 'Duración total' : 'Tiempo transcurrido' }}</span>
                </div>
                <div class="detail-card">
                  <span class="detail-card-label">Inicio alerta</span>
                  <span class="detail-card-value small">{{ formatDate(getEventoAlerta(item).timestamp_inicio) }}</span>
                  <span class="detail-card-sub">Hora de activación</span>
                </div>
                <div class="detail-card">
                  <span class="detail-card-label">Fin alerta</span>
                  <span class="detail-card-value small" :class="!getEventoAlerta(item).timestamp_fin ? 'en-curso' : ''">
                    {{ getEventoAlerta(item).timestamp_fin ? formatDate(getEventoAlerta(item).timestamp_fin) : 'En curso…' }}
                  </span>
                  <span class="detail-card-sub">Hora de cierre</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <div v-if="totalPaginasTodos > 1" class="pagination">
    <button @click="paginaTodos--" :disabled="paginaTodos === 1" class="page-btn">‹</button>
    <span class="page-info">{{ paginaTodos }} / {{ totalPaginasTodos }}</span>
    <button @click="paginaTodos++" :disabled="paginaTodos === totalPaginasTodos" class="page-btn">›</button>
  </div>
</div>

      <!-- Botón refrescar -->
      <div class="refresh-section">
        <button v-if="!modoSeleccion" @click="fetchData" class="refresh-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Actualizar Datos
        </button>
          <!-- Botón eliminar -->
        <button @click="toggleModoSeleccion" :class="['delete-btn', modoSeleccion ? 'active' : '']">
          <!-- Icono basura cuando dice Eliminar -->
            <svg v-if="!modoSeleccion" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
            <!-- Icono X cuando dice Cancelar -->
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          {{ modoSeleccion ? 'Cancelar' : 'Eliminar' }}
      </button>
          <!-- Confirmar eliminación, solo visible si hay seleccionados -->
        <button v-if="modoSeleccion && seleccionados.size > 0"
                @click="mostrarConfirm = true"
                class="confirm-delete-btn">
          Eliminar {{ seleccionados.size }} registro{{ seleccionados.size > 1 ? 's' : '' }}
        </button>
      </div>

        <!-- Modal de confirmación -->
      <div v-if="mostrarConfirm" class="modal-overlay" @click.self="mostrarConfirm = false">
        <div class="modal-box">
          <div class="modal-icon">🗑️</div>
          <h3 class="modal-title">¿Eliminar registros?</h3>
          <p class="modal-msg">
            Estás a punto de eliminar <strong>{{ seleccionados.size }} registro{{ seleccionados.size > 1 ? 's' : '' }}</strong>.<br>
            Una vez confirmado, no se podrán recuperar.
          </p>
          <div class="modal-actions">
            <button class="modal-cancel" @click="mostrarConfirm = false">Cancelar</button>
            <button class="modal-confirm" @click="confirmarEliminacion">Sí, eliminar</button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { logout } = useAuth()
const API_BASE = import.meta.env.VITE_API_BASE

const tab = ref('sensores')
const sensores = ref([])
//----------------------------------------------------------
// Seleccionar para eliminar en historial
const modoSeleccion = ref(false) //control si esta activo el modo seleccion
const seleccionados = ref(new Set()) // evitar id duplicados

// Activar/desactivar modo selección
const toggleModoSeleccion = () => {
  modoSeleccion.value = !modoSeleccion.value
  // Limpiar selección al salir del modo
  if (!modoSeleccion.value) seleccionados.value = new Set()
}
// Seleccionar/deseleccionar un registro individual
const toggleSeleccion = (id) => {
  const s = new Set(seleccionados.value)
  if (s.has(id)) {
    s.delete(id)
  } else {
    s.add(id)
  }
  seleccionados.value = s
}
// Seleccionar o deseleccionar todos los de la página actual
const toggleTodos = () => {
  if (seleccionados.value.size === sensoresPaginados.value.length) {
    seleccionados.value = new Set()
  } else {
    seleccionados.value = new Set(sensoresPaginados.value.map(s => s.id))
  }
}
// Eliminar los registros seleccionados
const eliminarSeleccionados = async () => {
  if (seleccionados.value.size === 0) return
  
  const ids = Array.from(seleccionados.value)
  try {
    await fetch(`${API_BASE}/api/sensor/eliminar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    })
    // Refrescar datos y salir del modo selección
    await fetchData()
    modoSeleccion.value = false
    seleccionados.value = new Set()
  } catch (err) {
    console.error('Error al eliminar:', err)
  }
}

const mostrarConfirm = ref(false)

const confirmarEliminacion = async () => {
  mostrarConfirm.value = false
  await eliminarSeleccionados()
}
//----------------------------------------------------------

// Convierte timestamp de SQLite a milisegundos UTC
// SQLite no incluye 'Z', JS necesita 'Z' para interpretar como UTC
const toMs = (ts) => new Date(ts.includes('Z') ? ts : ts + 'Z').getTime()

const sensoresOrdenados = computed(() => {
  const alertasActivas = sensores.value.filter(s => {
    if (!s.alert) return false
    return alertasEventos.value.some(e => {
      if (e.type !== s.type || !e.activa) return false
      return Math.abs(toMs(s.timestamp) - toMs(e.timestamp_inicio)) <= 10000
    })
  })
  const resto = sensores.value.filter(s => !alertasActivas.includes(s))
  return [...alertasActivas, ...resto]
})


const panicos = ref([])

const modosValidos = ['solo_alertas', 'cada_5min', 'cada_30min', 'cada_hora', 'cada_24h']
const modoHistorial = ref('solo_alertas') // temporal hasta que onMounted cargue el valor real

const alertasEventos = ref([])
const eventoExpandido = ref(null)
const ahora = ref(new Date())
let tickerInterval = null
let pollInterval = null

const startTicker = () => {
  if (tickerInterval) return
  tickerInterval = setInterval(() => {
    ahora.value = new Date()
  }, 1000)
}

const stopTicker = () => {
  clearInterval(tickerInterval)
  tickerInterval = null
}

const hayAlertasActivas = computed(() =>
  alertasEventos.value.some(e => !e.timestamp_fin)
)

const startPoll = () => {
  if (pollInterval) return

  pollInterval = setInterval(async () => {
    try {
      const ae = await fetch(`${API_BASE}/api/alertas/eventos`)
        .then(r => r.json())

      alertasEventos.value = Array.isArray(ae) ? ae : []

    } catch {}
  }, 5000)
}

const stopPoll = () => {
  clearInterval(pollInterval)
  pollInterval = null
}

watch(hayAlertasActivas, (activas) => {
  if (activas) {
    startTicker()
    startPoll()
  } else {
    stopTicker()
    stopPoll()
  }
}, { immediate: true })

const toggleDetalle = (id) => {
  eventoExpandido.value = eventoExpandido.value === id ? null : id
}

const getEventoAlerta = (sensor) => {
  if (!sensor.alert) return null

  const eventos = Array.isArray(alertasEventos.value) ? alertasEventos.value : []

  const candidatos = eventos
    .filter(e => {
      if (e.type !== sensor.type) return false
      return Math.abs(toMs(sensor.timestamp) - toMs(e.timestamp_inicio)) <= 10000
    })
    .map(e => ({
      evento: e,
      distancia: Math.abs(toMs(sensor.timestamp) - toMs(e.timestamp_inicio))
    }))
    .sort((a, b) => a.distancia - b.distancia)

  return candidatos.length > 0 ? candidatos[0].evento : null
}

//==========
const cambiarModo = async (modo) => {
  try {
    await fetch(`${API_BASE}/api/config/modo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modo })
    })
    modoHistorial.value = modo
  } catch {
    console.error('Error al cambiar modo')
  }
}

// ============= Paginación================
const paginaSensores = ref(1) // Página actual tab sensores
const paginaPanicos = ref(1) // Página actual even pánico
const paginaTodos    = ref(1)
const porPagina = 10 // Registros por pág. 10

// Paginación de sensores
const sensoresPaginados = computed(() => {
  const inicio = (paginaSensores.value - 1) * porPagina
  return sensoresOrdenados.value.slice(inicio, inicio + porPagina)
})
// Paginación eventos de pánico
const panicosPaginados = computed(() => {
  const inicio = (paginaPanicos.value - 1) * porPagina
  return panicos.value.slice(inicio, inicio + porPagina)
})

const todosCombinados = computed(() => {
  const sens = sensores.value.map(s => ({ ...s, _tabla: 'sensor' }))
  const pan  = panicos.value.map(p => ({ ...p, _tabla: 'panico' }))
  const todos = [...sens, ...pan]

  const alertasActivas = todos.filter(item => {
    if (item._tabla !== 'sensor' || !item.alert) return false
    return alertasEventos.value.some(e => {
      if (e.type !== item.type || !e.activa) return false
      return Math.abs(toMs(item.timestamp) - toMs(e.timestamp_inicio)) <= 10000
    })
  })

  const resto = todos
    .filter(item => !alertasActivas.includes(item))
    .sort((a, b) => toMs(b.timestamp) - toMs(a.timestamp))

  return [...alertasActivas, ...resto]
})

const todosPaginados = computed(() => {
  const inicio = (paginaTodos.value - 1) * porPagina
  return todosCombinados.value.slice(inicio, inicio + porPagina)
})

const totalPaginasSensores = computed(() => Math.ceil(sensores.value.length / porPagina))
const totalPaginasPanicos  = computed(() => Math.ceil(panicos.value.length / porPagina))
const totalPaginasTodos    = computed(() => Math.ceil(todosCombinados.value.length / porPagina))

watch(tab, () => {
  paginaSensores.value = 1
  paginaPanicos.value  = 1
  paginaTodos.value    = 1
})

//==============Filtros=========
const eventosFiltrados = computed(() => {
  if (tab.value === 'sensores') return sensoresOrdenados.value
  if (tab.value === 'panico') return panicos.value
  return todosCombinados.value
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
    return new Date(toMs(timestamp)).toLocaleString('es-MX', {
      year:     'numeric',
      month:    'short',
      day:      'numeric',
      hour:     '2-digit',
      minute:   '2-digit',
      second:   '2-digit',
      timeZone: 'America/Ensenada'
    })
  } catch {
    return timestamp
  }
}

const fetchData = async () => {
  try {
    const [s, p, ae] = await Promise.all([
      fetch(`${API_BASE}/api/sensor`).then(r => r.json()),
      fetch(`${API_BASE}/api/panic`).then(r => r.json()),
      fetch(`${API_BASE}/api/alertas/eventos`).then(r => r.json())
    ])
    sensores.value = Array.isArray(s) ? s : []
    panicos.value = Array.isArray(p) ? p : []
    alertasEventos.value = Array.isArray(ae) ? ae : []
  } catch (err) {
    console.error('fetchData error:', err)  
  }
}

const calcularDuracion = (evento) => {
  if (!evento) return '—'

  const inicio = new Date(toMs(evento.timestamp_inicio))
  const fin    = evento.timestamp_fin
    ? new Date(toMs(evento.timestamp_fin))
    : ahora.value

  const seg = Math.floor((fin - inicio) / 1000)

  if (seg < 60)   return `${seg}s`
  if (seg < 3600) return `${Math.floor(seg / 60)}m ${seg % 60}s`
  return `${Math.floor(seg / 3600)}h ${Math.floor((seg % 3600) / 60)}m`
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onMounted(async () => {
  await fetchData()
  try {
    const res = await fetch(`${API_BASE}/api/config/modo`)
    const data = await res.json()
    modoHistorial.value = data.modo
    //localStorage.setItem('modoHistorial', data.modo)
  } catch(err) {
     console.error("ERROR FETCH:", err)
  }
})

onUnmounted(() => {
  stopTicker()
  stopPoll()
})

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

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #262D3D;
}

.page-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #111827;
  border: 1px solid #262D3D;
  color: #94A3B8;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  background: #F97316;
  border-color: #F97316;
  color: white;
}

.page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.page-info {
  font-size: 13px;
  color: #475569;
  min-width: 60px;
  text-align: center;
}
 /*Style para toggle */
 .modo-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #111827;
  border: 1px solid #262D3D;
  border-radius: 12px;
  padding: 6px 10px;
}

.modo-label {
  font-size: 12px;
  color: #475569;
}

.modo-btn {
  padding: 6px 14px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #475569;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.modo-btn.active {
  background: #F97316;
  color: white;
  font-weight: 700;
}

.detail-btn {
  padding: 4px 12px;
  background: rgba(249,115,22,0.1);
  border: 1px solid rgba(249,115,22,0.3);
  border-radius: 6px;
  color: #F97316;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.detail-btn:hover { background: rgba(249,115,22,0.2); }

.detail-row td { padding: 0 !important; border-bottom: 1px solid #262D3D; }

.detail-panel {
  display: flex;
  gap: 24px;
  padding: 16px 20px;
  background: rgba(249,115,22,0.05);
  flex-wrap: wrap;
}

.detail-status-bar { display: flex; align-items: center; gap: 8px; }

.live-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 0 0 rgba(16,185,129,0.6);
  animation: pulse-live 1.4s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse-live {
  0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
  70%  { box-shadow: 0 0 0 7px rgba(16,185,129,0); }
  100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
}
.live-label   { font-size: 11px; color: #10B981; font-weight: 600; }
.frozen-icon  { font-size: 13px; }
.frozen-label { font-size: 11px; color: #475569; font-weight: 500; }

.detail-grid { display: flex; flex-wrap: wrap; gap: 12px; }

.detail-card {
  background: rgba(17,24,39,0.7); border: 1px solid #262D3D;
  border-radius: 12px; padding: 14px 18px;
  display: flex; flex-direction: column; gap: 4px;
  min-width: 140px; flex: 1;
}
.detail-card.pico-card { border-color: rgba(249,115,22,0.4); background: rgba(249,115,22,0.06); }
.detail-card.no-event  { flex-direction: row; align-items: center; }

.detail-card-label { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 0.6px; font-weight: 600; }
.detail-card-value { font-size: 22px; font-weight: 800; color: #F8FAFC; line-height: 1.1; }
.detail-card-value.pico     { color: #F97316; }
.detail-card-value.duration { color: #6366F1; font-variant-numeric: tabular-nums; }
.detail-card-value.small    { font-size: 13px; font-weight: 600; }
.detail-card-value.en-curso { color: #F59E0B; }
.detail-card-sub { font-size: 11px; color: #334155; margin-top: 2px; }

.modo-separator {
  color: #262D3D;
  font-size: 18px;
  padding: 0 4px;
  user-select: none;
}

.refresh-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.delete-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 12px;
  color: #EF4444;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-btn.active {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  color: #94A3B8;
}

.delete-btn.active:hover {
  color: #F8FAFC;
  border-color: #323B4E;
  background: #1E2435;
}
.delete-btn:not(.active):hover { 
  background: rgba(239,68,68,0.15);
  color: #F8FAFC;
}
.confirm-delete-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #EF4444;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-delete-btn:hover { background: #DC2626; }



.row-selected td { background: rgba(239,68,68,0.1) !important; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.modal-box {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 20px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-icon { font-size: 40px; }

.modal-title {
  font-size: 18px;
  font-weight: 800;
  color: #F8FAFC;
}

.modal-msg {
  font-size: 13px;
  color: #94A3B8;
  line-height: 1.6;
}

.modal-msg strong {
  color: #F8FAFC;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
}

.modal-cancel {
  padding: 10px 24px;
  background: #111827;
  border: 1px solid #262D3D;
  border-radius: 12px;
  color: #94A3B8;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-cancel:hover {
  background: #1E2435;
  color: #F8FAFC;
  border-color: #323B4E;
}

.modal-confirm {
  padding: 10px 24px;
  background: #EF4444;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-confirm:hover { background: #DC2626; }

.check-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #F97316;
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