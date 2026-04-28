<template>
  <div class="dashboard">
    <!-- Navbar (igual que Dashboard) -->
    <nav class="navbar">
      <router-link to="/dashboard" class="brand-link">
        <div class="brand-logo-svg">
          <svg width="150" height="42" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradTimer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F97316"/>
                <stop offset="100%" stop-color="#EA580C"/>
              </linearGradient>
            </defs>
            <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
            <circle cx="30" cy="30" r="20" fill="none" stroke="url(#logoGradTimer)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
            <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#logoGradTimer)"/>
            <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1">KITCHEN</text>
            <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5">GUARD</text>
          </svg>
        </div>
      </router-link>
      
      <div class="nav-links">
        <router-link to="/dashboard" class="nav-item">Inicio</router-link>
        <router-link to="/timers" class="nav-item nav-active">Timers</router-link>
        <router-link to="/historial" class="nav-item">Historial</router-link>
      </div>
      
      <button @click="handleLogout" class="logout-btn">Salir</button>
    </nav>

    <main class="main-content">
      <!-- Header de Timers -->
      <div class="timer-header">
        <div>
          <h2>Temporizadores</h2>
          <span class="timer-sub">{{ timers.length }} activos</span>
        </div>
        <button @click="showForm = !showForm" :class="['add-btn', showForm ? 'active' : '']">
          {{ showForm ? '✕' : '+' }}
        </button>
      </div>

      <!-- Formulario para agregar timer -->
      <Transition name="form-slide">
        <div v-if="showForm" class="add-form">
          <div class="form-group">
            <label>Nombre del temporizador</label>
            <input v-model="timerName" type="text" placeholder="Ej: Pasta, Arroz, Horno..." class="form-input" />
          </div>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Minutos</label>
              <input v-model="timerMin" type="number" placeholder="15" class="form-input" min="1" />
            </div>
            <div class="form-group flex-1">
              <label>Segundos</label>
              <input v-model="timerSec" type="number" placeholder="0" class="form-input" min="0" max="59" />
            </div>
          </div>
          <button @click="crearTimer" class="start-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Iniciar Temporizador
          </button>
        </div>
      </Transition>

      <!-- Lista de Timers -->
      <div v-if="timers.length === 0 && !showForm" class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <span class="empty-text">Sin temporizadores activos</span>
        <span class="empty-sub">Presiona + para crear uno</span>
      </div>

      <div class="timers-grid">
        <div v-for="timer in timers" :key="timer.id" :class="['timer-card', timer.remaining <= 0 ? 'timer-done' : '']">
          <div class="timer-info">
            <span class="timer-name">{{ timer.name }}</span>
            <span :class="['timer-count', timer.remaining <= 0 ? 'done' : timer.remaining <= 60 ? 'warning' : '']">
              {{ formatTime(timer.remaining) }}
            </span>
            <div v-if="timer.remaining > 0" class="timer-progress">
              <div 
                class="timer-progress-fill" 
                :style="{ width: ((timer.total - timer.remaining) / timer.total * 100) + '%', background: timer.remaining <= 60 ? '#F59E0B' : '#F97316' }"
              ></div>
            </div>
            <span v-if="timer.remaining <= 0" class="done-badge">✅ Completado</span>
          </div>
          <button @click="eliminarTimer(timer.id)" :class="['stop-btn', timer.remaining <= 0 ? 'done-btn' : '']">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
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

const router = useRouter()
const { logout } = useAuth()

const timers = ref([])
const timerName = ref('')
const timerMin = ref('')
const timerSec = ref('')
const showForm = ref(false)
let timerInterval = null

// Alarma sonora
const playAlarm = () => {
  try {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
    audio.loop = true
    audio.volume = 0.8
    audio.play()
    // Guardar referencia para detener
    window.currentAlarm = audio
  } catch (e) {
    console.log('Error alarma:', e)
  }
}

const stopAlarm = () => {
  if (window.currentAlarm) {
    window.currentAlarm.pause()
    window.currentAlarm.currentTime = 0
    window.currentAlarm = null
  }
}

const crearTimer = () => {
  const mins = parseInt(timerMin.value) || 0
  const secs = parseInt(timerSec.value) || 0
  const totalSeconds = mins * 60 + secs
  
  if (!timerName.value.trim() || totalSeconds <= 0) return
  
  timers.value.push({
    id: Date.now(),
    name: timerName.value.trim(),
    remaining: totalSeconds,
    total: totalSeconds,
  })
  
  timerName.value = ''
  timerMin.value = ''
  timerSec.value = ''
  showForm.value = false
}

const eliminarTimer = (id) => {
  stopAlarm()
  timers.value = timers.value.filter(t => t.id !== id)
}

const formatTime = (seconds) => {
  if (seconds <= 0) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onMounted(() => {
  timerInterval = setInterval(() => {
    timers.value = timers.value.map(t => {
      if (t.remaining > 0) {
        const newRem = t.remaining - 1
        if (newRem === 0) {
          playAlarm()
          // Notificación nativa si está disponible
          if (Notification.permission === 'granted') {
            new Notification('⏰ ¡Temporizador!', { body: `"${t.name}" está listo.` })
          }
        }
        return { ...t, remaining: newRem }
      }
      return t
    })
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timerInterval)
  stopAlarm()
})
</script>

<style scoped>
:root {
  --bg: #0A0D14;
  --surface: #111827;
  --card: #1A1F2E;
  --border: #262D3D;
  --accent: #F97316;
  --text: #F8FAFC;
  --textSub: #94A3B8;
  --textMuted: #475569;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

.dashboard {
  min-height: 100vh;
  background: #0A0D14;
  color: #F8FAFC;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  height: 64px;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #262D3D;
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand-link { text-decoration: none; display: flex; align-items: center; }
.nav-links { display: flex; gap: 4px; }

.nav-item {
  padding: 8px 16px;
  border-radius: 10px;
  color: #94A3B8;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all .2s;
}

.nav-item:hover { color: #F8FAFC; background: rgba(255,255,255,.04); }
.nav-active { color: #F97316; background: rgba(249,115,22,.1); }

.logout-btn {
  padding: 8px 16px;
  background: rgba(239,68,68,.08);
  border: 1px solid rgba(239,68,68,.25);
  border-radius: 10px;
  color: #EF4444;
  font-size: 13px;
  cursor: pointer;
}

.main-content {
  padding: 28px;
  max-width: 800px;
  margin: 0 auto;
}

.timer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.timer-header h2 { font-size: 22px; font-weight: 800; }
.timer-sub { font-size: 13px; color: #475569; display: block; margin-top: 2px; }

.add-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #F97316;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all .2s;
}

.add-btn.active { background: #1A1F2E; border: 1px solid #262D3D; color: #94A3B8; }

.add-form {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
}

.form-group { margin-bottom: 14px; }
.form-group label { display: block; font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: .8px; margin-bottom: 6px; }
.form-row { display: flex; gap: 12px; }
.flex-1 { flex: 1; }

.form-input {
  width: 100%;
  padding: 12px;
  background: #0A0D14;
  border: 1px solid #262D3D;
  border-radius: 10px;
  color: #F8FAFC;
  font-size: 15px;
  outline: none;
}

.form-input:focus { border-color: #F97316; }

.start-btn {
  width: 100%;
  padding: 14px;
  background: #F97316;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all .2s;
}

.start-btn:hover { background: #EA580C; }

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #475569;
}

.empty-text { display: block; font-size: 16px; font-weight: 600; margin-top: 14px; color: #94A3B8; }
.empty-sub { display: block; font-size: 13px; margin-top: 4px; }

.timers-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.timer-card {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  align-items: center;
  transition: all .2s;
}

.timer-card:hover { border-color: #323B4E; }

.timer-done {
  border-color: rgba(16, 185, 129, .3);
  background: rgba(5, 46, 27, .2);
}

.timer-info { flex: 1; }

.timer-name {
  font-size: 13px;
  color: #94A3B8;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}

.timer-count {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -1px;
  color: #F8FAFC;
}

.timer-count.warning { color: #F59E0B; }
.timer-count.done { color: #10B981; }

.timer-progress {
  height: 3px;
  background: #262D3D;
  border-radius: 2px;
  margin-top: 8px;
}

.timer-progress-fill {
  height: 3px;
  border-radius: 2px;
  transition: width 1s linear;
}

.done-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #10B981;
  margin-top: 6px;
}

.stop-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid #262D3D;
  color: #94A3B8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s;
}

.stop-btn:hover { background: rgba(255,255,255,.05); color: #F8FAFC; }
.done-btn { background: rgba(16, 185, 129, .15); border-color: rgba(16, 185, 129, .3); color: #10B981; }

.form-slide-enter-active { transition: all .3s ease; }
.form-slide-leave-active { transition: all .2s ease; }
.form-slide-enter-from { opacity: 0; transform: translateY(-10px); }
.form-slide-leave-to { opacity: 0; transform: translateY(-5px); }
</style>