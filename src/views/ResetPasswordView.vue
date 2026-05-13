<template>
  <div class="reset-container">
    <div class="reset-card">
      <!-- Logo KitchenGuard -->
      <div class="logo-section">
        <svg width="180" height="50" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="resetLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F97316"/>
              <stop offset="100%" stop-color="#EA580C"/>
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="23" fill="#1A1F2E" stroke="#323B4E" stroke-width="1"/>
          <circle cx="30" cy="30" r="20" fill="none" stroke="url(#resetLogoGrad)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
          <path d="M30 14 C38 14 46 22 46 32 C46 42 38 48 30 49 C22 48 14 42 14 32 C14 22 22 14 30 14Z" fill="url(#resetLogoGrad)"/>
          <ellipse cx="24" cy="20" rx="3" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-20, 24, 20)"/>
          <path d="M30 15 C33 8 38 5 42 8 C38 10 34 12 30 15Z" fill="#166534"/>
          <text x="68" y="28" fill="#F8FAFC" font-weight="700" font-size="18" letter-spacing="1">KITCHEN</text>
          <text x="68" y="46" fill="#F97316" font-weight="800" font-size="14" letter-spacing="3.5">GUARD</text>
        </svg>
        <p class="reset-subtitle">Restablecer contraseña</p>
      </div>

      <!-- Icono de candado -->
      <div class="reset-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
        </svg>
      </div>

      <form @submit.prevent="handleReset" class="reset-form">
        <div class="form-group">
          <label>Nueva contraseña</label>
          <div class="input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" class="input-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input v-model="password" type="password" placeholder="Mínimo 6 caracteres" required />
          </div>
        </div>
        
        <div class="form-group">
          <label>Confirmar contraseña</label>
          <div class="input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" class="input-icon">
              <path d="M9 12l2 2 4-4"/>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            </svg>
            <input v-model="passwordConfirm" type="password" placeholder="Repite tu contraseña" required />
          </div>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="mensaje" class="success">{{ mensaje }}</p>

        <button type="submit" :disabled="loading" class="submit-btn">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Guardando...' : 'Guardar nueva contraseña' }}
        </button>

        <p class="link" @click="router.push('/login')">← Volver al login</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router = useRouter()
const password = ref('')
const passwordConfirm = ref('')
const error = ref('')
const mensaje = ref('')
const loading = ref(false)


  
onMounted(async () => {
  // Supabase manda los tokens en el hash de la URL
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const accessToken  = hashParams.get('access_token')
  const refreshToken = hashParams.get('refresh_token')
  const type         = hashParams.get('type')

  if (type === 'recovery' && accessToken) {
    const { error } = await supabase.auth.setSession({
      access_token:  accessToken,
      refresh_token: refreshToken
    })
    if (error) {
      errorMsg.value = 'Enlace inválido o expirado. Solicita uno nuevo.'
    }
  } else {
    // Si no viene del enlace redirige al login
    router.push('/login')
  }
})

const handleReset = async () => {
  error.value = ''
  mensaje.value = ''

  if (password.value !== passwordConfirm.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }
  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  loading.value = true
  try {
    const { error: err } = await supabase.auth.updateUser({
      password: password.value
    })
    if (err) throw err
    mensaje.value = '¡Contraseña actualizada! Redirigiendo...'
    setTimeout(() => router.push('/dashboard'), 2000)
  } catch (e) {
    error.value = e.message || 'Error al actualizar la contraseña'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.reset-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0A0D14 0%, #111827 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.reset-card {
  background: #1A1F2E;
  border: 1px solid #262D3D;
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.logo-section {
  text-align: center;
  margin-bottom: 20px;
}

.reset-subtitle {
  color: #94A3B8;
  font-size: 14px;
  margin-top: 12px;
}

.reset-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.reset-form {
  animation: fadeSlideIn 0.3s ease;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  color: #94A3B8;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  z-index: 1;
}

input {
  width: 100%;
  background: #0A0D14;
  border: 1px solid #262D3D;
  border-radius: 12px;
  padding: 12px 14px 12px 40px;
  color: #F8FAFC;
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;
}

input:focus {
  border-color: #F97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

input::placeholder { color: #475569; }

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #F97316, #EA580C);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #EA580C, #C2410C);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.3);
}

.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.error {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #EF4444;
  font-size: 13px;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.success {
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.3);
  color: #10B981;
  font-size: 13px;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 12px;
}

.link {
  text-align: center;
  color: #475569;
  font-size: 13px;
  margin-top: 16px;
  cursor: pointer;
  transition: color 0.2s;
}

.link:hover { color: #F97316; }

@media (max-width: 480px) {
  .reset-card { padding: 28px 20px; }
}
</style>