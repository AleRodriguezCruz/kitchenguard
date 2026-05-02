<template>
  <div class="setup-container">
    <div class="setup-card">
      <!-- Logo -->
      <div class="setup-logo">
        <svg width="180" height="50" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="setupLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F97316"/>
              <stop offset="100%" stop-color="#EA580C"/>
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
          <circle cx="30" cy="30" r="20" fill="none" stroke="url(#setupLogoGrad)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="15s" repeatCount="indefinite"/>
          </circle>
          <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#setupLogoGrad)"/>
          <ellipse cx="24" cy="20" rx="3" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-20, 24, 20)"/>
          <path d="M30 15 C33 8 38 5 42 8 C38 10 34 12 30 15Z" fill="#166534"/>
          <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1">KITCHEN</text>
          <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5">GUARD</text>
          <line x1="64" y1="14" x2="64" y2="50" stroke="#323B4E" stroke-width="1"/>
          <circle cx="228" cy="30" r="4" fill="#10B981" opacity="0.9"/>
        </svg>
      </div>

      <h2>⚙️ Configurar tu Dispositivo</h2>
      
      <!-- Código del dispositivo -->
      <div class="device-code-box">
        <span class="code-label">Código del dispositivo</span>
        <span class="code-value">{{ deviceCode }}</span>
      </div>

      <!-- Indicador de pasos -->
      <div class="steps-indicator">
        <div class="steps-line">
          <div :class="['step-dot', step >= 1 ? 'active' : '']">
            <span v-if="step > 1">✓</span>
            <span v-else>1</span>
          </div>
          <div :class="['step-connector', step >= 2 ? 'active' : '']"></div>
          <div :class="['step-dot', step >= 2 ? 'active' : '']">
            <span v-if="step > 2">✓</span>
            <span v-else>2</span>
          </div>
          <div :class="['step-connector', step >= 3 ? 'active' : '']"></div>
          <div :class="['step-dot', step >= 3 ? 'active' : '']">
            <span v-if="step > 3">✓</span>
            <span v-else>3</span>
          </div>
        </div>
        <div class="steps-labels">
          <span :class="step >= 1 ? 'active' : ''">Conectar WiFi</span>
          <span :class="step >= 2 ? 'active' : ''">Vincular</span>
          <span :class="step >= 3 ? 'active' : ''">¡Listo!</span>
        </div>
      </div>

      <!-- Paso 1: Conectar WiFi -->
      <div v-if="step === 1" class="step-content">
        <div class="step-icon">📶</div>
        <h3>Conectar a tu red WiFi</h3>
        <p>Selecciona tu red WiFi e ingresa la contraseña para que el sensor se conecte a internet.</p>
        
        <div class="form-group">
          <label>Red WiFi</label>
          <input v-model="wifiSSID" type="text" placeholder="Nombre de tu red WiFi" class="setup-input" />
        </div>
        
        <div class="form-group">
          <label>Contraseña</label>
          <input v-model="wifiPass" type="password" placeholder="Contraseña de WiFi" class="setup-input" />
        </div>
        
        <button @click="conectarWiFi" class="setup-btn" :disabled="connecting">
          {{ connecting ? 'Conectando...' : 'Conectar a WiFi' }}
        </button>
      </div>

      <!-- Paso 2: Vincular dispositivo -->
      <div v-if="step === 2" class="step-content">
        <div class="step-icon">🔗</div>
        <h3>Vincular Dispositivo</h3>
        <p>Presiona el botón en tu sensor KitchenGuard hasta que la luz parpadee en <span style="color:#6366F1;font-weight:700">azul</span>.</p>
        
        <div v-if="pairing" class="pairing-animation">
          <div class="pulse-circle"></div>
          <span>Buscando dispositivo...</span>
        </div>
        
        <button @click="vincularDispositivo" class="setup-btn" :disabled="pairing">
          {{ pairing ? 'Vinculando...' : 'Iniciar Vinculación' }}
        </button>
        
        <button @click="step = 1" class="back-btn">← Volver</button>
      </div>

      <!-- Paso 3: ¡Listo! -->
      <div v-if="step === 3" class="step-content">
        <div class="step-icon">🎉</div>
        <h3>¡Configuración Completa!</h3>
        <p>Tu sensor KitchenGuard está listo para proteger tu cocina 24/7.</p>
        
        <div class="success-info">
          <div class="info-row">
            <span>Dispositivo</span>
            <span class="text-safe">✓ {{ deviceCode }}</span>
          </div>
          <div class="info-row">
            <span>WiFi</span>
            <span class="text-safe">✓ {{ wifiSSID || 'Conectado' }}</span>
          </div>
          <div class="info-row">
            <span>Sensores</span>
            <span class="text-safe">✓ Calibrados</span>
          </div>
        </div>
        
        <router-link to="/dashboard" class="setup-btn primary">
          🏠 Ir al Dashboard
        </router-link>
        
        <p class="tip">💡 Descarga nuestra app móvil para recibir alertas en tiempo real</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const step = ref(1)
const deviceCode = ref('')
const wifiSSID = ref('')
const wifiPass = ref('')
const connecting = ref(false)
const pairing = ref(false)

onMounted(() => {
  const codeFromQR = route.params.code || route.query.code
  if (codeFromQR) {
    deviceCode.value = codeFromQR
  } else {
    deviceCode.value = 'KG-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  }
})

const conectarWiFi = async () => {
  if (!wifiSSID.value || !wifiPass.value) {
    alert('Por favor completa todos los campos')
    return
  }
  
  connecting.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  connecting.value = false
  step.value = 2
}

const vincularDispositivo = async () => {
  pairing.value = true
  await new Promise(resolve => setTimeout(resolve, 3000))
  pairing.value = false
  step.value = 3
}
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.setup-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0A0D14 0%, #111827 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.setup-card {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 24px;
  padding: 40px;
  max-width: 480px;
  width: 100%;
  text-align: center;
}

.setup-logo {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

h2 {
  font-size: 22px;
  font-weight: 800;
  color: #F8FAFC;
  margin-bottom: 20px;
}

.device-code-box {
  background: #111827;
  border: 1px solid #262D3D;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 30px;
}

.code-label {
  display: block;
  font-size: 11px;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.code-value {
  font-size: 20px;
  font-weight: 800;
  color: #F97316;
  letter-spacing: 2px;
  font-family: 'Courier New', monospace;
}

/* Pasos */
.steps-indicator {
  margin-bottom: 30px;
}

.steps-line {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.step-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #262D3D;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #475569;
  transition: all 0.3s;
}

.step-dot.active {
  background: #F97316;
  color: white;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.step-connector {
  width: 60px;
  height: 2px;
  background: #262D3D;
  transition: all 0.3s;
}

.step-connector.active {
  background: #F97316;
}

.steps-labels {
  display: flex;
  justify-content: space-around;
  font-size: 11px;
  color: #475569;
  padding: 0 10px;
}

.steps-labels span.active {
  color: #F97316;
  font-weight: 700;
}

/* Contenido de pasos */
.step-content {
  animation: fadeSlideIn 0.4s ease;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.step-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.step-content h3 {
  font-size: 20px;
  font-weight: 700;
  color: #F8FAFC;
  margin-bottom: 10px;
}

.step-content p {
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 24px;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 16px;
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 11px;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
  font-weight: 600;
}

.setup-input {
  width: 100%;
  padding: 14px 16px;
  background: #0A0D14;
  border: 1px solid #262D3D;
  border-radius: 12px;
  color: #F8FAFC;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
}

.setup-input:focus {
  border-color: #F97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

.setup-btn {
  width: 100%;
  padding: 15px;
  background: #F97316;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
}

.setup-btn:hover:not(:disabled) {
  background: #EA580C;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.3);
}

.setup-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.setup-btn.primary {
  background: #10B981;
}

.back-btn {
  background: none;
  border: none;
  color: #94A3B8;
  font-size: 13px;
  cursor: pointer;
  margin-top: 16px;
  padding: 8px;
  transition: color 0.2s;
}

.back-btn:hover {
  color: #F8FAFC;
}

/* Animación de vinculación */
.pairing-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}

.pulse-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.1);
  border: 3px solid #6366F1;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.5; }
}

.pairing-animation span {
  color: #94A3B8;
  font-size: 14px;
}

/* Info de éxito */
.success-info {
  background: #111827;
  border: 1px solid #262D3D;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: left;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  color: #94A3B8;
}

.info-row:not(:last-child) {
  border-bottom: 1px solid #262D3D;
}

.text-safe {
  color: #10B981;
  font-weight: 600;
}

.tip {
  color: #475569;
  font-size: 12px;
  margin-top: 16px;
}

@media (max-width: 480px) {
  .setup-card {
    padding: 28px 20px;
  }
}
</style>
