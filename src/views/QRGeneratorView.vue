<template>
  <div class="qr-page">
    <div class="qr-card">
      <!-- Logo -->
      <div class="qr-logo">
        <svg width="180" height="50" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="qrLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F97316"/>
              <stop offset="100%" stop-color="#EA580C"/>
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
          <circle cx="30" cy="30" r="20" fill="none" stroke="url(#qrLogoGrad)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
          <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#qrLogoGrad)"/>
          <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1">KITCHEN</text>
          <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5">GUARD</text>
        </svg>
      </div>

      <h2>Generar QR del Dispositivo</h2>
      <p class="qr-subtitle">Escanea este código para configurar tu sensor KitchenGuard</p>

      <!-- Código del dispositivo -->
      <div class="code-section">
        <label>Código del Dispositivo</label>
        <div class="code-display">
          <input :value="deviceCode" readonly class="code-input" />
          <button @click="generateNewCode" class="refresh-btn">🔄 Generar Nuevo</button>
        </div>
      </div>

      <!-- URL de configuración -->
      <div class="url-section">
        <label>URL de Configuración</label>
        <div class="url-display">
          <input :value="setupUrl" readonly class="url-input" />
          <button @click="copyUrl" class="copy-btn">
            {{ copied ? '✓ Copiado' : '📋 Copiar' }}
          </button>
        </div>
      </div>

      <!-- QR Code (GENERADO ONLINE) -->
      <div class="qr-container">
        <div class="qr-wrapper">
          <img 
            :src="qrImageUrl" 
            alt="QR KitchenGuard" 
            class="qr-image"
            @error="qrError = true"
          />
          <div v-if="qrError" class="qr-error">
            <p>Error al cargar QR</p>
            <button @click="generateNewCode" class="retry-btn">Reintentar</button>
          </div>
        </div>
        <p class="qr-hint">📱 Escanea con la cámara de tu celular</p>
      </div>

      <!-- Botones de descarga -->
      <div class="action-buttons">
        <a :href="qrImageUrl" download="KitchenGuard-QR.png" class="btn-primary" target="_blank">
          📥 Descargar QR
        </a>
        <button @click="printQR" class="btn-outline">
          🖨️ Imprimir
        </button>
      </div>

      <!-- Instrucciones -->
      <div class="instructions">
        <h3>📝 Instrucciones para el cliente:</h3>
        <ol>
          <li>Escanea el código QR con tu celular</li>
          <li>Conecta el sensor a tu red WiFi</li>
          <li>Vincula el dispositivo con tu cuenta</li>
          <li>¡Listo! Tu cocina está protegida 24/7</li>
        </ol>
      </div>

      <!-- Volver -->
      <router-link to="/dashboard" class="back-link">
        ← Volver al Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const deviceCode = ref('')
const copied = ref(false)
const qrError = ref(false)

// URL base - cámbiala por tu dominio real cuando hagas deploy
const BASE_URL = window.location.origin

const setupUrl = computed(() => {
  return `${BASE_URL}/setup/${deviceCode.value}`
})

// URL de la API gratuita de QR
const qrImageUrl = computed(() => {
  const encodedUrl = encodeURIComponent(setupUrl.value)
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}&bgcolor=FFFFFF&color=0A0D14&format=png&qzone=2`
})

// Generar código único
const generateNewCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'KG-'
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  deviceCode.value = code
  qrError.value = false
}

// Copiar URL
const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(setupUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Fallback para navegadores que no soportan clipboard
    const input = document.createElement('input')
    input.value = setupUrl.value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

// Imprimir QR
const printQR = () => {
  const printWindow = window.open('', '_blank', 'width=500,height=650')
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>KitchenGuard - QR de Configuración</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body { 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          background: white;
          padding: 40px;
        }
        .print-card {
          text-align: center;
          border: 2px dashed #E5E7EB;
          border-radius: 20px;
          padding: 40px;
          max-width: 400px;
        }
        img { 
          width: 280px; 
          height: 280px;
          margin-bottom: 20px;
        }
        h2 { 
          color: #111827; 
          margin-bottom: 8px;
          font-size: 26px;
        }
        .code {
          font-size: 22px;
          font-weight: 800;
          color: #F97316;
          letter-spacing: 3px;
          font-family: 'Courier New', monospace;
          margin-bottom: 12px;
        }
        p { 
          color: #6B7280; 
          margin: 6px 0;
          font-size: 14px;
        }
        .footer-text {
          margin-top: 20px;
          font-size: 11px;
          color: #9CA3AF;
        }
      </style>
    </head>
    <body>
      <div class="print-card">
        <img src="${qrImageUrl.value}" alt="QR KitchenGuard" crossorigin="anonymous" />
        <h2>🍎 KitchenGuard</h2>
        <div class="code">${deviceCode.value}</div>
        <p>Escanea este código QR para configurar tu dispositivo</p>
        <p class="footer-text">www.kitchenguard.app</p>
      </div>
    </body>
    </html>
  `)
  printWindow.document.close()
  setTimeout(() => printWindow.print(), 800)
}

onMounted(() => {
  generateNewCode()
})
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.qr-page {
  min-height: 100vh;
  background: #0A0D14;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #F8FAFC;
}

.qr-card {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.qr-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

h2 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
}

.qr-subtitle {
  color: #94A3B8;
  font-size: 13px;
  margin-bottom: 24px;
}

/* Código y URL */
.code-section, .url-section {
  margin-bottom: 16px;
  text-align: left;
}

label {
  display: block;
  font-size: 11px;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
  font-weight: 600;
}

.code-display, .url-display {
  display: flex;
  gap: 8px;
}

.code-input, .url-input {
  flex: 1;
  padding: 12px;
  background: #0A0D14;
  border: 1px solid #262D3D;
  border-radius: 10px;
  color: #F8FAFC;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  outline: none;
}

.code-input {
  color: #F97316;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
}

.refresh-btn, .copy-btn {
  padding: 10px 14px;
  background: #262D3D;
  border: 1px solid #323B4E;
  border-radius: 10px;
  color: #F8FAFC;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
  transition: all 0.2s;
}

.refresh-btn:hover, .copy-btn:hover {
  background: #323B4E;
}

/* QR */
.qr-container {
  margin: 24px 0;
}

.qr-wrapper {
  background: white;
  border-radius: 16px;
  padding: 16px;
  display: inline-block;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.qr-image {
  width: 280px;
  height: 280px;
  display: block;
}

.qr-error {
  width: 280px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #EF4444;
  gap: 10px;
}

.retry-btn {
  padding: 8px 16px;
  background: #EF4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.qr-hint {
  color: #475569;
  font-size: 12px;
  margin-top: 10px;
}

/* Botones */
.action-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.btn-primary {
  flex: 1;
  padding: 12px;
  background: #F97316;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #EA580C;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.3);
}

.btn-outline {
  flex: 1;
  padding: 12px;
  background: transparent;
  border: 1px solid #323B4E;
  border-radius: 12px;
  color: #F8FAFC;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: #F97316;
  color: #F97316;
}

/* Instrucciones */
.instructions {
  background: #111827;
  border: 1px solid #262D3D;
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
}

.instructions h3 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}

.instructions ol {
  padding-left: 20px;
}

.instructions li {
  color: #94A3B8;
  font-size: 13px;
  line-height: 2;
}

/* Volver */
.back-link {
  display: inline-flex;
  align-items: center;
  color: #475569;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.back-link:hover {
  color: #F97316;
}
</style>